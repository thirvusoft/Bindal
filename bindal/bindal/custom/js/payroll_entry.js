frappe.ui.form.on("Payroll Entry", {

    custom_naming_series: function(frm) {
        const branchMapping = {
            'HO-PAYROLL-.####': 'Head Office',
            'U1-PAYROLL-.####': 'Unit-1',
            'U2-PAYROLL-.####': 'Unit-2',
            'U3-PAYROLL-.####': 'Unit-3',
            'U4-PAYROLL-.####': 'Unit-4'
        };

        if (branchMapping[frm.doc.custom_naming_series]) {
            frm.set_value('branch', branchMapping[frm.doc.custom_naming_series]);
        }
    }
})