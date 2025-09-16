frappe.ui.form.on("Delivery Note", {

    naming_series: function(frm) {
        const branchMapping = {
            'HO-DLIN26-.####': 'Head Office',
            'U1-DLIN26-.####': 'Unit-1',
            'U2-DLIN26-.####': 'Unit-2',
            'U3-DLIN26-.####': 'Unit-3',
            'U4-DLIN26-.####': 'Unit-4',
            'HO-INT26-.####': 'Head Office',
            'U1-INT26-.####': 'Unit-1',
            'U2-INT26-.####': 'Unit-2',
            'U3-INT26-.####': 'Unit-3',
            'U4-INT26-.####': 'Unit-4',
            'HO-RGP26-.####': 'Head Office',
            'U1-RGP26-.####': 'Unit-1',
            'U2-RGP26-.####': 'Unit-2',
            'U3-RGP26-.####': 'Unit-3',
            'U4-RGP26-.####': 'Unit-4',
            'HO-CR26-.####': 'Head Office',
            'U1-CR26-.####': 'Unit-1',
            'U2-CR26-.####': 'Unit-2',
            'U3-CR26-.####': 'Unit-3',
            'U4-CR26-.####': 'Unit-4',
            'WH1-DLIN26-.####': 'Warehouse U1'
        };

        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('branch', branchMapping[frm.doc.naming_series]);
        }

    }
})