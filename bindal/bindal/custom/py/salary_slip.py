import frappe
from frappe.model.naming import make_autoname

def create_name(doc, event):
    if doc.employee:
        branch = frappe.db.get_value("Employee", doc.employee, "branch")

        # Define mapping of branch to naming series
        naming_series_map = {
            "Head Office": "HO-SALSLIP26-.####",
            "Unit-1": "U1-SALSLIP26-.####",
            "Unit-2": "U2-SALSLIP26-.####",
            "Unit-3": "U3-SALSLIP26-.####",
            "Unit-4": "U4-SALSLIP26-.####",
        }

        # Check if branch is in the mapping
        if branch in naming_series_map:
            doc.name = make_autoname(naming_series_map[branch])
        else:
            # fallback naming series if branch doesn't match
            doc.name = make_autoname("SALSLIP26-.####")
