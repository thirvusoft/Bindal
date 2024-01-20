# Copyright (c) 2024, jyoti and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters=None):
	columns, data = [], []
	columns=get_columns(filters)
	data=get_data(filters)
	return columns, data

def get_columns(filters):
	columns=[
			{
				"label": _("Zone"),
				"fieldtype": "Select",
				"fieldname": "zone",
				"options": ["", "Zone-A", "Zone-B", "Zone-C", "Zone-D", "Zone-E", "Zone-F", "Zone-G", "Zone-H", "Zone-I", "Unit-2", "Unit-3"],
				"width": 200
			},
			{
				"label": _("Machine"),
				"fieldtype": "Link",
				"fieldname": "machine",
				"options":"Workstation",
				"width": 150
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
			{
				"label": _("OK Production"),
				"fieldtype": "Float",
				"fieldname": "ok_production",
				"width": 150
			},
			{
				"label": _("Short Moulding Qty"),
				"fieldtype": "Float",
				"fieldname": "short_moulding_qty",
				"width": 150
			},
			{
				"label": _("Flash Qty"),
				"fieldtype": "Float",
				"fieldname": "falsh_qty",
				"width": 150
			},
 			{
				"label": _("Shrinkage Qty"),
				"fieldtype": "Float",
				"fieldname": "shrinkage_qty",
				"width": 150
			},
			{
				"label": _("Silver Streaks Qty"),
				"fieldtype": "Float",
				"fieldname": "silver_streaks_qty",
				"width": 150
			},
			{
				"label": _("Black Spot Qty"),
				"fieldtype": "Float",
				"fieldname": "black_spot_qty",
				"width": 150
			},
			{
				"label": _("Weld Line/ Flow Mark Qty"),
				"fieldtype": "Float",
				"fieldname": "weldline_qty",
				"width": 150
			},
			{
				"label": _("Ejector Mark Qty"),
				"fieldtype": "Float",
				"fieldname": "ejector_mark_qty",
				"width": 150
			},
			{
				"label": _("Colour Problem Qty"),
				"fieldtype": "Float",
				"fieldname": "colour_problem_qty",
				"width": 150
			},
			{
				"label": _("Damage/ Crack"),
				"fieldtype": "Float",
				"fieldname": "damage_crack_qty",
				"width": 150
			},
						{
				"label": _("Scratch Qty"),
				"fieldtype": "Float",
				"fieldname": "scratch_qty",
				"width": 150
			},
			{
				"label": _("Mixing Qty"),
				"fieldtype": "Float",
				"fieldname": "mixing_qty",
				"width": 150
			},
			{
				"label": _("Other Defect Qty"),
				"fieldtype": "Float",
				"fieldname": "other_defect_qty",
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
	dpr_list=frappe.db.get_list("DPR BTPL", filters=dpr_filter, fields=["zone_1", "workstation", "sum(a_prod_1) as a_prod_1", "sum(rej_prod_1) as rej_prod_1", "sum(ok_prod_1) as ok_prod_1", 
                                "sum(s_mould_1) as s_mould_1", "sum(f_mould_1) as f_mould_1", "sum(s_qty_1) as s_qty_1", "sum(ss_qty_1) as ss_qty_1", "sum(b_qty_1) as b_qty_1", 
                                "sum(w_qty_1) as w_qty_1", "sum(e_qty_1) as e_qty_1", "sum(cp_qty_1) as cp_qty_1", "sum(d_qty_1) as d_qty_1", "sum(sc_qty_1) as sc_qty_1", "sum(mi_qty_1) as mi_qty_1", 
                                "sum(qty_2) as qty_2"], group_by="zone_1, workstation", order_by="zone_1")
	if dpr_list:
		zone=''
		for dpr in dpr_list:
			sub_data = {}
			sub_data.update({
					"zone":dpr.zone_1 if zone != dpr.zone_1 else "",
					"machine":dpr.workstation,
					"actual_production":dpr.a_prod_1,
					"rejected_production":dpr.rej_prod_1,
					"ok_production":dpr.ok_prod_1,
					"short_moulding_qty":dpr.s_mould_1,
					"falsh_qty":dpr.f_mould_1,
					"shrinkage_qty":dpr.s_qty_1,
					"silver_streaks_qty":dpr.ss_qty_1,
					"black_spot_qty":dpr.b_qty_1,
					"weldline_qty":dpr.w_qty_1,
					"ejector_mark_qty":dpr.e_qty_1,
					"colour_problem_qty":dpr.cp_qty_1,
					"damage_crack_qty":dpr.d_qty_1,
					"scratch_qty":dpr.sc_qty_1,
					"mixing_qty":dpr.mi_qty_1,
					"other_defect_qty":dpr.qty_2
				})
			zone = dpr.zone_1
			if sub_data:
				data.append(sub_data)
		return data




