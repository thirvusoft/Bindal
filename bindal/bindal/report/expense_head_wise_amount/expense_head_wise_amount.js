// Copyright (c) 2024, jyoti and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Expense Head Wise Amount"] = {
	"filters": [
		{
			"fieldname": "from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.now_date(),
			"reqd":1
		},
		{
			"fieldname": "to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"default": frappe.datetime.now_date(),
			"reqd":1
		},
		{
			"fieldname": "supplier",
			"label": __("Supplier"),
			"fieldtype": "Link",
			"options":"Supplier"
		}
	]
};
