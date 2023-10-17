// Copyright (c) 2023, jyoti and contributors
// For license information, please see license.txt

frappe.ui.form.on('Incoming Material Inspection', {
    item_name: function(frm) {
        frappe.db.get_doc("Item", frm.doc.item_name).then(function(item) {
            if (item.incoming_material_inspection_table) {
                var characteristicsList = [];
                var specificationsList = [];
                var measurementTechniquesList = [];

                item.incoming_material_inspection_table.forEach(function(row) {
                    if (row.check === 1) {

                        characteristicsList.push(row.product_characteristics);
                        specificationsList.push(row.product_specifications);
                        measurementTechniquesList.push(row.measurement_technique);
                    }
                });
				frappe.model.set_value(frm.doc.doctype, frm.doc.name, "incoming_material_inspection_table", []);

				for (var i = 0; i < characteristicsList.length; i++) {
					var child = frm.add_child("incoming_material_inspection_table");
					frappe.model.set_value(child.doctype, child.name, "product_characteristics", characteristicsList[i]);
					frappe.model.set_value(child.doctype, child.name, "product_specifications", specificationsList[i]);
					frappe.model.set_value(child.doctype, child.name, "measurement_technique", measurementTechniquesList[i]);
				}
            }
			frm.refresh_field("incoming_material_inspection_table"); 

        });
    }
});