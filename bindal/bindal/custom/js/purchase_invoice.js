frappe.ui.form.on("Purchase Invoice", {

    naming_series: function(frm) {
        const branchMapping = {
            'HO-PV27-.####': 'Head Office',
            'U1-PV27-.####': 'Unit-1',
            'U2-PV27-.####': 'Unit-2',
            'U3-PV27-.####': 'Unit-3',
            'U4-PV27-.####': 'Unit-4',
            'HO-PVDN27-.####': 'Head Office',
            'U1-PVDN27-.####': 'Unit-1',
            'U2-PVDN27-.####': 'Unit-2',
            'U3-PVDN27-.####': 'Unit-3',
            'U4-PVDN27-.####': 'Unit-4'
        };

        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('branch', branchMapping[frm.doc.naming_series]);
        }
    }
})