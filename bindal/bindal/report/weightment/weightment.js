// Copyright (c) 2016, pavithra M R and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Weightment"] = {
	"filters": [{
			"fieldname":"from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.month_start(),
			"reqd": 1,
			"width": "60px"
		},
		{
			"fieldname":"to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.month_end(),
			"reqd": 1
		},
],
}