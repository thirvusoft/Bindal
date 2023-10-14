import frappe

@frappe.whitelist()
def get_workstation(doctype, txt, searchfield, start, page_len, filters, as_dict=False):

    if txt:
        return frappe.db.sql(f"""select `tabWorkstation`.name from `tabWorkstation` where `tabWorkstation`.name like '%{txt}%' and `tabWorkstation`.area_zone = '{filters.get('area_zone')}' """)
    else:
        return frappe.db.sql(f"""select `tabWorkstation`.name from `tabWorkstation` where `tabWorkstation`.area_zone = '{filters.get('area_zone')}' """)

from datetime import datetime, timedelta

@frappe.whitelist()
def expected_end_time(cycle_time, planned_start_date, planned_qty):
    
    # Parse cycle_time into hours, minutes, and seconds
    hours, minutes, seconds = map(int, cycle_time.split(':'))
    
    # Convert the cycle time to an integer representing minutes
    cycle_time_minutes = (hours * 60) + minutes + (seconds / 60)


    # Check if planned_start_date contains a space (indicating date-time format)
    if ' ' not in planned_start_date:
        # If it's in date format, add a default time of midnight (00:00:00)
        planned_start_date += " 00:00:00"

    # Convert the planned_start_date to a datetime object
    planned_start_date = datetime.strptime(planned_start_date, "%Y-%m-%d %H:%M:%S")

    # Calculate the duration in minutes
    duration = cycle_time_minutes * float(planned_qty)

    # Calculate the end date and time
    end_datetime = planned_start_date + timedelta(minutes=duration)

    # Format the end date and time as a string in "YYYY-MM-DD HH:MM:SS" format
    end_datetime_str = end_datetime.strftime('%Y-%m-%d %H:%M:%S')

    return end_datetime_str