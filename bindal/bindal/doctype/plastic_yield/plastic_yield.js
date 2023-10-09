// Copyright (c) 2023, jyoti and contributors
// For license information, please see license.txt

frappe.ui.form.on('Plastic Yield', {
	final_1: function(frm) {
		frm.set_value('yield_1',(frm.doc.initial_1|| 0)-(frm.doc.final_1|| 0))
	},
	final_2: function(frm) {
		frm.set_value('yield_2',(frm.doc.initial_2|| 0)-(frm.doc.final_2|| 0))
	},
	final_3: function(frm) {
		frm.set_value('yield_3',(frm.doc.initial_3|| 0)-(frm.doc.final_3|| 0))
	},
});
