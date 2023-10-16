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
frappe.ui.form.on("Production Plan Item", {
    cycle_time:function(frm,cdt,cdn){
        let row = locals[cdt][cdn]
        if(row.cycle_time){
            if(row.planned_start_date && row.planned_qty){
                frappe.call({
                    method:"bindal.bindal.custom.py.production_plan.expected_end_time",
                    args:{
                        cycle_time:row.cycle_time,
                        planned_start_date:row.planned_start_date,
                        planned_qty:row.planned_qty
                    },
                    callback:function(res){
                        frappe.model.set_value(row.doctype, row.name, 'expected_end_time',res.message)
                    }
                })
            }
            else if(!row.planned_qty){
                frappe.msgprint("Kindly Enter Planned Qty")
            }
            else if(!row.planned_start_date){
                frappe.msgprint("Kindly Enter Planned Start Date")
            }    
        }
    },
    planned_qty:async function(frm,cdt,cdn){
        let row = locals[cdt][cdn]

        let time = row.cycle_time
        await frappe.model.set_value(row.doctype, row.name, 'cycle_time','')
        await frappe.model.set_value(row.doctype, row.name, 'cycle_time',time)

    },
    planned_start_date:async function(frm,cdt,cdn){
        let row = locals[cdt][cdn]

        let time = row.cycle_time
        await frappe.model.set_value(row.doctype, row.name, 'cycle_time','')
        await frappe.model.set_value(row.doctype, row.name, 'cycle_time',time)

    },
})