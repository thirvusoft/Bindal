// Copyright (c) 2022, pavithra M R and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gate Entry', {
	type : function(frm, cdt, cdn) 
	{
	var d = locals[cdt][cdn];
	if(d.type == "Inward")
	{
	frm.set_query("supporting_document", function() {
		return {
				filters: [["DocType","name","IN",["Purchase Order","Supplier Invoice","Returnable Gate Pass"]]]
				};
				});
	}
	else if(d.type == " ")
	{
	frm.set_query("supporting_document", function() {
		return {
				filters: [["DocType","name","IN",[" "]]]
				};
				});
	}
	}
	});

frappe.ui.form.on('Gate Entry', {
	type : function(frm, cdt, cdn) 
	{
	var d = locals[cdt][cdn];
	if(d.type == "Outward")
	{
	frm.set_query("supporting_document", function() {
		return {
				filters: [["DocType","name","IN",["Delivery Note","Sales Invoice","Returnable Gate Pass","Non-Returnable Gate Pass"]]]
				};
				});
	}
	else if(d.type == " ")
	{
	frm.set_query("supporting_document", function() {
		return {
				filters: [["DocType","name","IN",[" "]]]
				};
				});
	}
	}
	});

frappe.ui.form.on('Gate Entry', {
weighment_required:function(frm,cdt,cdn)
	{
		var d = locals[cdt][cdn];
		if(d.weighment_required == "Yes")
		{
	 	frm.toggle_display("weightment_details_section", true);
    	}
    	else
    	{
    	 frm.toggle_display("weightment_details_section", false);   
    	}
	}
	});
	
frappe.ui.form.on('Gate Entry', {
type:function(frm,cdt,cdn)
	{
		var d = locals[cdt][cdn];
		
		if(d.type == "Inward")
		{
		cur_frm.refresh();
		frm.refresh_field('document_details') 
	    d.document_details = " ";
		frm.toggle_display("other_document_description", true);
		frm.toggle_display("document_details", true);
    frm.toggle_display("other_document_description_outward", false);
    frm.toggle_display("estimated_net_weight", false); 
		}
	    else if(d.type == "Outward")
		{
		cur_frm.refresh();
		frm.refresh_field('document_details')
		console.log("hai");
		frm.toggle_display("other_document_description_outward", true);
		frm.toggle_display("other_document_description", false);
		frm.toggle_display("document_details", true);
   
		}
		else
		{
		console.log("d.type",d.type);
		frm.toggle_display("other_document_description_outward", false);
		frm.toggle_display("other_document_description", false);
		frm.toggle_display("document_details", false);
    frm.toggle_display("estimated_net_weight", false);
		}
    if(d.type == "Outward" && d.supporting_document =="Delivery Note") 
    {
      frm.toggle_display("estimated_net_weight", true); 
    }
	}
});
	
frappe.ui.form.on('Gate Entry', {
  get_items: function(frm, cdt, cdn) 
  {      
    var d = locals[cdt][cdn];
    var name = d.name;
    cur_frm.clear_table("item"); 
    if(d.type == "Inward" && d.supporting_document == "Purchase Order")
	{
    console.log("hajowij");
    var po_record_number = d.record_number;
    var po = fetch_po_child_items(po_record_number);
    console.log("care",po);
   
        for(var j=0;j<po.length;j++)
        {
        var child = cur_frm.add_child("item");
        frappe.model.set_value(child.doctype, child.name, "item_name",po[j]['item_name']);
        frappe.model.set_value(child.doctype, child.name, "description",po[j]['description']);
        frappe.model.set_value(child.doctype, child.name, "item_code",po[j]['item_code']);
        frappe.model.set_value(child.doctype, child.name, "uom",po[j]['uom']);
        frappe.model.set_value(child.doctype, child.name, "qty",po[j]['pending_qty']);
        //cur_frm.refresh_field("item");
        }
        frm.refresh_field("item");
    }
    
    if(d.type == "Outward" && d.supporting_document == "Sales Invoice")
	{
    console.log("njfjdnuh");
    var so_record_number = d.record_number;
    var so = fetch_so_child_items(so_record_number);
    console.log("so",so);
     
        for(var j=0;j<so.length;j++)
        {
        var child = cur_frm.add_child("item");
        frappe.model.set_value(child.doctype, child.name, "item_name",so[j]['item_name']);
        frappe.model.set_value(child.doctype, child.name, "description",so[j]['description']);
        frappe.model.set_value(child.doctype, child.name, "item_code",so[j]['item_code']);
        frappe.model.set_value(child.doctype, child.name, "uom",so[j]['uom']);
        frappe.model.set_value(child.doctype, child.name, "qty",so[j]['pending_qty']);
       
            
        }
       
        frm.refresh_field("item");
    }
    if(d.type == "Outward" && d.supporting_document == "Delivery Note")
	{
    console.log("njfjdnuh");
    var dn_record_number = d.record_number;
    var dn = fetch_dn_child_items(dn_record_number);
    console.log("Delivery Note Item",dn);
     var tot_weight = 0;
        for(var j=0; j<dn.length;j++)
        {
        var child = cur_frm.add_child("item");
        frappe.model.set_value(child.doctype, child.name, "item_name",dn[j]['item_name']);
        frappe.model.set_value(child.doctype, child.name, "description",dn[j]['description']);
        frappe.model.set_value(child.doctype, child.name, "item_code",dn[j]['item_code']);
        frappe.model.set_value(child.doctype, child.name, "uom",dn[j]['uom']);
        frappe.model.set_value(child.doctype, child.name, "qty",dn[j]['qty']);
        tot_weight = dn[j]['total_weight'] + tot_weight;
        }
        console.log("tot_weight",tot_weight)
        cur_frm.set_value("estimated_net_weight",tot_weight);
        frm.refresh_field("item");
    }
    }  
  });

function fetch_po_child_items(po_record_number) {
    var c_name = " ";
    frappe.call({
    method: 'bindal.bindal.doctype.gate_entry.gate_entry.fetch_po_name',
   args: {
         name : po_record_number
      },
      async: false,
      callback: function(r) {
        if (r.message) {
          console.log(typeof r.message);
          c_name = r.message;
        }
      }
    });
    return c_name;
  }

function fetch_so_child_items(so_record_number) {
    var c_name = " ";
    frappe.call({
    method: 'bindal.bindal.doctype.gate_entry.gate_entry.fetch_so_name',
   args: {
         name : so_record_number
      },
      async: false,
      callback: function(r) {
        if (r.message) {
          console.log(typeof r.message);
          c_name = r.message;
        }
      }
    });
    return c_name;
  }
  
  function fetch_dn_child_items(dn_record_number) {
    var c_name = " ";
    frappe.call({
    method: 'bindal.bindal.doctype.gate_entry.gate_entry.fetch_dn_name',
   args: {
         name : dn_record_number
      },
      async: false,
      callback: function(r) {
        if (r.message) {
          console.log(typeof r.message);
          c_name = r.message;
        }
      }
    });
    return c_name;
  }
  

  frappe.ui.form.on('Gate Entry', {
    get_items: function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    
    var itemss = frm.doc.item;
    console.log("items",itemss)
    var total_weight_scale = d.total_weight_as_per_wighing_scale_;
    var total_weight = 0;
    for (var i = 0; i < itemss.length; i++) 
    {
    var item_code = itemss[i]['item_code'];
    console.log("item_code ",item_code);
    var weight=fetch_item_weight(item_code);
    console.log("weight ",weight);
    
    itemss[i]['total_weight_of_qty_rec_actual'] = weight['weight_per_unit'];
    console.log("1",weight['weight_per_unit'])
    total_weight = (total_weight + weight['weight_per_unit']);
    }
     console.log("total_weight",total_weight)
     var diff = total_weight - total_weight_scale;
            console.log(diff)
        }});
    function fetch_item_weight(item_code) 
    {
        
        console.log("entered into function");
        var has_serial_no = "";
        frappe.call({
            method: 'frappe.client.get_value',
            args: {
                'doctype': 'Item',
                'fieldname': 'weight_per_unit',
    
                 'filters': {
                    item_code: item_code,
                                }
            },
            async: false,
            callback: function(r) {
                if (r.message) {
                    // console.log(r.qty);
                     has_serial_no = r.message;
                   
                    console.log("w",has_serial_no);
                    console.log("readings-----------" + JSON.stringify(r.message));
    
                }
            }
        });
        return  has_serial_no;
    }
    
    
    frappe.ui.form.on('Gate Entry', {
    record_number: function(frm, cdt, cdn) {
    
    var d = locals[cdt][cdn];
    var record_number = d.record_number;
    if(d.other_document_description == "Supplier Invoice" && d.supporting_document =="Purchase Order")
    {
     var supplier=fetch_supplier(record_number); 
      console.log("supplier",supplier);
      cur_frm.set_value("supplier_name",supplier);
    }
        }});
    function fetch_supplier(record_number) 
    {
        
        console.log("entered into function");
        var sup = "";
        frappe.call({
            method: 'frappe.client.get_value',
            args: {
                'doctype': 'Purchase Order',
                'fieldname': 'supplier_name',
    
                 'filters': {
                    name: record_number,
                                }
            },
            async: false,
            callback: function(r) {
                if (r.message) {
                    // console.log(r.qty);
                     sup = r.message.supplier_name;
                   
                    console.log("w",sup);
                    console.log("readings-----------" + JSON.stringify(r.message));
    
                }
            }
        });
        return  sup;
    }
    
    
    frappe.ui.form.on('Gate Entry', {
      other_document_description : function(frm, cdt, cdn) 
      {
      var d = locals[cdt][cdn];
      if(d.other_document_description == "Supplier Invoice")
      {
            frm.toggle_display("supplier_name", true);
        frm.toggle_display("supplier_bill_no", true);
      }
      else
      {
            frm.toggle_display("supplier_name", false);
        frm.toggle_display("supplier_bill_no", false);  
      }
      }
      });
      frappe.ui.form.on('Gate Entry', {
      type : function(frm, cdt, cdn) 
      {
      if(d.type == "Outward")
      {
          frm.toggle_display("supplier_name", false);
        frm.toggle_display("supplier_bill_no", false);  
      }
      }
      });
      frappe.ui.form.on('Gate Entry', {
      refresh : function(frm, cdt, cdn) 
    
      {
          frm.toggle_display("supplier_name", false);
        frm.toggle_display("supplier_bill_no", false);  
      
      }
      });