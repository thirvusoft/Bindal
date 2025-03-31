frappe.ui.form.on('Employee Advance', {
    naming_series: function(frm) {
        const branchMapping = {
            'HO-ADV26-.####': 'Head Office',
            'U1-ADV26-.####': 'Unit-1',
            'U2-ADV26-.####': 'Unit-2',
            'U3-ADV26-.####': 'Unit-3',
            'U4-ADV26-.####': 'Unit-4'
        };
        
        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('custom_branch', branchMapping[frm.doc.naming_series]);
        }
    }
});
