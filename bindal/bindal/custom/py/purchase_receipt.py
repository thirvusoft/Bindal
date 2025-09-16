import frappe
from frappe import _
from frappe.utils import get_link_to_form
def validate(doc, method):
    if not doc.supplier_delivery_note:
        return
    existing = frappe.db.get_value(
        "Purchase Receipt",
        {
            "supplier_delivery_note": doc.supplier_delivery_note,
            "name": ["!=", doc.name]
        },
        "name"
    )
    if existing:
        frappe.throw(
            _("Supplier Delivery Note Number must be unique. Already used in {0}").format(
                get_link_to_form("Purchase Receipt", existing)
            )
        )
