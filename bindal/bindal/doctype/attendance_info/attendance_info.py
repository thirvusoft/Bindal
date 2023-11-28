# Copyright (c) 2023, jyoti and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import nowdate,getdate
from frappe.model.document import Document

class AttendanceInfo(Document):
	pass

@frappe.whitelist()
def get_department(branch):
	list_of_department = []
	total_count =0
	dep = frappe.db.sql(f'''select emp.department from `tabEmployee` as emp where emp.status = 'Active' and emp.branch = '{branch}' group by emp.department''',as_dict=True)
	checkin = []
	for i in dep:
		if i.get('department'):
			start_time = f"{getdate()} 00:00:00"
			end_time = f"{getdate()} 23:59:59"
			count = frappe.db.sql(f'''
				SELECT checkin.employee
				FROM `tabEmployee Checkin` AS checkin
				LEFT JOIN `tabEmployee` AS emp ON emp.name = checkin.employee
				WHERE emp.branch = '{branch}' AND
					emp.department = '{i.get('department')}'
					AND checkin.time BETWEEN '{start_time}' AND '{end_time}'
				GROUP BY checkin.employee
			    HAVING COUNT(DISTINCT checkin.log_type) % 2 = 1

		''', as_dict=1)

			
			row = {
				'department':i.get('department'),
				'count':len(count) if count else 0,
				'date':nowdate(),
				'branch':branch
			}
			total_count += row.get('count')
			list_of_department.append(row)
			checkin += frappe.get_all("Employee Checkin",{'department':i.get('department'),'time':("between",[nowdate(),nowdate()])},['employee','employee_name','time','log_type'],limit=10,order_by='creation desc')
	if len(checkin) > 10:
		checkin  = checkin[0:10]
	return list_of_department,total_count,checkin,nowdate()