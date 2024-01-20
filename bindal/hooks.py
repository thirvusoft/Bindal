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
            "Item":"bindal/custom/js/item.js"
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
after_migrate = "bindal.utils.py.stock_settings.stock_customization"

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
	}

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