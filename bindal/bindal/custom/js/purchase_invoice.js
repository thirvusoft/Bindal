frappe.ui.form.on("Purchase Invoice", {
    setup:function(frm){
        setTimeout(() => {
            frm.set_query('expense_account',"items", (frm, cdt, cdn) => {
                let row = locals[cdt][cdn]
                return {
                    filters: {'is_group': 0, 'company': cur_frm.doc.company }
                };

            }); 
        }, 250);
            
    }

})