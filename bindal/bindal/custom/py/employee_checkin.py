import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import cint, get_datetime, get_link_to_form , nowdate
from datetime import datetime

from erpnext.hr.doctype.shift_assignment.shift_assignment import (
    get_actual_start_end_datetime_of_shift,
)
from erpnext.hr.utils import validate_active_employee


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

    try:
        att_doc = frappe.get_last_doc("Employee Checkin",{"employee" : str(employee.name),"time": ["between", (validate_timestamp.date(),validate_timestamp.date())]})
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
        doc.insert()

    except:
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
        
    frappe.db.commit()
    return doc
