import frappe
from frappe.utils import now

def role_login_updation(doc, action):
    if doc.roles and doc.user_type == "System User" and not doc.get("__islocal"):
        before_roles_list = []
        user_doc = frappe.get_doc("User", doc.name)
        
        if user_doc and user_doc.roles:
            for bu in user_doc.roles:
                if bu.role:
                    before_roles_list.append(bu.role)
        
        after_roles_list = []
        if doc.roles:
            for au in doc.roles:
                if au.role:
                    after_roles_list.append(au.role)

        # Check for differences
        roles_added = set(after_roles_list) - set(before_roles_list)
        roles_removed = set(before_roles_list) - set(after_roles_list)
        
        if roles_added or roles_removed:
            doc.append("role_changes_updation", {   # Append to child table or field
                'date_and_time': frappe.utils.now(),  # Correct use of now()
                'user': frappe.session.user,
                'previous_role_profile': ', '.join(roles_removed),
                'changes_role_profile': ', '.join(roles_added)
            })




