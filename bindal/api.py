from __future__ import unicode_literals
import frappe
from datetime import datetime
#import smtplib
import config

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

#@frappe.whitelist()
#def send_email(email_address):
#    print("0000000000000000name",email_address)
#    frappe.sendmail(recipients=email_address,
#    sender="pavithra@meritsystems.com",
#	subject="Subject of the email",
#	message= "Content of the email")
    
#def sendmail():
#    user_list = frappe.db.sql("""select name, employee_name from `tabEmployee` where designation = "Batch Supervisor";""")
#    for user_obj in user_list:
#        user = user_obj[0];
#        employee = user_obj[1];
#        content = "<h4>Hello, "+ employee +"</h4><p>Following Batch will be expiry soon. Please make a note for that.</p><table class='table table-bordered'><tr><th>Batch Number</th><th>Expiry Date</th></tr>"
#        batch_list = frappe.db.sql("""select batch_id, expiry_date  from `tabBatch` where DATEDIFF(expiry_date, CURRENT_DATE()) < 30;""")
#        for batch_obj in batch_list:
#            batch = batch_obj[0]
#            expiry_date = str(batch_obj[1].strftime('%d/%m/%Y'))
#            content = content + "<tr><td>"+batch+"</td><td>"+expiry_date+"</td></tr>"         
#            content = content + "</table>"
#            recipient = frappe.get_value("Employee", user, "prefered_email")
#            frappe.sendmail(recipients=[recipient],
#            sender="pavithra@meritsystems.com",
#            subject="Item Batch To Be Expire", content=content)

@frappe.whitelist()
def send_email_for_due_date():
    """sending email to owner accoring to action date"""
    print("Inside Function")
    if frappe.db.exists('Email Template', "Todo"):
        next_action_template = frappe.get_doc('Email Template', "Todo")
        next_actions_list = frappe.db.get_list('ToDo',fields=['*'],filters={"date":frappe.utils.nowdate(),"status":["!=","Closed"]})
        print("hai",next_actions_list)
        for action in next_actions_list :       
            message = frappe.render_template(next_action_template.response, action)
            frappe.sendmail(
                recipients= action.pch_recipient_list,
                subject=next_action_template.pch_subject,
                message=message,
#               reference_doctype=action.parenttype,
#                reference_name=action.parent
            )
    else: 
        frappe.msgprint(('Please Configure "Opportunity Next Action" Email Template'))