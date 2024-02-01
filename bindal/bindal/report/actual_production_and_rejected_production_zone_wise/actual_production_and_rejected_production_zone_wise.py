# Copyright (c) 2024, jyoti and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.utils.data import format_date


def execute(filters=None):
	columns, data = [], []
	columns=get_columns(filters)
	data=get_data(filters)
	return columns, data

def get_columns(filters):
	columns=[
			{
				"label": _("Date"),
				"fieldtype": "Date",
				"fieldname": "date",
				"width": 150
			},
			{
				"label": _("Date 1"),
				"fieldtype": "data",
				"fieldname": "test_date",
				"width": 150,
				"hidden":1
			},
			{
				"label": _("Actual Production"),
				"fieldtype": "Float",
				"fieldname": "actual_production",
				"width": 150
			},
			{
				"label": _("Rejected Production"),
				"fieldtype": "Float",
				"fieldname": "rejected_production",
				"width": 150
			},
		]
	return columns
def get_data(filters):
	data=[]
	dpr_filter={"docstatus":1}
	if filters.get("zone"):
		dpr_filter.update({'zone_1':filters.get('zone')})
	if filters.get("from_date"):
		dpr_filter.update({'date':[">=", filters.get('from_date')]})
	if filters.get("to_date"):
		dpr_filter.update({'date':["<=", filters.get('to_date')]})
	if filters.get("from_date") and filters.get("to_date"):
		dpr_filter.update({'date':["between", [filters.get('from_date'), filters.get('to_date')]]})
	dpr_list=frappe.db.get_list("DPR BTPL", filters=dpr_filter, fields=["date","sum(a_prod_1) as a_prod_1", "sum(rej_prod_1) as rej_prod_1"], group_by="date", order_by="date")
	if dpr_list:
		for dpr in dpr_list:
			sub_data = {}
			sub_data.update({
					"date":dpr.date,
					"actual_production":dpr.a_prod_1,
					"rejected_production":dpr.rej_prod_1,
					"test_date":format_date(dpr.date)
				})
			if sub_data:
				data.append(sub_data)
		return data