# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "bindal"
app_title = "Bindal"
app_publisher = "jyoti"
app_description = "Ver13 changes for Bindal"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "jyoti@meritsystems.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/bindal/css/bindal.css"
# app_include_js = "/assets/bindal/js/bindal.js"

# include js, css files in header of web template
# web_include_css = "/assets/bindal/css/bindal.css"
# web_include_js = "/assets/bindal/js/bindal.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {
			"Work Order" : "bindal/custom/js/work_order.js",
			"Gate Entry":"bindal/custom/js/gate_entry.js",
			"Production Plan":"bindal/custom/js/production_plan.js",
            "Item":"bindal/custom/js/item.js",
            "Material Request": "bindal/custom/js/material_request.js",
            "Sales Order": "bindal/custom/js/sales_order.js",
			"Purchase Invoice":'bindal/custom/js/purchase_invoice.js',
            "Sales Invoice": "bindal/custom/js/sales_invoice.js",
			"Attendance":"bindal/custom/js/attendance.js",
            "Purchase Order": "bindal/custom/js/purchase_order.js",
            "Stock Entry": "bindal/custom/js/stock_entry.js",
            "Payment Entry": "bindal/custom/js/payment_entry.js",
            "Journal Entry": "bindal/custom/js/journal_entry.js",
            "Delivery Note": "bindal/custom/js/delivery_note.js",
            "Quotation": "bindal/custom/js/quotation.js",
            "Asset": "bindal/custom/js/asset.js",
            "Employee": "bindal/custom/js/employee.js",
            "Expense Claim": "bindal/custom/js/expense_claim.js",
            "Employee Advance": "bindal/custom/js/employee_advance.js",
            "Additional Salary": "bindal/custom/js/additional_salary.js",
            "Payroll Entry": "bindal/custom/js/payroll_entry.js",
            "Salary Structure": "bindal/custom/js/salary_structure.js",
            "Salary Slip": "bindal/custom/js/salary_slip.js",
			"Purchase Receipt": "bindal/custom/js/purchase_receipt.js",
            "Budget": "bindal/custom/js/budget.js"
			}

# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "bindal.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "bindal.install.before_install"
after_install = "bindal.utils.py.stock_settings.stock_customization"
after_migrate = [
	"bindal.utils.py.stock_settings.stock_customization",
	"bindal.bindal.custom.py.material_request.material_request_type"
]

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "bindal.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	"Work Order": {
		"on_submit":"bindal.bindal.custom.py.work_order.on_submit"
	},
	"Gate Entry": {
		"on_submit":"bindal.bindal.custom.py.gate_entry.on_submit"
	},
  'Employee Checkin':{
		'after_insert':"bindal.bindal.custom.py.employee_checkin.fetch_branch"
	},
	"Sales Order": {
        "on_submit": [
            "bindal.bindal.custom.py.sales_order.update_completed_and_requested_qty"
		],
        "on_cancel": [
            "bindal.bindal.custom.py.sales_order.update_completed_and_requested_qty"
		],
        'validate': "bindal.bindal.custom.py.accounting_dimension.set_accounting_dimension"
	},
	"User": {
		"validate": "bindal.bindal.custom.py.user.role_login_updation"
	},
	"Attendance": {
		"validate": "bindal.bindal.custom.py.attendance.permission_check"
	},
    "Payroll Entry": {
        "autoname": "bindal.bindal.custom.py.payroll.create_name"
	},
    "Salary Structure": {
        "autoname": "bindal.bindal.custom.py.salary_structure.create_name"
	},
    "Salary Slip": {
        "autoname": "bindal.bindal.custom.py.salary_slip.create_name"
	},
    "Purchase Invoice": {
        'validate': "bindal.bindal.custom.py.accounting_dimension.set_accounting_dimension",
	},
    "Sales Invoice": {
        'validate': "bindal.bindal.custom.py.accounting_dimension.set_accounting_dimension",
	},
    "Purchase Receipt": {
        'validate': "bindal.bindal.custom.py.accounting_dimension.set_accounting_dimension",
	},
    "Delivery Note": {
        'validate': "bindal.bindal.custom.py.accounting_dimension.set_accounting_dimension",
	}
}



override_doctype_class = {
	"Material Request": "bindal.bindal.custom.py.material_request._MaterialRequest" ,
	"Stock Entry" : "bindal.bindal.custom.py.stock_entry.TSStockEntry"
}


# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"bindal.tasks.all"
# 	],
# 	"daily": [
# 		"bindal.tasks.daily"
# 	],
# 	"hourly": [
# 		"bindal.tasks.hourly"
# 	],
# 	"weekly": [
# 		"bindal.tasks.weekly"
# 	]
# 	"monthly": [
# 		"bindal.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "bindal.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"erpnext.hr.doctype.employee_checkin.employee_checkin.add_log_based_on_employee_field": "bindal.bindal.custom.py.employee_checkin.add_log_based_on_employee_field"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "bindal.task.get_dashboard_data"
# }

scheduler_events = {
 	"daily": [
 		"bindal.api.send_email_for_due_date"
 	]
 }

jinja = {
	"methods": [
		"bindal.bindal.custom.py.work_order.barcode",
		"bindal.bindal.custom.py.work_order.get_qr_code"

	]
}
