frappe.ui.form.on('Additional Salary', {
    naming_series: function(frm) {
        const branchMapping = {
            'HO-ADS27-.####': 'Head Office',
            'U1-ADS27-.####': 'Unit-1',
            'U2-ADS27-.####': 'Unit-2',
            'U3-ADS27-.####': 'Unit-3',
            'U4-ADS27-.####': 'Unit-4'
        };
        
        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('custom_branch', branchMapping[frm.doc.naming_series]);
        }  
    }
});

