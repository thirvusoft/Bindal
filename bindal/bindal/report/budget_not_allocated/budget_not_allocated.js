// Copyright (c) 2025, jyoti and contributors
// For license information, please see license.txt

frappe.query_reports["Budget Not Allocated"] = {
	"filters": [
		{
			"fieldname": "company",
			"label": __("Company"),
			"fieldtype": "Link",
			"options": "Company",
			"default": frappe.defaults.get_user_default("Company"),
			"width": "100",
			"reqd": 1
		},
		{
			"fieldname": "costcenter",
			"label": __("Cost Center"),
			"fieldtype": "Link",
			"options": "Cost Center",
			"width": "100",
			"reqd": 1
		},
		{
			"fieldname": "from_fiscal_year",
			"label": __("From Fiscal Year"),
			"fieldtype": "Link",
			"options": "Fiscal Year",
			"default": erpnext.utils.get_fiscal_year(frappe.datetime.get_today()),
			"width": "100",
			"reqd": 1
		},
		{
			"fieldname": "to_fiscal_year",
			"label": __("To Fiscal Year"),
			"fieldtype": "Link",
			"options": "Fiscal Year",
			"default": erpnext.utils.get_fiscal_year(frappe.datetime.get_today()),
			"width": "100",
			"reqd": 1
		}
	],
	formatter: function (value, row, column, data, default_formatter) {
		value = default_formatter(value, row, column, data);

		if (column.fieldname.includes(__("variance"))) {
			if (data[column.fieldname] < 0) {
				value = "<span style='color:red'>" + value + "</span>";
			} else if (data[column.fieldname] > 0) {
				value = "<span style='color:green'>" + value + "</span>";
			} else if (data[column.fieldname] == 0) {
				value = "<span style='color:orange'>" + value + "</span>";
			}
		}

		return value;
	},
};
