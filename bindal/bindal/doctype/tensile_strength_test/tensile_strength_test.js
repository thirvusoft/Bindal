// Copyright (c) 2023, jyoti and contributors
// For license information, please see license.txt

frappe.ui.form.on('Tensile Strength Test', {
	tensile_peak_1: function(frm) {
		frm.set_value('strength_1',(frm.doc.tensile_peak_1 || 0) / (9.8065))
		frm.trigger('avg')
	},
	tensile_peak_2: function(frm) {
		frm.set_value('strength_2',(frm.doc.tensile_peak_2 || 0) / (9.8065))
		frm.trigger('avg')

	},
	tensile_peak_3: function(frm) {
		frm.set_value('strength_3',(frm.doc.tensile_peak_3 || 0) / (9.8065))
		frm.trigger('avg')
	},
	avg:function(frm){
		let e1 = (frm.doc.strength_1 || 0)
		let e2 = (frm.doc.strength_2 || 0)
		let e3 = (frm.doc.strength_3 || 0)

		let average =  parseFloat(e1 || 0) + parseFloat(e2||0)  + parseFloat(e3 || 0) 
        if(frm.doc.average.toFixed(2) != (average/3).toFixed(2)){
			frm.set_value('average',average/3)
		}
	},
	refresh:function(frm){
		frm.trigger('avg')
	}
});
