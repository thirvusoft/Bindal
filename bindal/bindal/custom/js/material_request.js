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
});