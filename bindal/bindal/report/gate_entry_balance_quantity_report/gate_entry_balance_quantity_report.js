// Copyright (c) 2016, pavithra M R and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Gate Entry Balance Quantity Report"] = {
	"filters": [{
		"fieldname": "purchase_order",
		"label": __("Purchase Order"),
		"fieldtype": "Link",
		"options": "Purchase Order",
		"width": "100",
		"reqd": 1
		},
],
}