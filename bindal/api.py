from __future__ import unicode_literals
import frappe
from datetime import datetime

@frappe.whitelist()
def get_stock_qty(item_code,warehouse):
    print("entered in get_stock_qty function")
    qty = frappe.db.sql("""select concat_ws(" ", posting_date, posting_time) as date,qty_after_transaction from `tabStock Ledger Entry` where item_code='"""+item_code+"""' and warehouse='"""+warehouse+"""' order by posting_date,posting_time """, as_dict=1)
    print("quantity",qty)
    return qty

@frappe.whitelist()
def fetch_acc_dimension_company():
    company=frappe.db.sql("""select company from `tabAccounting Dimension Detail` as adetail join `tabAccounting Dimension` as ad on ad.name = adetail.parent""", as_dict=1)
    print("company_details",company)
    return company 

@frappe.whitelist()
def send_email(email_address):
    print("0000000000000000name",email_address)
    frappe.sendmail(recipients=email_address,
	subject="Subject of the email",
	message= "Content of the email")