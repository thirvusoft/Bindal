frappe.ui.form.on('Journal Entry', {
    naming_series: function(frm) {
        if(frm.doc.voucher_type == 'Journal Entry') {
            const branchMapping = {
                'HO-JV26-.####': 'Head Office',
                'U1-JV26-.####': 'Unit-1',
                'U2-JV26-.####': 'Unit-2',
                'U3-JV26-.####': 'Unit-3',
                'U4-JV26-.####': 'Unit-4'
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
                'HO-JVDN26-.####': 'Head Office',
                'U1-JVDN26-.####': 'Unit-1',
                'U2-JVDN26-.####': 'Unit-2',
                'U3-JVDN26-.####': 'Unit-3',
                'U4-JVDN26-.####': 'Unit-4'
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
                'HO-JVCN26-.####': 'Head Office',
                'U1-JVCN26-.####': 'Unit-1',
                'U2-JVCN26-.####': 'Unit-2',
                'U3-JVCN26-.####': 'Unit-3',
                'U4-JVCN26-.####': 'Unit-4'
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
