import frappe
from frappe import _

def update_completed_and_requested_qty(sales_order, method):
	if sales_order.doctype == "Sales Order":
		material_request_map = {}

		for d in sales_order.get("items"):
			if d.material_request:
				material_request_map.setdefault(d.material_request, []).append(d.material_request_item)

		for mr, mr_item_rows in material_request_map.items():
			if mr and mr_item_rows:
				mr_obj = frappe.get_doc("Material Request", mr)

				if mr_obj.status in ["Stopped", "Cancelled"]:
					frappe.throw(
						frappe._("{0} {1} is cancelled or stopped").format(_("Material Request"), mr),
						frappe.InvalidStatusError,
					)

				mr_obj.update_completed_qty(mr_item_rows)
				mr_obj.update_requested_qty(mr_item_rows)