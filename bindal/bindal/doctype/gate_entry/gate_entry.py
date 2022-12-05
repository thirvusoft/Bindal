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
	#print("name",name)
	po_item_details=frappe.db.sql("""select parent,item_code,description,name,item_name,uom,qty,weight_per_unit,weight_uom,total_weight,(qty-received_qty) as pending_qty,parent,stock_uom,conversion_factor from `tabPurchase Order Item` where parent='"""+name+"""' """, as_dict=1)
	#print("po_item_details00000",po_item_details)
	return po_item_details

@frappe.whitelist()
def fetch_si_name(name):
	#print("name",name)
	si_item_details=frappe.db.sql("""select name,item_code,description,item_name,uom,qty,weight_per_unit,weight_uom,total_weight,(qty-delivered_qty) as pending_qty,parent,stock_uom,conversion_factor from `tabSales Invoice Item` where parent='"""+name+"""' """, as_dict=1)
	#print("po_item_details..........",so_item_details)
	return si_item_details

@frappe.whitelist()
def fetch_dn_name(name):
	#print("name",name)
	#dn_item_details=frappe.db.sql("""select item_name,uom,qty,parent from `tabDelivery Note Item` where parent='"""+name+"""' """, as_dict=1)
	dn_item_details=frappe.db.sql("""select name,item_code,description,item_name,uom,qty,weight_per_unit,weight_uom,total_weight,parent,stock_uom,conversion_factor from `tabDelivery Note Item` where parent='"""+name+"""' """, as_dict=1)
	#print("dn_item_details",dn_item_details)
	return dn_item_details

@frappe.whitelist()
def fetch_stock_details(name):
	#print("name..........",name)
	dn_item_details=frappe.db.sql("""select name,inward_or_outward,purchase_order,name_of_supplier,address_of_supplier,expected_date_of_return,btpl_responsible_person,vendor_responsible_person from `tabStock Entry` where name ='"""+name+"""' """, as_dict=1)
	#print("dn_item_details..",dn_item_details)
	return dn_item_details

#@frappe.whitelist()
#def get_weight(weight,name):
#	print("weight...........name...",weight,name)
#	gate_entry = frappe.get_doc("Gate Entry",name)
#	gate_entry.estimated_net_weight = weight
#	print("gate_entry record",gate_entry.estimated_net_weight)
#	gate_entry.save()
	#return dn_item_details

@frappe.whitelist()
def fetch_item_master_details(name):
	#print("name............",name)
	item_master_details=frappe.db.sql("""select name,weight_per_unit,weight_uom from `tabItem` where name='"""+name+"""' """, as_dict=1)
	#print("dn_item_details..",item_master_details)
	return item_master_details

@frappe.whitelist()
def check_record_repeated(record_number):
	print("record_number............",record_number)
	po_details=frappe.db.sql("""select po.name,po.supplier_name,poi.name as child_record_name,
	poi.item_code,poi.description,poi.item_name,poi.uom,poi.qty,poi.weight_per_unit,
	poi.weight_uom,poi.total_weight, (poi.qty-poi.received_qty) as pending_qty,poi.stock_uom,
	poi.conversion_factor
	from `tabPurchase Order` as po inner join `tabPurchase Order Item` as poi 
	on po.name=poi.parent where po.name='"""+record_number+"""' """, as_dict=1)
	print("po_details..",po_details)
	gate_details=frappe.db.sql("""select gt.name,gt.record_number,gti.item_code,sum(gti.qty) as qty from `tabGate Entry` as gt inner join `tabPO Item` as gti on gt.name=gti.parent where gt.record_number='"""+record_number+"""' group by gti.item_code""", as_dict=1)
	print("gate_entry_details..",gate_details)
	po = []
	result = []
	for i in po_details:
		for j in gate_details:
			if i['name'] == j['record_number'] and i['item_code'] == j['item_code']:
				print("qty........[]]]][][000.",i['qty'] - j['qty'])
				innerJson_b = {
				"record_number":j['record_number'],
				"supplier_name":i['supplier_name'],
				"child_record_name":i['child_record_name'],
				"item_code":i['item_code'],
				"description":i['description'],
				"item_name":i['item_name'],
				"uom":i['uom'],
				"qty":i['qty'] - j['qty'],
				"weight_per_unit":i['weight_per_unit'],
				"weight_uom":i['weight_uom'],
				"total_weight":i['total_weight'],
				"pending_qty":i['pending_qty'],
				"stock_uom":i['stock_uom'],
				"conversion_factor":i['conversion_factor']
			}
				result.append(innerJson_b)
	print("result",result)
	return result			
	
@frappe.whitelist()
def check_record_repeated_si(record_number):
	print("si record_number............",record_number)
	si_details=frappe.db.sql("""select s.name,si.name as child_record_name, 
	si.item_code,si.description,si.item_name,si.uom,si.qty,si.weight_per_unit, 
	si.weight_uom,si.total_weight,(si.qty-si.delivered_qty) as pending_qty, 
	si.stock_uom, si.conversion_factor from `tabSales Invoice` as s 
	inner join `tabSales Invoice Item` as si  
	on s.name=si.parent where s.name='"""+record_number+"""' """, as_dict=1)
	print("si_details..",si_details)
	gate_si_details=frappe.db.sql("""select gt.name,gt.record_number,gti.item_code,sum(gti.qty) as qty from `tabGate Entry` as gt inner join `tabPO Item` as gti on gt.name=gti.parent where gt.record_number='"""+record_number+"""' group by gti.item_code""", as_dict=1)
	print("gate_entry_details..",gate_si_details)
	result1 = []
	for i in si_details:
		for j in gate_si_details:
			if i['name'] == j['record_number'] and i['item_code'] == j['item_code']:
				print("hai")
				print("qty........[]]]][][000.",i['qty'] - j['qty'])
				innerJson_b = {
				"record_number":j['record_number'],
				"child_record_name":i['child_record_name'],
				"item_code":i['item_code'],
				"description":i['description'],
				"item_name":i['item_name'],
				"uom":i['uom'],
				"qty":i['qty'] - j['qty'],
				"weight_per_unit":i['weight_per_unit'],
				"weight_uom":i['weight_uom'],
				"total_weight":i['total_weight'],
				"pending_qty":i['pending_qty'],
				"stock_uom":i['stock_uom'],
				"conversion_factor":i['conversion_factor']
			}
				result1.append(innerJson_b)
	print("result11.....",result1)
	return result1			
					
@frappe.whitelist()
def check_record_repeated_de(record_number):
	print("de record_number............",record_number)
	de_details=frappe.db.sql("""select d.name,di.name as child_record_name,  di.item_code,
	di.description,di.item_name,di.uom,di.qty,di.weight_per_unit,  di.weight_uom,di.total_weight,  
	di.stock_uom, di.conversion_factor from `tabDelivery Note` as d 
	inner join `tabDelivery Note Item` as di   on d.name=di.parent where d.name='"""+record_number+"""' """, as_dict=1)
	print("di_details..",de_details)
	gate_de_details=frappe.db.sql("""select gt.name,gt.record_number,gti.item_code,sum(gti.qty) as qty from `tabGate Entry` as gt inner join `tabPO Item` as gti on gt.name=gti.parent where gt.record_number='"""+record_number+"""' group by gti.item_code""", as_dict=1)
	print("gate_entry_details..",gate_de_details)
	result2 = []
	for i in de_details:
		for j in gate_de_details:
			if i['name'] == j['record_number'] and i['item_code'] == j['item_code']:
				print("hai")
				print("qty........[]]]][][000.",i['qty'] - j['qty'])
				innerJson_b = {
				"record_number":j['record_number'],
				"child_record_name":i['child_record_name'],
				"item_code":i['item_code'],
				"description":i['description'],
				"item_name":i['item_name'],
				"uom":i['uom'],
				"qty":i['qty'] - j['qty'],
				"weight_per_unit":i['weight_per_unit'],
				"weight_uom":i['weight_uom'],
				"total_weight":i['total_weight'],
				"stock_uom":i['stock_uom'],
				"conversion_factor":i['conversion_factor']
			}
				result2.append(innerJson_b)
	print("result12.....",result2)
	return result2	
