from __future__ import unicode_literals
import frappe

@frappe.whitelist()
def fetch_acc_dimension_company():
	company=frappe.db.sql("""select company from `tabAccounting Dimension Detail` as adetail join `tabAccounting Dimension` as ad on ad.name = adetail.parent""", as_dict=1)
	print("company_details",company)
	return company