import frappe
import json
@frappe.whitelist()
def incoming_material_table(args):
    args=json.loads(args)
    