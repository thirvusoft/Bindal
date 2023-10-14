frappe.ui.form.on("Production Plan", {
    setup:function(frm){
        frm.set_query('workstation',"po_items", (frm, cdt, cdn) => {
            let row = locals[cdt][cdn]
            return {
                query: "bindal.bindal.custom.py.production_plan.get_workstation",
                filters:{
                    area_zone:cur_frm.doc.area_zone
                }
            };

		}); 
    }

})