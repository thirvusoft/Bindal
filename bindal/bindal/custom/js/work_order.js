frappe.ui.form.on("Work Order", {
	refresh: function (frm) {
        if(frm.doc.docstatus){
            // frm.add_custom_button(__('Print Barcode'), function () {
            //   var d = new frappe.ui.Dialog({
            //     title: __('Barcode Details'),
            //     fields: [
            //       {
            //         "label" : "Item",
            //         "fieldname": "name",
            //         "fieldtype": "Link",
            //         "reqd": 1,
            //         "options": "Item",
            //         "default": frm.doc.production_item,
            //         "read_only":1
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
            //           return{
            //             filters:{
            //               'reference_document':frm.doc.name
            //             }
            //           }
            //         }
            //       }
            //     ],
            //     primary_action: function() {
            //       var data = d.get_values();
            //       frappe.call({
            //         method:"bindal.bindal.custom.py.work_order.update_barcode",
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
        const print_format = "Finished Goods Barcode"
        const letter_head = 0;
        const url =
          frappe.urllib.get_base_url() +
          "/printview?doctype=Work%20Order&name=" +
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



// frappe.call({
//   method:"bindal.bindal.custom.py.work_order.get_barcode",
//   args:{
//       doc:frm.doc.name,
//       data:data
//   },
//   callback:function(res){
//   }
// })