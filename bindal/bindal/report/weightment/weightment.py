# Copyright (c) 2013, pavithra M R and contributors
# For license information, please see license.txt
from __future__ import unicode_literals
import frappe
from frappe import _, msgprint
from frappe.utils import flt, getdate, comma_and
from datetime import datetime, date
from collections import defaultdict
from datetime import datetime
from datetime import date
import time
import math
import json
import ast

sum_data = []
def execute(filters=None):
	global sum_data
	columns = []
	sum_data = []
	from_date = ""
	to_date=""
	from_date = filters.get("from_date")
	#from_date = str(from_date)
	to_date = filters.get("to_date")
	#to_date = str(to_date)
	print("from_date=============",from_date)
	print("from_date=============",to_date)

	columns = get_columns()
	data = fetching_po_details(from_date,to_date)

	for gate_data in data:
		if gate_data['supplier_bill_date']:
			sum_data.append([ gate_data['name'],gate_data['supplier_name'],gate_data['supplier_bill_date'].strftime("%d-%m-%Y"), gate_data['net_actual_weight_of_consigmnet']])
			print("111111",sum_data)
	return columns, sum_data

def fetching_po_details(from_date,to_date):
	gate_data = frappe.db.sql("""select name,supplier_name,supplier_bill_date,net_actual_weight_of_consigmnet from `tabGate Entry` where date between '"""+from_date+"""' and '"""+to_date+"""'""", as_dict=1)
	print("gate_data.....",gate_data)
	return gate_data

def get_columns():
	"""return columns"""
	columns = [
		_("Gate Entry No")+":Link/Gate Entry:150",
		_("Supplier Name")+"::150",
		_("Supplier Bill Date")+"::150",
		_("Loaded/Actual Weight")+":150"
		  ]
	return columns