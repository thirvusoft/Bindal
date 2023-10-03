// Copyright (c) 2023, jyoti and contributors
// For license information, please see license.txt

frappe.ui.form.on('MFI Test Report', {
	weight_gm: function(frm) {
		frm.set_value('mfi',(frm.doc.weight_gm*600)/frm.doc.cut_off_time_sec)
		frm.trigger('avg')
	},
	cut_off_time_sec:function(frm){
		frm.set_value('mfi',(frm.doc.weight_gm*600)/frm.doc.cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_2_weight_gm: function(frm) {
		frm.set_value('sn_2_mfi',(frm.doc.sn_2_weight_gm*600)/frm.doc.sn_2_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_2_cut_off_time_sec:function(frm){
		frm.set_value('sn_2_mfi',(frm.doc.sn_2_weight_gm*600)/frm.doc.sn_2_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_3_weight_gm: function(frm) {
		frm.set_value('sn_3_mfi',(frm.doc.sn_3_weight_gm*600)/frm.doc.sn_3_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_3_cut_off_time_sec:function(frm){
		frm.set_value('sn_3_mfi',(frm.doc.sn_3_weight_gm*600)/frm.doc.sn_3_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_4_wg: function(frm) {
		frm.set_value('sn_4_mfi',(frm.doc.sn_4_wg*600)/frm.doc.sn_4_ct)
		frm.trigger('avg')

	},
	sn_4_ct:function(frm){
		frm.set_value('sn_4_mfi',(frm.doc.sn_4_wg*600)/frm.doc.sn_4_ct)
		frm.trigger('avg')

	},
	sn_5_weight_gm: function(frm) {
		frm.set_value('sn_5_mfi',(frm.doc.sn_5_weight_gm*600)/frm.doc.sn_5_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_5_cut_off_time_sec:function(frm){
		frm.set_value('sn_5_mfi',(frm.doc.sn_5_weight_gm*600)/frm.doc.sn_5_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_6_weight_gm: function(frm) {
		frm.set_value('sn_6_mfi',(frm.doc.sn_6_weight_gm*600)/frm.doc.sn_6_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_6_cut_off_time_sec:function(frm){
		frm.set_value('sn_6_mfi',(frm.doc.sn_6_weight_gm*600)/frm.doc.sn_6_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_7_weight_gm: function(frm) {
		frm.set_value('sn_7_mfi',(frm.doc.sn_7_weight_gm*600)/frm.doc.sn_7_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_7_cut_off_time_sec:function(frm){
		frm.set_value('sn_7_mfi',(frm.doc.sn_7_weight_gm*600)/frm.doc.sn_7_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_8_weight_gm: function(frm) {
		frm.set_value('sn_8_mfi',(frm.doc.sn_8_weight_gm*600)/frm.doc.sn_8_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_8_cut_off_time_sec:function(frm){
		frm.set_value('sn_8_mfi',(frm.doc.sn_8_weight_gm*600)/frm.doc.sn_8_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_9_weight_gm: function(frm) {
		frm.set_value('sn_9_mfi',(frm.doc.sn_9_weight_gm*600)/frm.doc.sn_9_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_9_cut_off_time_sec:function(frm){
		frm.set_value('sn_9_mfi',(frm.doc.sn_9_weight_gm*600)/frm.doc.sn_9_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_10_weight_gm: function(frm) {
		frm.set_value('sn_10_mfi',(frm.doc.sn_10_weight_gm*600)/frm.doc.sn_10_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_10_cut_off_time_sec:function(frm){
		frm.set_value('sn_10_mfi',(frm.doc.sn_10_weight_gm*600)/frm.doc.sn_10_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_11_weight_gm: function(frm) {
		frm.set_value('sn_11_mfi',(frm.doc.sn_11_weight_gm*600)/frm.doc.sn_11_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_11_cut_off_time_sec:function(frm){
		frm.set_value('sn_11_mfi',(frm.doc.sn_11_weight_gm*600)/frm.doc.sn_11_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_12_weight_gm: function(frm) {
		frm.set_value('sn_12_mfi',(frm.doc.sn_12_weight_gm*600)/frm.doc.sn_12_cut_off_time_sec)
		frm.trigger('avg')

	},
	sn_12_cut_off_time_sec:function(frm){
		frm.set_value('sn_12_mfi',(frm.doc.sn_12_weight_gm*600)/frm.doc.sn_12_cut_off_time_sec)
		frm.trigger('avg')

	},
	avg:function(frm){
		let average =  parseFloat(frm.doc.sn_12_mfi) + parseFloat( frm.doc.sn_11_mfi)  + parseFloat(frm.doc.sn_10_mfi)  +
		  parseFloat(frm.doc.sn_9_mfi)  + parseFloat(frm.doc.sn_8_mfi)  + parseFloat(frm.doc.sn_7_mfi)  +
		  parseFloat(frm.doc.sn_6_mfi)  + parseFloat(frm.doc.sn_5_mfi)  + parseFloat(frm.doc.sn_4_mfi)  + 
		  parseFloat(frm.doc.sn_3_mfi)  + parseFloat(frm.doc.sn_2_mfi)  + parseFloat(frm.doc.mfi) 
		
		console.log(average)
		frm.set_value('average_value_of_mfi',average/12)
	}
});
