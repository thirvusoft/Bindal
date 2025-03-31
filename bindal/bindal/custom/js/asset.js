frappe.ui.form.on("Asset", {

    naming_series: function(frm) {
        const branchMapping = {
            'HO-ASS26-.####': 'Head Office',
            'U1-ASS26-.####': 'Unit-1',
            'U2-ASS26-.####': 'Unit-2',
            'U3-ASS26-.####': 'Unit-3',
            'U4-ASS26-.####': 'Unit-4'
        };

        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('branch', branchMapping[frm.doc.naming_series]);
        }
    }
})