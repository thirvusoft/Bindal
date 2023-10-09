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
	refresh:function(frm){
		frm.trigger('leakage')
		frm.trigger('leakage2')
		frm.trigger('leakage3')
		frm.trigger('leakage4')
		frm.trigger('leakage5')

	}
});
