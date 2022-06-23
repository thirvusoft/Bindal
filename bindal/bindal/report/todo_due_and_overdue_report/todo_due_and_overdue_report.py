# Copyright (c) 2013, pavithra M R and contributors
# For license information, please see license.txt
import frappe
from frappe import _, msgprint
from collections import defaultdict
from datetime import datetime
from datetime import date

sum_data = []
def execute(filters=None):
	global data
	columns = []
	data = []
	todo=""
	pch_type = " "

	if filters.get("pch_type"):
		pch_type = filters.get("pch_type")
		print("pch_type",pch_type)
		
	columns = get_columns()
	todo_details = fetching_po_details(pch_type)
	print("todo_details",todo_details)
		
	for todo_data in todo_details:
		today = date.today()
		print(today)
		due_date = todo_data["date"]
		print(due_date)
		number_of_days_to_due_date = (due_date - today).days
		#number_of_days_to_due_date = abs(number_of_days_to_due_date)
		print("number_of_days_to_due_date......1",number_of_days_to_due_date)
		if number_of_days_to_due_date > 0 :
			number_of_days_to_due_date
		else:
			number_of_days_to_due_date = 0
		num_of_due_day = str(number_of_days_to_due_date) + " days"
		
		number_of_days_overdue = (today - due_date).days 
		print("number_of_days_overdue.....2",number_of_days_overdue)
		
		if number_of_days_overdue > 0 :
			number_of_days_overdue
		else:
			number_of_days_overdue = 0
		num_of_day = str(number_of_days_overdue) + " days"
		data.append([todo_data['name'],todo_data['owner'],todo_data['pch_subject'],todo_data['priority'],todo_data['date'].strftime("%d-%m-%y"),todo_data['status'],todo_data['pch_frequency'],num_of_due_day,num_of_day
            ])
	return columns,data

def fetching_po_details(pch_type):
	t_data = frappe.db.sql("""select name,owner,pch_subject,priority,date,status,pch_frequency from `tabToDo` where pch_type='"""+pch_type+"""'""", as_dict=1)
	return t_data

def get_columns():
	"""return columns"""
	columns = [
		_("Record ID")+"::100",
		_("Allocate To")+"::100",
		_("Subject")+"::100",
		_("priority")+"::100",
		_("Due date")+"::100",
		_("status")+"::100",
		_("pch_frequency")+"::100",
		_("Number of Days to Due Date")+"::100",
		_("Number of days overdue")+"::100",
		 ]
	return columns