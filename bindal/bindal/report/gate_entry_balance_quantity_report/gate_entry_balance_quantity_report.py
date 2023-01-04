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
		result = 0
		if item_master[0]['over_delivery_receipt_allowance'] == 0 and stock_settings.over_delivery_receipt_allowance == 0:
			result = 0
		elif item_master[0]['over_delivery_receipt_allowance'] != 0 and stock_settings.over_delivery_receipt_allowance == 0:
			result = item_master[0]['over_delivery_receipt_allowance']
		elif item_master[0]['over_delivery_receipt_allowance'] == 0 and stock_settings.over_delivery_receipt_allowance != 0:
			result = stock_settings.over_delivery_receipt_allowance
		elif item_master[0]['over_delivery_receipt_allowance'] != 0 and stock_settings.over_delivery_receipt_allowance != 0:
			result = item_master[0]['over_delivery_receipt_allowance']
		print("result",result)

		r = 1+(result/100)
		res = gate_data['po_qty'] * r

		#Pending PO Quantity with over delivery percentage
		pending_qty_with_over_del_percentage = 0
		q = gate_data['po_qty'] - gate_data['pending_qty']
		pending_qty_with_over_del_percentage = res - q
		print("pending_qty_with_over_del_percentage",pending_qty_with_over_del_percentage)

		#balance
		balance = 0
		if gate_data['received_qty'] > gate_data['po_qty'] :
			balance = 0
		else:
			balance = gate_data['po_qty'] - gate_data['received_qty']
		print("balance",balance)

		#Balance with Over Delivery Percentage as per Gate Entry
		balance_with_over_delivery_percentage = 0
		if gate_data['received_qty'] > res:
			balance_with_over_delivery_percentage = 0
		else:
			balance_with_over_delivery_percentage = res - gate_data['received_qty']

		sum_data.append([gate_data['item_code'],gate_data['po_qty'],gate_data['uom'],
		gate_data['pending_qty'],pending_qty_with_over_del_percentage,
		gate_data['received_qty'],gate_data['stock_uom'],
		balance,balance_with_over_delivery_percentage
		])
	print("result............",sum_data)
	return columns, sum_data

def fetching_po_details(purchase_order):
	print(".....",purchase_order)
	gate_data = frappe.db.sql("""select gti.record_number,gti.item_code,gti.item_name,
	gti.uom,gti.po_qty,gti.pending_qty,gti.stock_uom, gti.received_qty
	from `tabGate Entry` as gt inner join `tabPO Item` as gti on gt.name=gti.parent  
	where gti.record_number='"""+purchase_order+"""' and gt.docstatus=1 """, as_dict=1)
	print("gate_data....",gate_data)
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