frappe.ui.form.on('Employee Advance', {
    naming_series: function(frm) {
        const branchMapping = {
            'HO-ADV27-.####': 'Head Office',
            'U1-ADV27-.####': 'Unit-1',
            'U2-ADV27-.####': 'Unit-2',
            'U3-ADV27-.####': 'Unit-3',
            'U4-ADV27-.####': 'Unit-4'
        };
        
        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('custom_branch', branchMapping[frm.doc.naming_series]);
        }
    }
});
