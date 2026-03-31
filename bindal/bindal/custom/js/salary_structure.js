frappe.ui.form.on("Salary Structure", {

    custom_naming_series: function(frm) {
        const branchMapping = {
            'HO-SS27-.####': 'Head Office',
            'U1-SS27-.####': 'Unit-1',
            'U2-SS27-.####': 'Unit-2',
            'U3-SS27-.####': 'Unit-3',
            'U4-SS27-.####': 'Unit-4'
        };

        if (branchMapping[frm.doc.custom_naming_series]) {
            frm.set_value('custom_branch', branchMapping[frm.doc.custom_naming_series]);
        }
    }
})
