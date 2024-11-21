import frappe
from frappe import _
from frappe.utils import flt, cint
from erpnext.stock.doctype.stock_entry.stock_entry import StockEntry, get_item_defaults

class TSStockEntry(StockEntry):
    def validate(self) -> None:
        """
        Custom validation for Work Order based Stock Entry
        
        If the Stock Entry is linked to a Work Order, it validates the Work Order and
        sets the BOM details for the Stock Entry. It also sets the finished goods items
        and their quantities.
        """
        
        if self.work_order and not self.items:
            
            self.pro_doc = frappe.get_doc("Work Order", self.work_order)
            self.stock_entry_type = "Manufacture"
            self.purpose = "Manufacture"

            if not self.pro_doc.bom_no:
                frappe.throw(_("BOM not found in the Work Order."))

            bom : str = frappe.get_doc("BOM", self.pro_doc.bom_no)

            self.from_bom = 1
            self.bom_no = bom.name

            bom_items : list[str] = frappe.db.get_all(
                "BOM Item",
                filters={"parent": self.bom_no},
                fields=["item_code", "qty"]
            )

            self.items = []

            work = frappe.get_doc("Work Order", self.work_order)

            for item in bom_items:
                item_row = self.append("items")
                print("---------------------------------")
                print(item['qty'])
                print(self.fg_completed_qty)
                print('---------------------------------')
                
                item_row.item_code = item["item_code"]
                item_row.qty = (item['qty'] / bom.quantity) * self.fg_completed_qty  if bom.quantity > 1  else item['qty']
                item_row.uom = item_row.uom
                item_row.stock_uom = item_row.stock_uom
                item_row.is_finished_item = 0  
                item_row.conversion_factor = item_row.conversion_factor
                item_row.transfer_qty =  self.fg_completed_qty 
                item_row.s_warehouse = self.pro_doc.source_warehouse  
                         
                
            # for adding finished item as last
            finished_item_row = self.append("items")
            finished_item_row.item_code = bom.item
            finished_item_row.qty = self.fg_completed_qty
            finished_item_row.uom = frappe.db.get_value("Item", bom.item, "stock_uom")
            finished_item_row.stock_uom = finished_item_row.uom
            finished_item_row.is_finished_item = 1 
            finished_item_row.conversion_factor = 1
            finished_item_row.transfer_qty = self.fg_completed_qty
            finished_item_row.t_warehouse = self.pro_doc.fg_warehouse            

            self.validate_posting_time()
            self.validate_purpose()
            self.validate_item()
            self.validate_customer_provided_item()
            self.validate_qty()
            self.set_transfer_qty()
            self.validate_uom_is_integer("uom", "qty")
            self.validate_uom_is_integer("stock_uom", "transfer_qty")
            self.validate_work_order()
            self.validate_bom()
            self.set_process_loss_qty()
            self.validate_purchase_order()
            self.validate_subcontracting_order()

            if self.purpose in ("Manufacture", "Repack"):
                self.mark_finished_and_scrap_items()
                self.validate_finished_goods()

            self.validate_with_material_request()
            self.validate_batch()
            self.validate_inspection()
            self.validate_fg_completed_qty()
            self.validate_difference_account()
            self.set_job_card_data()
            self.validate_job_card_item()
            self.set_purpose_for_stock_entry()
            self.clean_serial_nos()
            self.validate_duplicate_serial_no()

            if not self.from_bom:
                self.fg_completed_qty = 0.0

            self.validate_serialized_batch()
            self.calculate_rate_and_amount()
            self.validate_putaway_capacity()

            if not self.get("purpose") == "Manufacture":
                self.reset_default_field_value("from_warehouse", "items", "s_warehouse")
                self.reset_default_field_value("to_warehouse", "items", "t_warehouse")
    