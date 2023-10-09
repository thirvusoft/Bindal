// Copyright (c) 2023, jyoti and contributors
// For license information, please see license.txt

frappe.ui.form.on('Tensile Strength Test', {
	tensile_peak_1: function(frm) {
		frm.set_value('strength_1',(frm.doc.tensile_peak_1 || 0) / (9.8065))
	},
	tensile_peak_2: function(frm) {
		frm.set_value('strength_2',(frm.doc.tensile_peak_2 || 0) / (9.8065))
	},
	tensile_peak_3: function(frm) {
		frm.set_value('strength_3',(frm.doc.tensile_peak_3 || 0) / (9.8065))
	}
});
