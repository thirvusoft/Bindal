// Copyright (c) 2023, jyoti and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Barcode Label"] = {
	"filters": [
		{
			"fieldname":"item_from",
			"label": __("Item From"),
			"fieldtype": "Select",
			"options": "Work Order\nGate Entry",
			on_change: function() {
				let filter_based_on = frappe.query_report.get_filter_value('item_from');
				frappe.query_report.toggle_filter_display('work_order', filter_based_on === 'Gate Entry');
				frappe.query_report.toggle_filter_display('gate_entry', filter_based_on === 'Work Order');
				frappe.query_report.set_filter_value('work_order','')
				frappe.query_report.set_filter_value('gate_entry','')
				frappe.query_report.refresh();
			},
			'reqd':1
		},
		{
			"fieldname":"work_order",
			"label": __("Work Order"),
			"fieldtype": "Link",
			"options": "Work Order",
			get_query:function(){
				return{
					filters:{
						'docstatus':1
					}
				}
			},
			on_change:function(){
				if(frappe.query_report.get_filter_value('work_order')){
					frappe.db.get_value('Work Order', {'name': frappe.query_report.get_filter_value('work_order')}, 'production_item', (r) => {
						frappe.query_report.set_filter_value('item',r.production_item)

				});
			}
			else{
				frappe.query_report.set_filter_value('item','')
			}
			}
		},
		{
			"fieldname":"gate_entry",
			"label": __("Gate Entry"),
			"fieldtype": "Link",
			"options": "Gate Entry",
			get_query:function(){
				return{
					filters:{
						'docstatus':1
					}
				}
			},

		},
		{
			"fieldname":"item",
			"label": __("Item"),
			"fieldtype": "Link",
			"options": "Item",
			get_query:function(){
				if (frappe.query_report.get_filter_value('gate_entry') ){
					return{
						query: "bindal.bindal.custom.py.gate_entry.get_items",
						filters:{
							name: frappe.query_report.get_filter_value('gate_entry'),
						}
					}
				}
				else if(frappe.query_report.get_filter_value('work_order')){
					frappe.db.get_value('Work Order', {'name': frappe.query_report.get_filter_value('work_order')}, 'production_item', (r) => {
						return{
							query: "bindal.bindal.custom.py.gate_entry.get_items",
							filters:{
								name: r.production_item,
							}
						}
					});
					
				}
			},
		},
		// {
		// 	"fieldname":"type",
		// 	"label": __("Type"),
		// 	"fieldtype": "Select",
		// 	"options": "Series of Barcode\nSingle Barcode",
		// 	get_query:function(){
		// 		return{
		// 			filters:{
		// 				'docstatus':1
		// 			}
		// 		}
		// 	},
		// 	'reqd':1
		// },
		{
			"fieldname":"barcode",
			"label": __("Barcode"),
			"fieldtype": "Link",
			"options": "Barcode Label",
			get_query:function(){
				return{
					filters:{
					  'reference_document':frappe.query_report.get_filter_value('work_order')|| frappe.query_report.get_filter_value('gate_entry'),
					  'item':frappe.query_report.get_filter_value('item')
					}
				  }
			},
			'mandatory_depends_on':'eval:doc.type=="Single Barcode"'
		}
	]
};
