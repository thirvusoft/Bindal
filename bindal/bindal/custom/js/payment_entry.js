frappe.ui.form.on('Payment Entry', {
    naming_series: function(frm) {
        const branchMapping = {
            'HO-BANK27-.####': 'Head Office',
            'U1-BANK27-.####': 'Unit-1',
            'U2-BANK27-.####': 'Unit-2',
            'U3-BANK27-.####': 'Unit-3',
            'U4-BANK27-.####': 'Unit-4'
        };
        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('branch', branchMapping[frm.doc.naming_series]);
        }
    }
})