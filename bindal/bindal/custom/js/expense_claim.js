frappe.ui.form.on('Expense Claim', {
    naming_series: function(frm) {
            const branchMapping = {
                'HO-EXP27-.####': 'Head Office',
                'U1-EXP27-.####': 'Unit-1',
                'U2-EXP27-.####': 'Unit-2',
                'U3-EXP27-.####': 'Unit-3',
                'U4-EXP27-.####': 'Unit-4'
            };
            if (branchMapping[frm.doc.naming_series]) {
                frm.doc.expenses.forEach(row => {
                    frappe.model.set_value(row.doctype, row.name, 'branch', branchMapping[frm.doc.naming_series]);
                });
                frm.refresh_field('expenses');
            }
    }
});
