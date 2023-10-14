import frappe

@frappe.whitelist()
def get_workstation(doctype, txt, searchfield, start, page_len, filters, as_dict=False):

    if txt:
        return frappe.db.sql(f"""select `tabWorkstation`.name from `tabWorkstation` where `tabWorkstation`.name like '%{txt}%' and `tabWorkstation`.area_zone = '{filters.get('area_zone')}' """)
    else:
        return frappe.db.sql(f"""select `tabWorkstation`.name from `tabWorkstation` where `tabWorkstation`.area_zone = '{filters.get('area_zone')}' """)
