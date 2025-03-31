frappe.ui.form.on('Payment Entry', {
    naming_series: function(frm) {
        const branchMapping = {
            'HO-BANK26-.####': 'Head Office',
            'U1-BANK26-.####': 'Unit-1',
            'U2-BANK26-.####': 'Unit-2',
            'U3-BANK26-.####': 'Unit-3',
            'U4-BANK26-.####': 'Unit-4'
        };
        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('branch', branchMapping[frm.doc.naming_series]);
        }
    }
})