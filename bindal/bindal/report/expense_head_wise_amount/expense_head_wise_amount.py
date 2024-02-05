# Copyright (c) 2024, jyoti and contributors
# For license information, please see license.txt

import frappe
from frappe import _

def execute(filters=None):
	columns, data = get_columns(filters), get_data(filters)
	return columns, data

def get_columns(filters):
	columns = [
       {
            "label": _("Expense Account"),
            "fieldname": "expense_account",
            "fieldtype": "Link",
            "options":"Account",
            "width": 300
        },
        {
            "label": _("Amount"),
            "fieldtype": "Currency",
            "fieldname": "amount",
            "width": 150
        },     
	]
	return columns


def get_data(filters):
	data=[]
	start_date=filters.get("from_date")
	end_date=filters.get("to_date")
	expense_filter=[
				["posting_date", "between",  [start_date, end_date]],
				["docstatus", "=", 1],
				]
	if filters.get("supplier"):
		expense_filter.append(["supplier", "=", filters.get("supplier")])
	purchase_invoice=frappe.db.get_list("Purchase Invoice", filters=expense_filter, fields=["`tabPurchase Invoice Item`.expense_account as expense_account", 
							"sum(`tabPurchase Invoice Item`.amount) as amount"], group_by="`tabPurchase Invoice Item`.expense_account")
	for row in purchase_invoice:
		if row.amount:
			row.expense_account=row.expense_account
			row.amount=row.amount
			data.append(row)
	return data
