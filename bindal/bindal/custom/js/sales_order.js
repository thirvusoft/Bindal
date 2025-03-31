frappe.ui.form.on("Sales Order", {
    refresh(frm) {
        if (frm.doc.docstatus===0) {
			frm.add_custom_button(__('Material Request'), function() {
                const allowed_request_types = ["Sales","Manufacture"];
				const d = erpnext.utils.map_current_doc({
					method: "bindal.bindal.custom.py.material_request.make_sales_order",
					source_doctype: "Material Request",
					target: frm,
					date_field: "schedule_date",
					setters: [
					{
						fieldtype: 'Link',
						label: __('Customer'),
						options: 'Customer',
						fieldname: 'customer',
						default:frm.doc.customer
					}],
					get_query_filters: {
						docstatus: 1,
						material_request_type: ["in", allowed_request_types],
						per_ordered: ["<", 100]
					}
				})
			}, __("Get Items From"));
		}
    },
	naming_series: function(frm) {
		const branchMapping = {
            'HO-SO26-.####': 'Head Office',
            'U1-SO26-.####': 'Unit-1',
            'U2-SO26-.####': 'Unit-2',
            'U3-SO26-.####': 'Unit-3',
            'U4-SO26-.####': 'Unit-4'
        };

        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('branch', branchMapping[frm.doc.naming_series]);
        }

	}
});