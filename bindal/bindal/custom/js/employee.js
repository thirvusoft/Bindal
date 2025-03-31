frappe.ui.form.on("Employee", {

    naming_series: function(frm) {
        const branchMapping = {
            'HO-EMP26-.####': 'Head Office',
            'U1-EMP26-.####': 'Unit-1',
            'U2-EMP26-.####': 'Unit-2',
            'U3-EMP26-.####': 'Unit-3',
            'U4-EMP26-.####': 'Unit-4'
        };

        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('branch', branchMapping[frm.doc.naming_series]);
        }

    }
})