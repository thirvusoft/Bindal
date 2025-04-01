frappe.ui.form.on("Material Request", {
    refresh(frm) {
        if (frm.doc.docstatus == 1 && frm.doc.status != 'Stopped') {
            let precision = frappe.defaults.get_default("float_precision");
            if (flt(frm.doc.per_ordered, precision) < 100) {
                if (frm.doc.material_request_type === "Sales") {
                    frm.add_custom_button(__("Sales Order"),
                        () => frm.events.make_sales_order(frm), __('Create'));
                }
            }
        }
    },
    make_sales_order: function(frm) {
		frappe.model.open_mapped_doc({
			method: "bindal.bindal.custom.py.material_request.make_sales_order",
			frm: frm
		});
	},
    naming_series: function(frm) {
        const branchMapping = {
            'HO-MRQ26-.####': 'Head Office',
            'U1-MRQ26-.####': 'Unit-1',
            'U2-MRQ26-.####': 'Unit-2',
            'U3-MRQ26-.####': 'Unit-3',
            'U4-MRQ26-.####': 'Unit-4'
        };
        
        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('custom_branch', branchMapping[frm.doc.naming_series]);
        }        
    }
});