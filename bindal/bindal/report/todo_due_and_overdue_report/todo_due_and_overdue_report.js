// Copyright (c) 2016, pavithra M R and contributors

frappe.query_reports["ToDo Due and Overdue report"] = {
	"filters": [{
        "fieldname": "pch_type",
        "label": __("Todo Type"),
        "fieldtype": "Select",
        "options": ["Corporate"],
        },
],
}

