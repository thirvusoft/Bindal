# -*- coding: utf-8 -*-
# Copyright (c) 2022, pavithra M R and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class GateEntry(Document):
	pass

@frappe.whitelist()
def fetch_po_name(name):
	print("name",name)
	po_item_details=frappe.db.sql("""select item_name,uom,(qty-received_qty) as pending_qty,parent from `tabPurchase Order Item` where parent='"""+name+"""' """, as_dict=1)
	print("po_item_details",po_item_details)
	return po_item_details

@frappe.whitelist()
def fetch_so_name(name):
	print("name",name)
	so_item_details=frappe.db.sql("""select item_name,uom,(qty-delivered_qty) as pending_qty,parent from `tabSales Invoice Item` where parent='"""+name+"""' """, as_dict=1)
	print("po_item_details",so_item_details)
	return so_item_details

@frappe.whitelist()
def fetch_dn_name(name):
	print("name",name)
	#dn_item_details=frappe.db.sql("""select item_name,uom,qty,parent from `tabDelivery Note Item` where parent='"""+name+"""' """, as_dict=1)
	dn_item_details=frappe.db.sql("""select item_name,uom,qty,weight_per_unit,total_weight,parent from `tabDelivery Note Item` where parent='"""+name+"""' """, as_dict=1)
	print("dn_item_details",dn_item_details)
	return dn_item_details