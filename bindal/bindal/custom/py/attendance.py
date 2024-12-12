import frappe
from frappe.utils import today, add_days


def permission_check(document, event):
    user = frappe.session.user
    settings = frappe.get_doc("Thirvu Settings", "Thirvu Settings")
    if settings.attendance_days != 0:
        perm_days = add_days(today(), -settings.attendance_days)
        allowed_user = [row.user for row in settings.allowed_users if row.user]
        if user not in allowed_user and user != "Administrator": 
            if document.attendance_date < perm_days and document.custom_enable==1:  
                frappe.throw(f"You are not allowed to mark attendance before {settings.attendance_days} days ago.")
    