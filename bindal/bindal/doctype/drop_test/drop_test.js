// Copyright (c) 2023, jyoti and contributors
// For license information, please see license.txt

frappe.ui.form.on('Drop Test', {
	// refresh: function(frm) {

	// }
});
frappe.ui.form.on('balldrop table', {
	result: function(frm,cdt,cdn) {
		let row = locals[cdt][cdn]
		if(row.result == "OK" && row.result2 == "OK" && row.result3 == "OK" && row.result4 == "OK"){
			frappe.model.set_value(cdt,cdn,'remarks',"Satisfactory")
		}
		else{
			frappe.model.set_value(cdt,cdn,'remarks',"Dissatisfactory")
		}
	},
	result2: function(frm,cdt,cdn) {
		let row = locals[cdt][cdn]
		if(row.result == "OK" && row.result2 == "OK" && row.result3 == "OK" && row.result4 == "OK"){
			frappe.model.set_value(cdt,cdn,'remarks',"Satisfactory")
		}
		else{
			frappe.model.set_value(cdt,cdn,'remarks',"Dissatisfactory")
		}
	},
	result3: function(frm,cdt,cdn) {
		let row = locals[cdt][cdn]
		if(row.result == "OK" && row.result2 == "OK" && row.result3 == "OK" && row.result4 == "OK"){
			frappe.model.set_value(cdt,cdn,'remarks',"Satisfactory")
		}
		else{
			frappe.model.set_value(cdt,cdn,'remarks',"Dissatisfactory")
		}
	},
	result4: function(frm,cdt,cdn) {
		let row = locals[cdt][cdn]
		if(row.result == "OK" && row.result2 == "OK" && row.result3 == "OK" && row.result4 == "OK"){
			frappe.model.set_value(cdt,cdn,'remarks',"Satisfactory")
		}
		else{
			frappe.model.set_value(cdt,cdn,'remarks',"Dissatisfactory")
		}
	},
});