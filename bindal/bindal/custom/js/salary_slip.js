frappe.ui.form.on("Salary Slip", {

    custom_naming_series: function(frm) {
        const branchMapping = {
            'HO-SALSLIP26-.####': 'Head Office',
            'U1-SALSLIP26-.####': 'Unit-1',
            'U2-SALSLIP26-.####': 'Unit-2',
            'U3-SALSLIP26-.####': 'Unit-3',
            'U4-SALSLIP26-.####': 'Unit-4'
        };

        if (branchMapping[frm.doc.custom_naming_series]) {
            frm.set_value('branch', branchMapping[frm.doc.custom_naming_series]);
        }
    }
})
