frappe.ui.form.on("Delivery Note", {

    naming_series: function(frm) {
        const branchMapping = {
            'HO-DLIN27-.####': 'Head Office',
            'U1-DLIN27-.####': 'Unit-1',
            'U2-DLIN27-.####': 'Unit-2',
            'U3-DLIN27-.####': 'Unit-3',
            'U4-DLIN27-.####': 'Unit-4',
            'HO-INT27-.####': 'Head Office',
            'U1-INT27-.####': 'Unit-1',
            'U2-INT27-.####': 'Unit-2',
            'U3-INT27-.####': 'Unit-3',
            'U4-INT27-.####': 'Unit-4',
            'HO-RGP27-.####': 'Head Office',
            'U1-RGP27-.####': 'Unit-1',
            'U2-RGP27-.####': 'Unit-2',
            'U3-RGP27-.####': 'Unit-3',
            'U4-RGP27-.####': 'Unit-4',
            'HO-CR27-.####': 'Head Office',
            'U1-CR27-.####': 'Unit-1',
            'U2-CR27-.####': 'Unit-2',
            'U3-CR27-.####': 'Unit-3',
            'U4-CR27-.####': 'Unit-4'
        };

        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('branch', branchMapping[frm.doc.naming_series]);
        }

    }
})