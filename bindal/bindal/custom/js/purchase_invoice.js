frappe.ui.form.on("Purchase Invoice", {

    naming_series: function(frm) {
        const branchMapping = {
            'HO-PV26-.####': 'Head Office',
            'U1-PV26-.####': 'Unit-1',
            'U2-PV26-.####': 'Unit-2',
            'U3-PV26-.####': 'Unit-3',
            'U4-PV26-.####': 'Unit-4',
            'HO-PVDN26-.####': 'Head Office',
            'U1-PVDN26-.####': 'Unit-1',
            'U2-PVDN26-.####': 'Unit-2',
            'U3-PVDN26-.####': 'Unit-3',
            'U4-PVDN26-.####': 'Unit-4'
        };

        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('branch', branchMapping[frm.doc.naming_series]);
        }
    }
})