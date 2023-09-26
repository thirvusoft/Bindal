frappe.ui.form.on("Gate Entry", {
	refresh: function (frm) {
        if(frm.doc.docstatus){
            // frm.add_custom_button(__('Print Barcode'), function () {
            //   var d = new frappe.ui.Dialog({
            //     title: __('Barcode Details'),
            //     fields: [
            //       {
            //         "label" : "Item",
            //         "fieldname": "item",
            //         "fieldtype": "Link",
            //         "reqd": 1,
            //         "options": "Item",
            //         "get_query":function(r){
            //           return {
            //             query: "bindal.bindal.custom.py.gate_entry.get_items",
            //             filters:{
            //               name:frm.doc.name
            //             }
            //           };
            //         }
            //       },
            //       {
            //         "label" : "Type",
            //         "fieldname": "type",
            //         "fieldtype": "Select",
            //         "options":"Series of Barcode\nSingle Barcode",
            //         "reqd": 1,

            //       },
            //       {
            //         "label" : "Barcode",
            //         "fieldname": "barcode",
            //         "fieldtype": "Link",
            //         "options":"Barcode Label",
            //         "depends_on": 'eval:doc.type == "Single Barcode" ',
            //         "get_query":function(r){
            //           let val = d.get_values()
            //           return{
            //             filters:{
            //               'reference_document':frm.doc.name,
            //               'item': val.item
            //             }
            //           }
            //         }
            //       }
            //     ],
            //     primary_action: function() {
            //       var data = d.get_values();
            //       frappe.call({
            //         method:"bindal.bindal.custom.py.gate_entry.update_barcode",
            //         args:{
            //             doc:frm.doc.name,
            //             data:data
            //         },
            //         callback:function(res){
            //           frm.trigger("load_print_page")
            //         }
            //       })
                
            //     },
            //     primary_action_label: __('Print')
            //   });
            //   d.show();
                
            // });
                
        }
    },
    load_print_page(frm) {
        const print_format = "Raw Material Barcode"
        const letter_head = 0;
        const url =
          frappe.urllib.get_base_url() +
          "/printview?doctype=Gate Entry&name=" +
          frm.doc.name +
          "&trigger_print=1" +
          "&format=" +
          print_format +
          "&no_letterhead=" +
          letter_head;
        const printWindow = window.open(url, "Print");
        printWindow.addEventListener(
          "load",
          function () {
            printWindow.print();
          },
          true
        );
      },
})

// frappe.ui.form.on("PO Item", {
//   item_code:function(frm,cdt,cdn){
//     let row = locals[cdt][cdn]
//     frappe.db.get_value("Item", row.item_code, "last_updated_series", (r) => {
//       frappe.model.set_value(cdt, cdn, "last_updated_series", r.last_updated_series);
//     });
//   },
//   last_updated_series:function(frm,cdt,cdn){
//     let row = locals[cdt][cdn]
//     frappe.model.set_value(cdt, cdn, "current_series", row.last_updated_series+1);
//   },
// })
