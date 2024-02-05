import frappe
from frappe.custom.doctype.property_setter.property_setter import make_property_setter
from erpnext.stock.doctype.material_request.material_request import MaterialRequest
from frappe.utils import flt
from frappe.model.mapper import get_mapped_doc
from frappe import _
from frappe.query_builder.functions import Sum

def material_request_type():
    make_property_setter("Material Request", "material_request_type", "options", "Purchase\nSales\nMaterial Transfer\nMaterial Issue\nManufacture\nCustomer Provided", "Select")

class _MaterialRequest(MaterialRequest):
    def validate_material_request_type(self):
        """Validate fields in accordance with selected type"""

        if self.material_request_type not in ["Sales", "Customer Provided"]:
            self.customer = None
    
    def get_mr_items_ordered_qty(self, mr_items):
        mr_items_ordered_qty = {}
        mr_items = [d.name for d in self.get("items") if d.name in mr_items]

        doctype = qty_field = None
        if self.material_request_type in ("Material Issue", "Material Transfer", "Customer Provided"):
            doctype = frappe.qb.DocType("Stock Entry Detail")
            qty_field = doctype.transfer_qty
        elif self.material_request_type == "Manufacture":
            doctype = frappe.qb.DocType("Work Order")
            qty_field = doctype.qty
        elif self.material_request_type == "Sales":
            doctype = frappe.qb.DocType("Sales Order Item")
            qty_field = doctype.stock_qty

        if doctype and qty_field:
            query = (
                frappe.qb.from_(doctype)
                .select(doctype.material_request_item, Sum(qty_field))
                .where(
                    (doctype.material_request == self.name)
                    & (doctype.material_request_item.isin(mr_items))
                    & (doctype.docstatus == 1)
                )
                .groupby(doctype.material_request_item)
            )

            mr_items_ordered_qty = frappe._dict(query.run())

        return mr_items_ordered_qty
    
    def update_completed_qty(self, mr_items=None, update_modified=True):
        if self.material_request_type == "Purchase":
            return

        if not mr_items:
            mr_items = [d.name for d in self.get("items")]

        mr_items_ordered_qty = self.get_mr_items_ordered_qty(mr_items)
        mr_qty_allowance = frappe.db.get_single_value("Stock Settings", "mr_qty_allowance")

        for d in self.get("items"):
            if d.name in mr_items:
                if self.material_request_type in ("Sales", "Material Issue", "Material Transfer", "Customer Provided"):
                    d.ordered_qty = flt(mr_items_ordered_qty.get(d.name))

                    if mr_qty_allowance:
                        allowed_qty = d.qty + (d.qty * (mr_qty_allowance / 100))
                        if d.ordered_qty and d.ordered_qty > allowed_qty:
                            frappe.throw(
                                _(
                                    "The total Issue / Transfer quantity {0} in Material Request {1}  \
                                cannot be greater than allowed requested quantity {2} for Item {3}"
                                ).format(d.ordered_qty, d.parent, allowed_qty, d.item_code)
                            )

                    elif d.ordered_qty and d.ordered_qty > d.stock_qty:
                        frappe.throw(
                            _(
                                "The total Issue / Transfer quantity {0} in Material Request {1}  \
                            cannot be greater than requested quantity {2} for Item {3}"
                            ).format(d.ordered_qty, d.parent, d.qty, d.item_code)
                        )

                elif self.material_request_type == "Manufacture":
                    d.ordered_qty = flt(mr_items_ordered_qty.get(d.name))

                frappe.db.set_value(d.doctype, d.name, "ordered_qty", d.ordered_qty)
        
        self._update_percent_field(
			{
				"target_dt": "Material Request Item",
				"target_parent_dt": self.doctype,
				"target_parent_field": "per_ordered",
				"target_ref_field": "stock_qty",
				"target_field": "ordered_qty",
				"name": self.name,
			},
			update_modified,
		)


@frappe.whitelist()
def make_sales_order(source_name, target_doc=None):
    def update_item(obj, target, source_parent):
        qty = flt(flt(obj.stock_qty) - flt(obj.ordered_qty)) 
        target.qty = qty
        
    def set_missing_values(source, target):
        target.run_method("set_missing_values")
        target.run_method("calculate_taxes_and_totals")

    doclist = get_mapped_doc(
        "Material Request",
        source_name,
        {
            "Material Request": {
                "doctype": "Sales Order",
                "validation": {
                    "docstatus": ["=", 1],
                    "material_request_type": ["in", ["Sales"]],
                },
            },
            "Material Request Item": {
                "doctype": "Sales Order Item",
                "field_map": {
                    "name": "material_request_item",
                    "parent": "material_request",
                },
                "postprocess": update_item,
                "condition": lambda doc: doc.ordered_qty < doc.stock_qty,
            },
        },
        target_doc,
        set_missing_values,
    )

    return doclist
