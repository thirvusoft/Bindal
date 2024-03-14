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
    }
});