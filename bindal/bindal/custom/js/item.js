frappe.ui.form.on('Item', {
    onload: function(frm) {
        var len_table=frm.doc.incoming_material_inspection_table.length
        if (len_table==0) {
        var characteristics = ["Length (mm)", "Width (mm)", "Height (mm)","No of ply (mm)","Bursting strength of corrugated board (Kg/cm2)","Paper Thickness (mm)","Paper Thickness (mm)","Paper Thickness (mm)","Printing Colour","Print Quality","Weight (Kg)"];
        var specifications = ["560±2", "480±2", "205±2","3","5.0(+0.5,-0.2)","Sheet - 1","Sheet - 2","Sheet - 3","Black","Free from any type of printing defects","0.600±10"];
        var measurement_techniques = ["Scale","Scale","Scale", "Visual & manual", "Bursting strength test","Micro Meter","Micro Meter","Micro Meter","Visual","Visual","Weighing Machine"];
 
        for (var i = 0; i < characteristics.length; i++) {
            var child = frm.add_child("incoming_material_inspection_table");
            frappe.model.set_value(child.doctype, child.name, "product_characteristics", characteristics[i]);
            frappe.model.set_value(child.doctype, child.name, "product_specifications", specifications[i]);
            frappe.model.set_value(child.doctype, child.name, "measurement_technique", measurement_techniques[i]);
        }

        }}
});