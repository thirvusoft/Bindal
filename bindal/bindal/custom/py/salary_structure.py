import frappe
from frappe.model.naming import make_autoname

def create_name(doc, event):
    doc.name = make_autoname(f"{doc.custom_naming_series}")