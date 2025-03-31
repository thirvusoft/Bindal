frappe.ui.form.on("Quotation", {

    naming_series: function(frm) {
        const branchMapping = {
            'HO-QUOTE-.####': 'Head Office',
            'U1-QUOTE-.####': 'Unit-1',
            'U2-QUOTE-.####': 'Unit-2',
            'U3-QUOTE-.####': 'Unit-3',
            'U4-QUOTE-.####': 'Unit-4',
            'HO-PERFORMA-.####': 'Head Office',
            'U1-PERFORMA-.####': 'Unit-1',
            'U2-PERFORMA-.####': 'Unit-2',
            'U3-PERFORMA-.####': 'Unit-3',
            'U4-PERFORMA-.####': 'Unit-4'
        };

        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('custom_branch', branchMapping[frm.doc.naming_series]);
        }
    }
})