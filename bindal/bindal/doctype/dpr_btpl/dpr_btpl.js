// Copyright (c) 2024, jyoti and contributors
// For license information, please see license.txt

frappe.ui.form.on('DPR BTPL', {
	a_prod_1: function(frm) {
		frm.set_value('ok_prod_1',(frm.doc.a_prod_1 || 0 )- (frm.doc.rej_prod_1 ||0))
	},
	rej_prod_1: function(frm) {
		frm.set_value('ok_prod_1',(frm.doc.a_prod_1 || 0 )- (frm.doc.rej_prod_1 ||0))
	},
});
