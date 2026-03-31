frappe.ui.form.on("Purchase Receipt", {
    naming_series: function(frm) {
        const branchMapping = {
            'HO-MR27-.####': 'Head Office',
            'U1-MR27-.####': 'Unit-1',
            'U2-MR27-.####': 'Unit-2',
            'U3-MR27-.####': 'Unit-3',
            'U4-MR27-.####': 'Unit-4',
            'HO-MRDN27-.####': 'Head Office',
            'U1-MRDN27-.####': 'Unit-1',
            'U2-MRDN27-.####': 'Unit-2',
            'U3-MRDN27-.####': 'Unit-3',
            'U4-MRDN27-.####': 'Unit-4'
        };

        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('branch', branchMapping[frm.doc.naming_series]);
        }
    }
})
