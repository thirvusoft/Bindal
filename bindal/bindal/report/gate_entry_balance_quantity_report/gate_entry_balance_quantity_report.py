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
d = []
def execute(filters=None):
	global sum_data
	columns = []
	sum_data = []
	d = []
	purchase_order = filters.get("purchase_order")
	print("purchase_order=============",purchase_order)
	columns = get_columns()
	data = fetching_po_details(purchase_order)
	d = []
	for i in data:
		flag = False
		index = None
		for idx,j in enumerate(d):
			if j["record_number"] == i["record_number"] and j["item_code"] == i["item_code"]:
				flag = True
				index = idx
				break
		if flag:
			d[idx]["received_qty"] = d[idx]["received_qty"] + i["received_qty"]
		else:
			d.append(i)
	print("sumdata",d)
	for gate_data in d:
		item_master = frappe.db.sql("""select over_delivery_receipt_allowance from `tabItem` where item_code='"""+gate_data['item_code']+"""' """, as_dict=1)
		stock_settings=frappe.get_doc("Stock Settings")
		result = item_master[0]['over_delivery_receipt_allowance'] - stock_settings.over_delivery_receipt_allowance
		print("result",result)
		r = (gate_data['po_qty'] * result)/100
		pending_qty_with_over_del_percentage = gate_data['pending_qty'] + r
		blnce_with_over_delivery_percentage = pending_qty_with_over_del_percentage - gate_data['received_qty']
		results = 1+(result/100)
		resultess = gate_data['po_qty'] * results  
		r_result = resultess - gate_data['received_qty']
		sum_data.append([gate_data['item_code'],gate_data['po_qty'],gate_data['uom'],
		gate_data['pending_qty'],pending_qty_with_over_del_percentage,
		gate_data['received_qty'],gate_data['stock_uom'],
		gate_data['balance'],r_result
		])
	print("result............",sum_data)
	return columns, sum_data

def fetching_po_details(purchase_order):
	print(".....",purchase_order)
	gate_data = frappe.db.sql("""select gti.record_number,gti.item_code,gti.item_name,
	gti.uom,gti.po_qty,gti.pending_qty,gti.stock_uom, gti.received_qty,
	gti.pending_qty - gti.received_qty as balance 
	from `tabGate Entry` as gt inner join `tabPO Item` as gti on gt.name=gti.parent  
	where gti.record_number='"""+purchase_order+"""' and gt.docstatus=1 """, as_dict=1)
	print("gate_data.....",gate_data)
	return gate_data

def get_columns():
	"""return columns"""
	columns = [
		_("Item")+"::100",
		_("Qty")+"::100",
		_("UOM")+"::100",
		_("Pending PO Quantity")+"::100",
		_("Pending PO Quantity with over delivery percentage")+"::150",
		_("Gate Entry Quantity")+":100",
		_("UOM")+":100",
		_("Balance")+"::100",
		_("Balance with Over Delivery Percentage")+"::150"
		  ]
	return columns