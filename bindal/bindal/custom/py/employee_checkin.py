import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import cint, get_datetime, get_link_to_form , nowdate
from datetime import datetime, timedelta, time

# from erpnext.hr.doctype.shift_assignment.shift_assignment import (
#     get_actual_start_end_datetime_of_shift,
# )
# from erpnext.hr.utils import validate_active_employee


@frappe.whitelist()
def add_log_based_on_employee_field(
	employee_field_value,
	timestamp,
	device_id=None,
	log_type=None,
	skip_auto_attendance=0,
	employee_fieldname="attendance_device_id",
):
	"""Finds the relevant Employee using the employee field value and creates a Employee Checkin.

	:param employee_field_value: The value to look for in employee field.
	:param timestamp: The timestamp of the Log. Currently expected in the following format as string: '2019-05-08 10:48:08.000000'
	:param device_id: (optional)Location / Device ID. A short string is expected.
	:param log_type: (optional)Direction of the Punch if available (IN/OUT).
	:param skip_auto_attendance: (optional)Skip auto attendance field will be set for this log(0/1).
	:param employee_fieldname: (Default: attendance_device_id)Name of the field in Employee DocType based on which employee lookup will happen.
	"""

	if not employee_field_value or not timestamp:
		frappe.throw(_("'employee_field_value' and 'timestamp' are required."))

	employee = frappe.db.get_values(
		"Employee",
		{employee_fieldname: employee_field_value},
		["name", "employee_name", employee_fieldname],
		as_dict=True,
	)
	if employee:
		employee = employee[0]
	else:
		frappe.throw(
			_("No Employee found for the given employee field value. '{}': {}").format(
				employee_fieldname, employee_field_value
			)
		)
	
	date_format_str = '%Y-%m-%d %H:%M:%S'

	# create datetime object from timestamp string
	validate_timestamp = datetime.strptime(str(timestamp), date_format_str)

	# try:
	if frappe.get_value('Employee',employee.name,'default_shift'):
		shift = frappe.get_value('Employee',employee.name,'default_shift')
		shift_time = str(frappe.get_value('Shift Type',shift,'start_time'))
		min = int(frappe.get_value('Shift Type',shift,'begin_check_in_before_shift_start_time'))
	else:
		shift_time = '00:00:00'
		min = 0        

	hours, minutes, seconds = map(int, shift_time.split(':'))

	combined_datetime = datetime.combine(validate_timestamp.date(),time(hours,minutes,seconds)) - timedelta(minutes=min)
	
	att_doc_list = frappe.get_all("Employee Checkin",{"employee" : str(employee.name),"time": [">=", combined_datetime]},order_by='time desc')
	pr_att_doc_list = frappe.get_all("Employee Checkin",{"employee" : str(employee.name),"time": ["<", combined_datetime]},order_by='time desc')

	if att_doc_list:

		att_doc = frappe.get_doc('Employee Checkin',att_doc_list[0])

		doc = frappe.new_doc("Employee Checkin")
		doc.employee = employee.name
		doc.employee_name = employee.employee_name
		doc.time = timestamp
		doc.device_id = device_id

		if log_type:
			doc.log_type = log_type

		elif(att_doc.log_type=="IN"):
			doc.log_type = "OUT"
		else:
			doc.log_type="IN"
		if cint(skip_auto_attendance) == 1:
			doc.skip_auto_attendance = "1"

	else:
	    doc = frappe.new_doc("Employee Checkin")
	    doc.employee = employee.name
	    doc.employee_name = employee.employee_name
	    doc.time = timestamp
	    doc.device_id = device_id
	    if log_type:
	        doc.log_type = log_type
	    else:
	        doc.log_type = 'IN'
	    if cint(skip_auto_attendance) == 1:
	        doc.skip_auto_attendance = "1"
	    
	doc.insert()

	return doc

def fetch_branch(doc,event):
	doc.db_set('branch',frappe.get_value('Attendance Device',{'location__device_id':doc.device_id},'parent'))