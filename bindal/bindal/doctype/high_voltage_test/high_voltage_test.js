// Copyright (c) 2023, jyoti and contributors
// For license information, please see license.txt

frappe.ui.form.on('High Voltage Test', {
	leakage: function(frm) {
		if(frm.doc.leakage == "YES"){
			frm.set_value('remarks',"Satisfactory")
		}
		else{
			frm.set_value('remarks',"Dissatisfactory")
		}
	},
	leakage2: function(frm) {
		if(frm.doc.leakage2 == "YES"){
			frm.set_value('remarks2',"Satisfactory")
		}
		else{
			frm.set_value('remarks2',"Dissatisfactory")
		}
	},
	leakage3: function(frm) {
		if(frm.doc.leakage3 == "YES"){
			frm.set_value('remarks3',"Satisfactory")
		}
		else{
			frm.set_value('remarks3',"Dissatisfactory")
		}
	},
	leakage4: function(frm) {
		if(frm.doc.leakage4 == "YES"){
			frm.set_value('remarks4',"Satisfactory")
		}
		else{
			frm.set_value('remarks4',"Dissatisfactory")
		}
	},
	leakage5: function(frm) {
		if(frm.doc.leakage5 == "YES"){
			frm.set_value('remark5',"Satisfactory")
		}
		else{
			frm.set_value('remark5',"Dissatisfactory")
		}
	},
	leakage6: function(frm) {
		if(frm.doc.leakage6 == "YES"){
			frm.set_value('remark6',"Satisfactory")
		}
		else{
			frm.set_value('remark6',"Dissatisfactory")
		}
	},
	leakage7: function(frm) {
		if(frm.doc.leakage7 == "YES"){
			frm.set_value('remark7',"Satisfactory")
		}
		else{
			frm.set_value('remark7',"Dissatisfactory")
		}
	},
	leakage8: function(frm) {
		if(frm.doc.leakage8 == "YES"){
			frm.set_value('remark8',"Satisfactory")
		}
		else{
			frm.set_value('remark8',"Dissatisfactory")
		}
	},
	leakage9: function(frm) {
		if(frm.doc.leakage9 == "YES"){
			frm.set_value('remark9',"Satisfactory")
		}
		else{
			frm.set_value('remark9',"Dissatisfactory")
		}
	},
	leakage10: function(frm) {
		if(frm.doc.leakage10 == "YES"){
			frm.set_value('remark10',"Satisfactory")
		}
		else{
			frm.set_value('remark10',"Dissatisfactory")
		}
	},
	leakage11: function(frm) {
		if(frm.doc.leakage11 == "YES"){
			frm.set_value('remark11',"Satisfactory")
		}
		else{
			frm.set_value('remark11',"Dissatisfactory")
		}
	},
	refresh:function(frm){
		frm.trigger('leakage')
		frm.trigger('leakage2')
		frm.trigger('leakage3')
		frm.trigger('leakage4')
		frm.trigger('leakage5')
		frm.trigger('leakage6')
		frm.trigger('leakage7')
		frm.trigger('leakage8')
		frm.trigger('leakage9')
		frm.trigger('leakage10')
		frm.trigger('leakage11')

	}
});
