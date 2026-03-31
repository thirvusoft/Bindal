frappe.ui.form.on('Journal Entry', {
    naming_series: function(frm) {
        if(frm.doc.voucher_type == 'Journal Entry') {
            const branchMapping = {
                'HO-JV27-.####': 'Head Office',
                'U1-JV27-.####': 'Unit-1',
                'U2-JV27-.####': 'Unit-2',
                'U3-JV27-.####': 'Unit-3',
                'U4-JV27-.####': 'Unit-4'
            };
            if (branchMapping[frm.doc.naming_series]) {
                frm.doc.accounts.forEach(row => {
                    frappe.model.set_value(row.doctype, row.name, 'branch', branchMapping[frm.doc.naming_series]);
                });
                frm.refresh_field('accounts');
            }
        }
        else if(frm.doc.voucher_type == 'Debit Note') {
            const branchMapping = {
                'HO-JVDN27-.####': 'Head Office',
                'U1-JVDN27-.####': 'Unit-1',
                'U2-JVDN27-.####': 'Unit-2',
                'U3-JVDN27-.####': 'Unit-3',
                'U4-JVDN27-.####': 'Unit-4'
            };
            if (branchMapping[frm.doc.naming_series]) {
                frm.doc.accounts.forEach(row => {
                    frappe.model.set_value(row.doctype, row.name, 'branch', branchMapping[frm.doc.naming_series]);
                });
                frm.refresh_field('accounts');
            }
        }
        else if(frm.doc.voucher_type == 'Credit Note') {
            const branchMapping = {
                'HO-JVCN27-.####': 'Head Office',
                'U1-JVCN27-.####': 'Unit-1',
                'U2-JVCN27-.####': 'Unit-2',
                'U3-JVCN27-.####': 'Unit-3',
                'U4-JVCN27-.####': 'Unit-4'
            };
            if (branchMapping[frm.doc.naming_series]) {
                frm.doc.accounts.forEach(row => {
                    frappe.model.set_value(row.doctype, row.name, 'branch', branchMapping[frm.doc.naming_series]);
                });
                frm.refresh_field('accounts');
            }
        }
    }
});
