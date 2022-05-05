from __future__ import unicode_literals
import frappe
from frappe import _, throw, msgprint, utils
from frappe.utils import cint, flt, cstr, comma_or, getdate, add_days, getdate, rounded, date_diff, money_in_words
from frappe.model.mapper import get_mapped_doc
from frappe.model.naming import make_autoname
from erpnext.utilities.transaction_base import TransactionBase
from erpnext.accounts.party import get_party_account_currency
from frappe.desk.notifications import clear_doctype_notifications
from datetime import datetime
import sys
import os
import operator
import json
import time
import math
import base64
import ast

@frappe.whitelist()
def get_stock_qty(item_code,warehouse):
    print("entered in get_stock_qty function")
    qty = frappe.db.sql("""select concat_ws(" ", posting_date, posting_time) as date,qty_after_transaction from `tabStock Ledger Entry` where item_code='"""+item_code+"""' and warehouse='"""+warehouse+"""' order by posting_date,posting_time """, as_dict=1)
    print("qty",qty)
    return qty

@frappe.whitelist()
def fetch_acc_dimension_company():
	company=frappe.db.sql("""select company from `tabAccounting Dimension Detail` as adetail join `tabAccounting Dimension` as ad on ad.name = adetail.parent""", as_dict=1)
	print("company_details",company)
	return company