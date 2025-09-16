frappe.ui.form.on("Purchase Receipt", {
    naming_series: function(frm) {
        const branchMapping = {
            'HO-MR26-.####': 'Head Office',
            'U1-MR26-.####': 'Unit-1',
            'U2-MR26-.####': 'Unit-2',
            'U3-MR26-.####': 'Unit-3',
            'U4-MR26-.####': 'Unit-4',
            'HO-MRDN26-.####': 'Head Office',
            'U1-MRDN26-.####': 'Unit-1',
            'U2-MRDN26-.####': 'Unit-2',
            'U3-MRDN26-.####': 'Unit-3',
            'U4-MRDN26-.####': 'Unit-4',
            "WH1-MR26-.####": "Warehouse U1"
        };

        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('branch', branchMapping[frm.doc.naming_series]);
        }
    }
})
