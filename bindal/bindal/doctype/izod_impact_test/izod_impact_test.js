// Copyright (c) 2023, jyoti and contributors
// For license information, please see license.txt

frappe.ui.form.on('Izod Impact Test', {
	energy_1: function(frm) {
		frm.set_value('impact_1',(((frm.doc.energy_1 || 0) / (frm.doc.thickness_1 || 0))*1000)/9.8065)
		frm.trigger('avg')
	},
	energy_2: function(frm) {
		frm.set_value('impact_2',(((frm.doc.energy_2 || 0) / (frm.doc.thickness_2 || 0))*1000)/9.8065)
		frm.trigger('avg')
	},
	energy_3: function(frm) {
		frm.set_value('impact_3',(((frm.doc.energy_3 || 0) / (frm.doc.thickness_3 || 0))*1000)/9.8065)
		frm.trigger('avg')
	},
	thickness_1: function(frm) {
		frm.set_value('impact_1',(((frm.doc.energy_1 || 0) / (frm.doc.thickness_1 || 0))*1000)/9.8065)
		frm.trigger('avg')
	},
	thickness_2: function(frm) {
		frm.set_value('impact_2',(((frm.doc.energy_2 || 0) / (frm.doc.thickness_2 || 0))*1000)/9.8065)
		frm.trigger('avg')
	},
	thickness_3: function(frm) {
		frm.set_value('impact_3',(((frm.doc.energy_3 || 0) / (frm.doc.thickness_3 || 0))*1000)/9.8065)
		frm.trigger('avg')
	},
	avg:function(frm){
		let e1 = (((frm.doc.energy_1 || 0) / (frm.doc.thickness_1 || 0))*1000)
		let e2 = (((frm.doc.energy_2 || 0) / (frm.doc.thickness_2 || 0))*1000)
		let e3 = (((frm.doc.energy_3 || 0) / (frm.doc.thickness_3 || 0))*1000)

		let average =  parseFloat(e1 || 0) + parseFloat(e2||0)  + parseFloat(e3 || 0) 
        frm.set_value('average',average/3)
	}
});
