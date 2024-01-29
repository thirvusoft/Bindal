// Copyright (c) 2024, jyoti and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Actual Production and Rejected Production Zone wise"] = {
	"filters": [
		{
			"fieldname":"from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"width": "80"
		},
		{
			"fieldname":"to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"width": "80"
		},
		{
			"fieldname":"zone",
			"label": __("Zone"),
			"fieldtype": "Select",
			"options": ["", "Zone-A", "Zone-B", "Zone-C", "Zone-D", "Zone-E", "Zone-F", "Zone-G", "Zone-H", "Zone-I", "Unit-2", "Unit-3"],
			"width": "100",
		},
	]
};
