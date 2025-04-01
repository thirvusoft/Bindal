frappe.ui.form.on('Expense Claim', {
    naming_series: function(frm) {
            const branchMapping = {
                'HO-EXP26-.####': 'Head Office',
                'U1-EXP26-.####': 'Unit-1',
                'U2-EXP26-.####': 'Unit-2',
                'U3-EXP26-.####': 'Unit-3',
                'U4-EXP26-.####': 'Unit-4'
            };
            if (branchMapping[frm.doc.naming_series]) {
                frm.doc.expenses.forEach(row => {
                    frappe.model.set_value(row.doctype, row.name, 'branch', branchMapping[frm.doc.naming_series]);
                });
                frm.refresh_field('expenses');
            }
    }
});
