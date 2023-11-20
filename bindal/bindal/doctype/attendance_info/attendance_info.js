// Copyright (c) 2023, jyoti and contributors
// For license information, please see license.txt

frappe.provide('bindal');

frappe.ui.form.on('Attendance Info', {
    refresh: function(frm) {
        $(".layout-side-section").addClass("hide")
        // Create a function to refresh the page
        function refreshPage() {
			frm.trigger('trigger_branch'); // Reloads the current page
        }

        // Call the refreshPage function every 2 seconds
        var refreshInterval = setInterval(refreshPage, 10000); // 2000 milliseconds = 2 seconds


    },
    onload:function(frm){
        frm.trigger('trigger_branch')
    },
    branch:function(frm){
        frm.trigger('trigger_branch')
    },
	trigger_branch:function(frm){
		frappe.call({
			'method':"bindal.bindal.doctype.attendance_info.attendance_info.get_department",
			'args':{'branch':frm.doc.branch},
            callback:function(res){
				console.log(res.message)
				$(
					frappe.render_template("att",{department:res.message[0],checkin:res.message[2],date:res.message[3],branch:frm.doc.branch,total_count:res.message[1]})
				).appendTo(frm.fields_dict.info.$wrapper.empty());	
			}
		})

	},
				
});
bindal.redirectToEmployee = function (department,branch,date) {
    frappe.set_route('List', "Employee Checkin",
        {'department': department,'branch':branch,'time':['between',[date,date]]}
    )
        
}
bindal.redirectToList = function (date,branch) {
    frappe.set_route('List', "Employee Checkin",
        {'time':['between',[date,date]],'branch':branch}
    )
        
}
