frappe.ui.form.on('Budget', {
    refresh: function (frm) {
        frm.fields_dict['custom_group_account'].grid.get_field('group_account').get_query = function(doc, cdt, cdn) {
            return {
                filters: {
                    'is_group': 1
                }
            };
        };
    },
    custom_fetch_child_accounts: function (frm) {
        frappe.call({
            method: "bindal.bindal.custom.py.budget.get_child_account",
            args: {
                doc: JSON.stringify(frm.doc)
            },
            callback: function (r) {
                if (r.message) {
                    frm.clear_table("accounts");
    
                    r.message.forEach(function (child_account) {
                        let row = frm.add_child("accounts");
                        row.account = child_account.account;
                        row.budget_amount = child_account.allocated_budget;
                    });
                    frm.refresh_field("accounts");
                }
            }
        });
    }
});
