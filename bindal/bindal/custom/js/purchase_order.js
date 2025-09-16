frappe.ui.form.on("Purchase Order", {
    naming_series(frm) {
        if(frm.doc.naming_series == 'HO-PO26-.####') {
          frm.set_value('branch', 'Head Office')
        }
        else if(frm.doc.naming_series == 'U1-PO26-.####') {
          frm.set_value('branch', 'Unit-1')
        }
        else if(frm.doc.naming_series == 'U2-PO26-.####') {
          frm.set_value('branch', 'Unit-2')
        }
        else if(frm.doc.naming_series == 'U3-PO26-.####') {
          frm.set_value('branch', 'Unit-3')
        }
        else if(frm.doc.naming_series == 'U4-PO26-.####') {
          frm.set_value('branch', 'Unit-4')
        }
        else if(frm.doc.naming_series == 'WH1-PO26-.####') {
          frm.set_value('branch', 'Warehouse U1')
        }
      }
});