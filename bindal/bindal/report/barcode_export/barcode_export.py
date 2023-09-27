# Copyright (c) 2023, jyoti and contributors
# For license information, please see license.txt

import frappe
from frappe import _

def execute(filters=None):
	columns, data = get_columns(filters), get_data(filters)
	return columns, data

def get_columns(filters=None):
	columns = [
		_("Barcode")+"::500"
	]
	return columns

def get_data(filters=None):
	if filters.get('item_from') == "Work Order" and not filters.get('barcode'):
		return frappe.get_list("Barcode Label",{'reference_document':filters.get('work_order'),'item':filters.get('item')},'barcode')or None
	elif filters.get('item_from') == "Gate Entry" and not filters.get('barcode'):
		return frappe.get_list("Barcode Label",{'reference_document':filters.get('gate_entry'),'item':filters.get('item')},'barcode')or None
	elif filters.get('barcode'):
		return frappe.get_list("Barcode Label",{'name':filters.get('barcode')},'barcode') or None
	return []