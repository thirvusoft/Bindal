frappe.ui.form.on('Sales Invoice', {
    refresh: function(frm) {
        frm.add_custom_button(__('Calculate AGT Calculation'), function() {
            calculate_all_item_totals_and_update_taxes(frm);
        }).toggle(true);
    },

    onload: function(frm) {
        if (!frm.doc.taxes || frm.doc.taxes.length === 0) {
            let row = frm.add_child('taxes');
            frm.refresh_field('taxes');
        }
    },
    naming_series: function(frm) {
        const branchMapping = {
            'BHO-2526-.####': 'Head Office',
            'B1-2526-.####': 'Unit-1',
            'B2-2526-.####': 'Unit-2',
            'B3-2526-.####': 'Unit-3',
            'B4-2526-.####': 'Unit-4',
            'BHO-CR-F26-.####': 'Head Office',
            'B1-CR-F26-.####': 'Unit-1',
            'B2-CR-F26-.####': 'Unit-2',
            'B3-CR-F26-.####': 'Unit-3',
            'B4-CR-F26-.####': 'Unit-4'
        };

        if (branchMapping[frm.doc.naming_series]) {
            frm.set_value('branch', branchMapping[frm.doc.naming_series]);
        }
    }
});


function calculate_all_item_totals_and_update_taxes(frm) {
    let total_weight = 0;

    frm.doc.items.forEach(function(item) {
        if (item.custom_ts_item_agt_weight && item.qty && item.custom_ts_agt_weight_rate) {
            let total_weight_price = (item.custom_ts_item_agt_weight * item.qty) * item.custom_ts_agt_weight_rate;
            frappe.model.set_value(item.doctype, item.name, 'custom_total_weight_price', total_weight_price || 0);
            total_weight += total_weight_price;
        }
    });

    frappe.db.get_value('Item', {
        name: 'AGT Payable',
    }, 'name').then(r => {
        let item_name = r.message.name;
        if (item_name) {
            let existing_item_row = null;
            frm.doc.items.forEach(function(item) {
                if (item.item_code === item_name) {
                    existing_item_row = item;
                }
            });

            if (existing_item_row) {
                frappe.model.set_value(existing_item_row.doctype, existing_item_row.name, 'rate', total_weight);
            } else {
                let item_row = frm.add_child('items');
                frappe.model.set_value(item_row.doctype, item_row.name, 'idx', frm.doc.items.length);
                frappe.model.set_value(item_row.doctype, item_row.name, 'item_code', item_name);
                frappe.model.set_value(item_row.doctype, item_row.name, 'qty', 1);
                setTimeout(() => {
                    frappe.model.set_value(item_row.doctype, item_row.name, 'price_list_rate', total_weight);
                    frappe.model.set_value(item_row.doctype, item_row.name, 'rate', total_weight);
                    frappe.model.set_value(item_row.doctype, item_row.name, 'amount', total_weight);
                }, 200);


            }
            frm.refresh_field('items');
        } else {
            frappe.msgprint('No Item found for AGT Payable ..');
        }
    })
}