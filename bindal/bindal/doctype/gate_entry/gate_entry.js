// Copyright (c) 2022, pavithra M R and contributors
// For license information, please see license.txt

frappe.ui.form.on('Gate Entry', {
  get_items: function(frm, cdt, cdn) 
  {
    var d = locals[cdt][cdn];
    var name = d.name;
    var record_number = d.record_number; 
    console.log("selected record_number",record_number);
    
    if(d.supporting_document == "Purchase Order")
    {
    cur_frm.clear_table("item"); 
    var data = check_record_number(record_number)
    console.log("avail qty.......",data);
    var weighment = 0;
    var weight_per_unit;
    var weight_per_u = 0;
    var estimated_total_weight_of_consignment = 0;
     for(var k = 0;k<data.length; k++)
        {
      
        var child = cur_frm.add_child("item");
        frappe.model.set_value(child.doctype, child.name, "child_record_name",data[k]['child_record_name']);
        console.log("........00000...qty",data[k]['qty']);
        frappe.model.set_value(child.doctype, child.name, "item_code",data[k]['item_code']);
        frappe.model.set_value(child.doctype, child.name, "item_name",data[k]['item_name']);
        frappe.model.set_value(child.doctype, child.name, "pending_qty",data[k]['pending_qty']); 
        frappe.model.set_value(child.doctype, child.name, "qty",data[k]['qty']);
        frappe.model.set_value(child.doctype, child.name, "po_qty",data[k]['qty']);
        frappe.model.set_value(child.doctype, child.name, "record_number",data[k]['record_number']);
        frappe.model.set_value(child.doctype, child.name, "stock_uom",data[k]['stock_uom']);
        frappe.model.set_value(child.doctype, child.name, "weight_uom",data[k]['weight_uom']);
        frappe.model.set_value(child.doctype, child.name, "conversion_factor",data[k]['conversion_factor']);
        frappe.model.set_value(child.doctype, child.name, "uom",data[k]['uom']);
        frappe.model.set_value(child.doctype, child.name, "supporting_document",d.supporting_document);
        frappe.model.set_value(child.doctype, child.name, "received_qty_in_stock_uom",data[k]['qty'] * data[k]['conversion_factor']); 
            if(data[k]['item_code'])
        {
        var gate_item_name = data[k]['item_code']
        var fetched_item_master_details = get_item_weight(gate_item_name);
        console.log("fetched_item_master_details+++++++++",fetched_item_master_details)
        if(fetched_item_master_details[0])
        {
        frappe.model.set_value(child.doctype, child.name, "weight_per_unit_of_stock_uom",fetched_item_master_details[0]['weight_per_unit']);
        weight_per_unit = fetched_item_master_details[0]['weight_per_unit']
        console.log("weight_per_unit",weight_per_unit)
        weight_per_u = weight_per_u + weight_per_unit;
        console.log("weight_per_u2222222222222222...........",weight_per_u)
        }
        }
        
        var received_qty = data[k]['qty'] * data[k]['conversion_factor'];
        var weight_of_received_qty = received_qty * weight_per_unit;
        frappe.model.set_value(child.doctype, child.name, "weight_of_received_qty",weight_of_received_qty); 
        
        estimated_total_weight_of_consignment = estimated_total_weight_of_consignment + weight_of_received_qty;
        weighment =weighment + (received_qty * weight_per_unit);
        } 
        cur_frm.set_value("estimated_net_weight",weight_per_u);
        cur_frm.set_value("estimated_total_weight_of_consignment",estimated_total_weight_of_consignment);
        cur_frm.set_value("weighment",weighment);
        cur_frm.refresh_field("item");
  }
  
     if(d.supporting_document == "Sales Invoice")
	{
    cur_frm.clear_table("item"); 
    var si_items = check_record_number_si(record_number)
    console.log("avail qty data_si  .......",si_items);
 
    var weighment = 0;
    var weight_per_unit;
    var weight_per_u = 0;
    var estimated_total_weight_of_consignment = 0;
    cur_frm.clear_table("item");
    for(var k = 0;k<si_items.length; k++)
    {
        var child = cur_frm.add_child("item");
        frappe.model.set_value(child.doctype, child.name, "child_record_name",si_items[k]['child_record_name']);
        frappe.model.set_value(child.doctype, child.name, "item_name",si_items[k]['item_name']);
       // frappe.model.set_value(child.doctype, child.name, "description",si_items[k]['description']);
        frappe.model.set_value(child.doctype, child.name, "item_code",si_items[k]['item_code']);
        frappe.model.set_value(child.doctype, child.name, "uom",si_items[k]['uom']);
        frappe.model.set_value(child.doctype, child.name, "record_number",si_items[k]['record_number']);
        frappe.model.set_value(child.doctype, child.name, "qty",si_items[k]['qty']);  
        //frappe.model.set_value(child.doctype, child.name, "pending_qty",si_items[k]['pending_qty']); 
        frappe.model.set_value(child.doctype, child.name, "stock_uom",si_items[k]['stock_uom']); 
        frappe.model.set_value(child.doctype, child.name, "weight_uom",si_items[k]['weight_uom']);
        frappe.model.set_value(child.doctype, child.name, "conversion_factor",si_items[k]['conversion_factor']); 
        frappe.model.set_value(child.doctype, child.name, "supporting_document",d.supporting_document);
        frappe.model.set_value(child.doctype, child.name, "received_qty_in_stock_uom",si_items[k]['qty'] * si_items[k]['conversion_factor']); 
        if(si_items[k]['item_code'])
        {
        var gate_item_name = si_items[k]['item_code']
        var fetched_item_master_details = get_item_weight(gate_item_name);
        if(fetched_item_master_details[0])
        {
        frappe.model.set_value(child.doctype, child.name, "weight_per_unit_of_stock_uom",fetched_item_master_details[0]['weight_per_unit']);
        weight_per_unit = fetched_item_master_details[0]['weight_per_unit']
        weight_per_u = weight_per_u + weight_per_unit;
        console.log("weight_per_u",weight_per_u)
        }
      }
        var received_qty = si_items[k]['qty'] * si_items[k]['conversion_factor'];
        var weight_of_received_qty = received_qty * weight_per_unit;
        frappe.model.set_value(child.doctype, child.name, "weight_of_received_qty",weight_of_received_qty); 
        estimated_total_weight_of_consignment = estimated_total_weight_of_consignment + weight_of_received_qty;
        weighment =weighment + (received_qty * weight_per_unit);
    } 
        cur_frm.set_value("estimated_net_weight",weight_per_u);
        cur_frm.set_value("estimated_total_weight_of_consignment",estimated_total_weight_of_consignment);
        cur_frm.set_value("weighment",weighment);
        cur_frm.refresh_field("item");
	}  
 if(d.supporting_document == "Delivery Note")
	{
	var name = d.name;
	console.log("selected delivery note")
    var dn_items = check_record_number_de(record_number);
    console.log("dn",dn_items);
  
    
    var weighment = 0;
    var weight_per_unit;
    var weight_per_u = 0;
    var estimated_total_weight_of_consignment = 0;
    cur_frm.clear_table("item");
    for(var k = 0;k<dn_items.length; k++)
    {
        var child = cur_frm.add_child("item");
        frappe.model.set_value(child.doctype, child.name, "child_record_name",dn_items[k]['child_record_name']);
        frappe.model.set_value(child.doctype, child.name, "item_name",dn_items[k]['item_name']);
       // frappe.model.set_value(child.doctype, child.name, "description",dn_items[k]['description']);
        frappe.model.set_value(child.doctype, child.name, "item_code",dn_items[k]['item_code']);
        frappe.model.set_value(child.doctype, child.name, "uom",dn_items[k]['uom']);
        frappe.model.set_value(child.doctype, child.name, "record_number",dn_items[k]['record_number']);
        frappe.model.set_value(child.doctype, child.name, "qty",dn_items[k]['qty']);  
       // frappe.model.set_value(child.doctype, child.name, "pending_qty",dn_items[k]['pending_qty']); 
        frappe.model.set_value(child.doctype, child.name, "stock_uom",dn_items[k]['stock_uom']); 
        frappe.model.set_value(child.doctype, child.name, "weight_uom",dn_items[k]['weight_uom']);
        frappe.model.set_value(child.doctype, child.name, "conversion_factor",dn_items[k]['conversion_factor']); 
        frappe.model.set_value(child.doctype, child.name, "supporting_document",d.supporting_document);
        frappe.model.set_value(child.doctype, child.name, "received_qty_in_stock_uom",dn_items[k]['qty'] * dn_items[k]['conversion_factor']); 
        if(dn_items[k]['item_code'])
        {
        var gate_item_name = dn_items[k]['item_code']
        var fetched_item_master_details = get_item_weight(gate_item_name);
        if(fetched_item_master_details[0])
        {
        frappe.model.set_value(child.doctype, child.name, "weight_per_unit_of_stock_uom",fetched_item_master_details[0]['weight_per_unit']);
        weight_per_unit = fetched_item_master_details[0]['weight_per_unit']
        weight_per_u = weight_per_u + weight_per_unit;
        console.log("weight_per_u",weight_per_u)
        }
        }
        var received_qty = dn_items[k]['qty'] * dn_items[k]['conversion_factor'];
        var weight_of_received_qty = received_qty * weight_per_unit;
        frappe.model.set_value(child.doctype, child.name, "weight_of_received_qty",weight_of_received_qty); 
        estimated_total_weight_of_consignment = estimated_total_weight_of_consignment + weight_of_received_qty;
        weighment =weighment + (received_qty * weight_per_unit);
    } 
        cur_frm.set_value("estimated_net_weight",weight_per_u);
        cur_frm.set_value("estimated_total_weight_of_consignment",estimated_total_weight_of_consignment);
        cur_frm.set_value("weighment",weighment);
        cur_frm.refresh_field("item");
	}  
  
  }
});
/*
frappe.ui.form.on('Gate Entry', {
before_save: function(frm, cdt, cdn) 
{
 var d = locals[cdt][cdn];
var itemss = frm.doc.item;

for (var i = 0; i < itemss.length; i++) 
{
var qty = itemss[i]['qty'];
console.log("qty1111............", qty);
if(d.supporting_document == "Purchase Order")
 {
var record_number = itemss[i]['record_number'];
var check_po = check_record_number(record_number)
console.log("po_qty222............", check_po[i]['qty']);

if(qty > check_po[i]['qty'] || check_po[i]['qty']<0 || qty <0)
{
   frappe.msgprint("Quantity is Empty in Purchase Order"); 
   console.log("qty is out of po");
   frappe.validated = false;
} }      }
}
});
*/
function check_record_number(record_number) {
var result = " ";
    frappe.call({
    method: 'bindal.bindal.doctype.gate_entry.gate_entry.check_record_repeated',
   args: {
         record_number : record_number
      },
      async: false,
      callback: function(r) {
        if (r.message) {
          console.log(typeof r.message);
          result = r.message;
          console.log("result...........................",result);
        }
      }
    });
    return result;
  }

function check_record_number_si(record_number) {
var result = " ";
    frappe.call({
    method: 'bindal.bindal.doctype.gate_entry.gate_entry.check_record_repeated_si',
   args: {
         record_number : record_number
      },
      async: false,
      callback: function(r) {
        if (r.message) {
          console.log(typeof r.message);
          result = r.message;
          console.log("result...........................",result);
        }
      }
    });
    return result;
  }

function check_record_number_de(record_number) {
var result_de = " ";
    frappe.call({
    method: 'bindal.bindal.doctype.gate_entry.gate_entry.check_record_repeated_de',
   args: {
         record_number : record_number
      },
      async: false,
      callback: function(r) {
        if (r.message) {
          console.log(typeof r.message);
          result_de = r.message;
          console.log("result_de...........................",result_de);
        }
      }
    });
    return result_de;
  }








frappe.ui.form.on('Gate Entry', {
	supplier_name : function(frm, cdt, cdn) 
	{
	var d = locals[cdt][cdn];
	var supplier_name = d.supplier_name;
	console.log("supplier_name clicked =",d.supplier_name);

   if(d.type == "Inward" && d.supporting_document == "Purchase Order")
    {
    cur_frm.refresh_field("supplier_name");
    //frm.set_df_property("supplier_name", "reqd", 1);
    console.log("entered to PO IF");    
	frm.set_query("record_number", function() {
	return {
    filters: [
                ["Purchase Order","supplier",'=',supplier_name],
                ["Purchase Order","docstatus", "=", "0"],
             ]};
			});
	}
}
	});
	
frappe.ui.form.on('Gate Entry', {
	supporting_document : function(frm, cdt, cdn) 
	{
	var d = locals[cdt][cdn];
	if(d.type == "Inward" && d.supporting_document == "Purchase Order")
	{
	 frm.set_df_property("supplier_name", "reqd", 1);   
	}
	
     if(d.type == "Outward" && d.supporting_document == "Sales Invoice" || d.type == "Outward" && d.supporting_document == "Delivery Note")
     
	    { frm.set_df_property("supplier_name", "reqd", 0);
	       cur_frm.refresh_field("supplier_name");
	     	frm.set_query("record_number", function() {
	return {
    filters: [
               
             ]};
			});   
	    }
	}
	});
		
	
	
	 /*
	
frappe.ui.form.on('Gate Entry', {
  get_items: function(frm, cdt, cdn) 
  {
    var d = locals[cdt][cdn];
    // cur_frm.clear_table("item"); 
   
    if(d.supporting_document == "Purchase Order")
	{
    var name = d.name;
    var po_record_number = d.record_number;
    
    console.log("child...........",items);
    var items = fetch_po_child_items(po_record_number);
    console.log("po",items);
    var weighment = 0;
    var weight_per_unit;
    var weight_per_u = 0;
    var estimated_total_weight_of_consignment = 0;
    for(var k = 0;k<items.length; k++)
    {
        var child = cur_frm.add_child("item");
        frappe.model.set_value(child.doctype, child.name, "child_record_name",items[k]['name']);
        frappe.model.set_value(child.doctype, child.name, "item_name",items[k]['item_name']);
       // frappe.model.set_value(child.doctype, child.name, "description",items[k]['description']);
        frappe.model.set_value(child.doctype, child.name, "item_code",items[k]['item_code']);
        frappe.model.set_value(child.doctype, child.name, "uom",items[k]['uom']);
        frappe.model.set_value(child.doctype, child.name, "record_number",items[k]['parent']);
       frappe.model.set_value(child.doctype, child.name, "qty",items[k]['qty']);  
        frappe.model.set_value(child.doctype, child.name, "pending_qty",items[k]['pending_qty']); 
        frappe.model.set_value(child.doctype, child.name, "stock_uom",items[k]['stock_uom']); 
        frappe.model.set_value(child.doctype, child.name, "weight_uom",items[k]['weight_uom']);
        frappe.model.set_value(child.doctype, child.name, "conversion_factor",items[k]['conversion_factor']); 
        frappe.model.set_value(child.doctype, child.name, "supporting_document",d.supporting_document);
        frappe.model.set_value(child.doctype, child.name, "received_qty_in_stock_uom",items[k]['qty'] * items[k]['conversion_factor']); 
        if(items[k]['item_code'])
        {
        var gate_item_name = items[k]['item_code']
        var fetched_item_master_details = get_item_weight(gate_item_name);
        console.log("fetched_item_master_details+++++++++",fetched_item_master_details)
        if(fetched_item_master_details[0])
        {
        frappe.model.set_value(child.doctype, child.name, "weight_per_unit_of_stock_uom",fetched_item_master_details[0]['weight_per_unit']);
        weight_per_unit = fetched_item_master_details[0]['weight_per_unit']
        console.log("weight_per_unit",weight_per_unit)
        weight_per_u = weight_per_u + weight_per_unit;
        console.log("weight_per_u",weight_per_u)
        }
        }
        
        var received_qty = items[k]['qty'] * items[k]['conversion_factor'];
        var weight_of_received_qty = received_qty * weight_per_unit;
        frappe.model.set_value(child.doctype, child.name, "weight_of_received_qty",weight_of_received_qty); 
        estimated_total_weight_of_consignment = estimated_total_weight_of_consignment + weight_of_received_qty;
        weighment =weighment + (received_qty * weight_per_unit);
        } 
        cur_frm.set_value("estimated_net_weight",weight_per_u);
        cur_frm.set_value("estimated_total_weight_of_consignment",estimated_total_weight_of_consignment);
        cur_frm.set_value("weighment",weighment);
        cur_frm.refresh_field("item");
	}     
    
    if(d.supporting_document == "Sales Invoice")
	{
    var si_record_number = d.record_number;
    var si_items = fetch_si_child_items(si_record_number);
    console.log("si",si_items);
 
    var weighment = 0;
    var weight_per_unit;
    var weight_per_u = 0;
    var estimated_total_weight_of_consignment = 0;
    cur_frm.clear_table("item");
    for(var k = 0;k<si_items.length; k++)
    {
        var child = cur_frm.add_child("item");
        frappe.model.set_value(child.doctype, child.name, "child_record_name",si_items[k]['name']);
        frappe.model.set_value(child.doctype, child.name, "item_name",si_items[k]['item_name']);
       // frappe.model.set_value(child.doctype, child.name, "description",si_items[k]['description']);
        frappe.model.set_value(child.doctype, child.name, "item_code",si_items[k]['item_code']);
        frappe.model.set_value(child.doctype, child.name, "uom",si_items[k]['uom']);
        frappe.model.set_value(child.doctype, child.name, "record_number",si_items[k]['parent']);
        frappe.model.set_value(child.doctype, child.name, "qty",si_items[k]['qty']);  
        //frappe.model.set_value(child.doctype, child.name, "pending_qty",si_items[k]['pending_qty']); 
        frappe.model.set_value(child.doctype, child.name, "stock_uom",si_items[k]['stock_uom']); 
        frappe.model.set_value(child.doctype, child.name, "weight_uom",si_items[k]['weight_uom']);
        frappe.model.set_value(child.doctype, child.name, "conversion_factor",si_items[k]['conversion_factor']); 
        frappe.model.set_value(child.doctype, child.name, "supporting_document",d.supporting_document);
        frappe.model.set_value(child.doctype, child.name, "received_qty_in_stock_uom",si_items[k]['qty'] * si_items[k]['conversion_factor']); 
        if(si_items[k]['item_code'])
        {
        var gate_item_name = si_items[k]['item_code']
        var fetched_item_master_details = get_item_weight(gate_item_name);
        if(fetched_item_master_details[0])
        {
        frappe.model.set_value(child.doctype, child.name, "weight_per_unit_of_stock_uom",fetched_item_master_details[0]['weight_per_unit']);
        weight_per_unit = fetched_item_master_details[0]['weight_per_unit']
        weight_per_u = weight_per_u + weight_per_unit;
        console.log("weight_per_u",weight_per_u)
        }
      }
        var received_qty = si_items[k]['qty'] * si_items[k]['conversion_factor'];
        var weight_of_received_qty = received_qty * weight_per_unit;
        frappe.model.set_value(child.doctype, child.name, "weight_of_received_qty",weight_of_received_qty); 
        estimated_total_weight_of_consignment = estimated_total_weight_of_consignment + weight_of_received_qty;
        weighment =weighment + (received_qty * weight_per_unit);
    } 
        cur_frm.set_value("estimated_net_weight",weight_per_u);
        cur_frm.set_value("estimated_total_weight_of_consignment",estimated_total_weight_of_consignment);
        cur_frm.set_value("weighment",weighment);
        cur_frm.refresh_field("item");
	}    
  
    if(d.supporting_document == "Delivery Note")
	{
	 var name = d.name;
    var dn_record_number = d.record_number;
    var dn_items = fetch_dn_child_items(dn_record_number);
    console.log("dn",dn_items);
  
    
    var weighment = 0;
    var weight_per_unit;
    var weight_per_u = 0;
    var estimated_total_weight_of_consignment = 0;
    cur_frm.clear_table("item");
    for(var k = 0;k<dn_items.length; k++)
    {
        var child = cur_frm.add_child("item");
        frappe.model.set_value(child.doctype, child.name, "child_record_name",dn_items[k]['name']);
        frappe.model.set_value(child.doctype, child.name, "item_name",dn_items[k]['item_name']);
       // frappe.model.set_value(child.doctype, child.name, "description",dn_items[k]['description']);
        frappe.model.set_value(child.doctype, child.name, "item_code",dn_items[k]['item_code']);
        frappe.model.set_value(child.doctype, child.name, "uom",dn_items[k]['uom']);
        frappe.model.set_value(child.doctype, child.name, "record_number",dn_items[k]['parent']);
        frappe.model.set_value(child.doctype, child.name, "qty",dn_items[k]['qty']);  
       // frappe.model.set_value(child.doctype, child.name, "pending_qty",dn_items[k]['pending_qty']); 
        frappe.model.set_value(child.doctype, child.name, "stock_uom",dn_items[k]['stock_uom']); 
        frappe.model.set_value(child.doctype, child.name, "weight_uom",dn_items[k]['weight_uom']);
        frappe.model.set_value(child.doctype, child.name, "conversion_factor",dn_items[k]['conversion_factor']); 
        frappe.model.set_value(child.doctype, child.name, "supporting_document",d.supporting_document);
        frappe.model.set_value(child.doctype, child.name, "received_qty_in_stock_uom",dn_items[k]['qty'] * dn_items[k]['conversion_factor']); 
        if(dn_items[k]['item_code'])
        {
        var gate_item_name = dn_items[k]['item_code']
        var fetched_item_master_details = get_item_weight(gate_item_name);
        if(fetched_item_master_details[0])
        {
        frappe.model.set_value(child.doctype, child.name, "weight_per_unit_of_stock_uom",fetched_item_master_details[0]['weight_per_unit']);
        weight_per_unit = fetched_item_master_details[0]['weight_per_unit']
        weight_per_u = weight_per_u + weight_per_unit;
        console.log("weight_per_u",weight_per_u)
        }
        }
        var received_qty = dn_items[k]['qty'] * dn_items[k]['conversion_factor'];
        var weight_of_received_qty = received_qty * weight_per_unit;
        frappe.model.set_value(child.doctype, child.name, "weight_of_received_qty",weight_of_received_qty); 
        estimated_total_weight_of_consignment = estimated_total_weight_of_consignment + weight_of_received_qty;
        weighment =weighment + (received_qty * weight_per_unit);
    } 
        cur_frm.set_value("estimated_net_weight",weight_per_u);
        cur_frm.set_value("estimated_total_weight_of_consignment",estimated_total_weight_of_consignment);
        cur_frm.set_value("weighment",weighment);
        cur_frm.refresh_field("item");
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

function fetch_si_child_items(si_record_number) {
    var invoice = " ";
    frappe.call({
    method: 'bindal.bindal.doctype.gate_entry.gate_entry.fetch_si_name',
   args: {
         name : si_record_number
      },
      async: false,
      callback: function(r) {
        if (r.message) {
          console.log(typeof r.message);
          invoice = r.message;
        }
      }
    });
    return invoice;
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
  */
  function get_item_weight(gate_item_name) {
      console.log("gate_item_name",gate_item_name)
    var p_record = " ";
    frappe.call({
    method: 'bindal.bindal.doctype.gate_entry.gate_entry.fetch_item_master_details',
   args: {
         name : gate_item_name
      },
      async: false,
      callback: function(r) {
        if (r.message) {
          console.log(typeof r.message);
          p_record = r.message;
        }
      }
    });
    return p_record;
  }

  
  
frappe.ui.form.on('Gate Entry', {
other_document_description : function(frm, cdt, cdn) {

var d = locals[cdt][cdn];
if(d.other_document_description === "Returnable Gate Pass")
{
frm.toggle_display("stock_entry__rgp_document", true);
}
    if(d.other_document_description != "Returnable Gate Pass")
{
  frm.toggle_display("stock_entry__rgp_document", false);  
}
}});
frappe.ui.form.on('Gate Entry', {
refresh : function(frm, cdt, cdn) {

var d = locals[cdt][cdn];
var stock_entry_no = d.stock_entry__rgp_document;
console.log("1",stock_entry_no);
if(stock_entry_no === undefined)
{
    console.log("hai");
}
if(d.other_document_description != "Returnable Gate Pass")
{
frm.toggle_display("supplier_address_and_gstin_details", false);
frm.toggle_display("expected_date_of_return", false);
frm.toggle_display("btpl_responsible_person", false);
frm.toggle_display("vendor_responsible_person", false);
frm.toggle_display("stock_entry__rgp_document", false);
}
else
{
frm.toggle_display("supplier_address_and_gstin_details", true);
frm.toggle_display("expected_date_of_return", true);
frm.toggle_display("btpl_responsible_person", true);
frm.toggle_display("vendor_responsible_person", true);   
frm.toggle_display("stock_entry__rgp_document", true);
}
if(d.other_document_description === "Sales Invoice")
{
frm.toggle_display("stock_entry__rgp_document", false);
}
}});

 //stock entry filter 
 frappe.ui.form.on('Gate Entry', {
   refresh: function(frm, cdt, cdn) {
   var d = locals[cdt][cdn];
   frm.set_query("stock_entry__rgp_document", function() {
           return {
               filters: [
                   ["Stock Entry","docstatus", "=", "1"],
                   ["Stock Entry","stock_entry_type", "=", "Returnable Gate Pass"],
                       ]
                   }
                   });
           }});


frappe.ui.form.on('Gate Entry', {
stock_entry__rgp_document : function(frm, cdt, cdn) {

var d = locals[cdt][cdn];
var stock_entry_no = d.stock_entry__rgp_document;
console.log("stock number",stock_entry_no);
if(stock_entry_no)
{
var stock_details = fetch_stock_entry(stock_entry_no); 
console.log("stock_details",stock_details);
   
    cur_frm.set_value("record_number",stock_details[0]['purchase_order'] || '');
    if(stock_details[0]['purchase_order'] )
    {
       d.supporting_document="Purchase Order";
    }
    frm.toggle_display("supplier_name", true);
    frm.toggle_display("supplier_bill_date", true);
    cur_frm.set_value("supplier_name",stock_details[0]['name_of_supplier'] || '');
    cur_frm.set_value("supplier_address_and_gstin_details",stock_details[0]['address_of_supplier'] || '');
    cur_frm.set_value("type",stock_details[0]['inward_or_outward'] || '');
    if(stock_details[0]['inward_or_outward'])
    {
    frm.set_df_property("type", "read_only", 1);
    }
    cur_frm.set_value("vendor_responsible_person",stock_details[0]['vendor_responsible_person'] || '');
    cur_frm.set_value("expected_date_of_return",stock_details[0]['expected_date_of_return'] || '');
    cur_frm.set_value("btpl_responsible_person",stock_details[0]['btpl_responsible_person'] || '');
} 
}});
function fetch_stock_entry(stock_entry_no)
{
var s_details = " ";
    frappe.call({
    method: 'bindal.bindal.doctype.gate_entry.gate_entry.fetch_stock_details',
   args: {
         name : stock_entry_no
      },
        async: false,
        callback: function(r) {
            if (r.message) {
                // console.log(r.qty);
                 s_details = r.message;
               
                console.log( s_details);
                console.log("readings-----------" + JSON.stringify(r.message));

            }
        }
    });
    return  s_details;
}

frappe.ui.form.on('Gate Entry', {
supporting_document: function(frm, cdt, cdn) {
var d = locals[cdt][cdn];
 console.log("entered into function",d.supporting_document);
if(d.supporting_document == "" || d.supporting_document == undefined)
{
  console.log("yes");
  cur_frm.set_value("record_number","");
  cur_frm.set_value("estimated_net_weight"," ");
  cur_frm.set_value("estimated_total_weight_of_consignment"," ");
  cur_frm.set_value("weighment"," ");
  cur_frm.set_value("type"," ");
  cur_frm.clear_table("item"); 
 
}
}
});


    frappe.ui.form.on('Gate Entry', {
      supporting_document : function(frm, cdt, cdn) 
      {
      var d = locals[cdt][cdn];
      if(d.supporting_document == "Purchase Order")
      {
         frm.toggle_display("supplier_name", true);
        frm.toggle_display("supplier_bill_no", true);
        frm.toggle_display("supplier_bill_date", true);
      }
      
      else if(d.supporting_document == "Sales Invoice" || d.supporting_document == "Delivery Note")
      {
        frm.toggle_display("supplier_name", false);
        frm.toggle_display("supplier_bill_no", false);  
        frm.toggle_display("supplier_bill_date", false);
      }
      
      }
      });
	  
	  

    frappe.ui.form.on('Gate Entry', {
    record_number: function(frm, cdt, cdn) {
    
    var d = locals[cdt][cdn];
    var record_number = d.record_number;
	console.log("record_number",record_number);
    if(d.other_document_description == "Supplier Invoice" || d.supporting_document =="Sales Invoice" || d.type != "Inward" && d.supporting_document !="Purchase Order" )
    {
     var supplier=fetch_supplier(record_number); 
      console.log("supplier",supplier);
      cur_frm.set_value("supplier_name",supplier);
    }

        }});
    function fetch_supplier(record_number) 
    {
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
    record_number: function(frm, cdt, cdn) {
    
    var d = locals[cdt][cdn];
    var record_number = d.record_number;
	console.log("record_number",record_number);
	frm.refresh_field("item");
//	cur_frm.clear_table("item");  
    if(d.other_document_description == "Supplier Invoice" || d.supporting_document =="Sales Invoice" || d.type != "Inward" && d.supporting_document !="Purchase Order" )
    {
     var supplier=fetch_supplier(record_number); 
      console.log("supplier",supplier);
      cur_frm.set_value("supplier_name",supplier);
    }
	 }});
    function fetch_supplier(record_number) 
    {
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
unladen_weight : function(frm, cdt, cdn) 
 {
   var d = locals[cdt][cdn];
   
   var net_actual_weight_of_consigmnet = d.net_actual_weight_of_consigmnet
   net_actual_weight_of_consigmnet = d.laden_weight - d.unladen_weight;
   console.log("......",net_actual_weight_of_consigmnet)
   if(d.laden_weight && d.unladen_weight)
   {
   cur_frm.set_value("net_actual_weight_of_consigmnet",net_actual_weight_of_consigmnet);
   }
   else
   {
       cur_frm.set_value("net_actual_weight_of_consigmnet"," ");  
   }
   cur_frm.refresh_field("net_actual_weight_of_consigmnet");
    }
});  
    
frappe.ui.form.on('Gate Entry', {
laden_weight : function(frm, cdt, cdn) 
 {
   var d = locals[cdt][cdn];
   
   var net_actual_weight_of_consigmnet = d.net_actual_weight_of_consigmnet
   net_actual_weight_of_consigmnet = d.laden_weight - d.unladen_weight;
   console.log("......",net_actual_weight_of_consigmnet)
   if(d.laden_weight && d.unladen_weight)
   {
   cur_frm.set_value("net_actual_weight_of_consigmnet",net_actual_weight_of_consigmnet);
    }
    else
    {
      cur_frm.set_value("net_actual_weight_of_consigmnet"," ");  
    }
     cur_frm.refresh_field("net_actual_weight_of_consigmnet");
 }
});  














frappe.ui.form.on('Gate Entry', {
	type : function(frm, cdt, cdn) 
	{
	var d = locals[cdt][cdn];
	console.log("d.type=",d.type);
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
	refresh : function(frm, cdt, cdn) 
	{
	var d = locals[cdt][cdn];
	console.log("d.type=",d.type);
	if(d.type == "Inward")
	{
	frm.set_query("supporting_document", function() {
		return {
				filters: [["DocType","name","IN",["Purchase Order","Supplier Invoice","Returnable Gate Pass"]]]
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
		frm.toggle_display("supplier_name", false); 	
		frm.toggle_display("supplier_bill_no", false);
		frm.toggle_display("supplier_bill_date", false);
		}
		else if(d.type == " ")
		{
		cur_frm.refresh();
		frm.toggle_display("supplier_name", false);
		frm.toggle_display("supplier_bill_no", false);
		frm.toggle_display("supplier_bill_date", false);
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
      //frm.toggle_display("estimated_net_weight", true); 
    }
	}
});

    
    
    
    frappe.ui.form.on('Gate Entry', {
      other_document_description : function(frm, cdt, cdn) 
      {
      var d = locals[cdt][cdn];
      if(d.other_document_description == "Supplier Invoice" || d.other_document_description == "Returnable Gate Pass" || d.type == "Inward")
      {
        frm.toggle_display("supplier_name", true);
        frm.toggle_display("supplier_bill_no", true);
        frm.toggle_display("supplier_bill_date", true);
      }
      
      else
      {
        frm.toggle_display("supplier_name", false);
        frm.toggle_display("supplier_bill_no", false);  
        frm.toggle_display("supplier_bill_date", false);
      }
      
      }
      });
      
   
 frappe.ui.form.on('Gate Entry', {
  after_save: function(frm, cdt, cdn) 
  {
    var d = locals[cdt][cdn];
    var itemss = frm.doc.item;
    var weighment = 0;
    var weight_per_unit;
    var weight_per_u = 0;
    var qty = 0;
    var estimated_total_weight_of_consignment = 0;
     for(var k = 0;k<itemss.length; k++)
        {
        if(d.supporting_document == "Sales Invoice" || d.supporting_document == "Delivery Note" )
        {
        console.log("qty99999999999",itemss[k]['qty']);
        qty = itemss[k]['qty']
        }
        else if(d.supporting_document == "Purchase Order")
        {
        qty = itemss[k]['po_qty']
        }
        if(itemss[k]['item_code'])
        {
        var gate_item_name = itemss[k]['item_code']
        var fetched_item_master_details = get_item_weight1(gate_item_name);
        console.log("fetched_item_master_details+++++++++",fetched_item_master_details)
        if(fetched_item_master_details[0])
        {
        weight_per_unit = fetched_item_master_details[0]['weight_per_unit']
        console.log("weight_per_unit",weight_per_unit)
        weight_per_u = weight_per_u + weight_per_unit;
        console.log("weight_per_u",weight_per_u)
        }
        }
        
        var received_qty = qty * itemss[k]['conversion_factor'];
        var weight_of_received_qty = received_qty * weight_per_unit;
       
        estimated_total_weight_of_consignment = estimated_total_weight_of_consignment + weight_of_received_qty;
        weighment =weighment + (received_qty * weight_per_unit);
        } 
        cur_frm.set_value("estimated_net_weight",weight_per_u);
        cur_frm.set_value("estimated_total_weight_of_consignment",estimated_total_weight_of_consignment);
        cur_frm.set_value("weighment",weighment);
        cur_frm.refresh_field("item");
  }});
  
  
   function get_item_weight1(gate_item_name) {
      console.log("gate_item_name",gate_item_name)
    var p_record = " ";
    frappe.call({
    method: 'bindal.bindal.doctype.gate_entry.gate_entry.fetch_item_master_details',
   args: {
         name : gate_item_name
      },
      async: false,
      callback: function(r) {
        if (r.message) {
          console.log(typeof r.message);
          p_record = r.message;
        }
      }
    });
    return p_record;
  }   

  frappe.ui.form.on('Gate Entry', {
    before_save: function(frm, cdt, cdn) 
    {
     var d = locals[cdt][cdn];
    var itemss = frm.doc.item;
    
    for (var i = 0; i < itemss.length; i++) 
    {
    console.log("qty1111............", itemss[i]['qty']);
    //itemss[i]['po_qty'] = itemss[i]['qty'];
    if(itemss[i]['received_qty_in_stock_uom'] > itemss[i]['pending_qty'] )
      {
       frappe.msgprint("Received Qty in Stock UOM is greater than Pending Qty"); 
       console.log("Received Qty in Stock UOM is greater than Pending Qty");
       frappe.validated = false;
    } }
    }
    });
    
    frappe.ui.form.on('Gate Entry',{ 
    get_items:function(frm, cdt, cdn) {
    var d = locals[cdt][cdn];
    //var items = frm.doc.item;
    console.log("entered ")
    if(d.supporting_document == "Purchase Order")
    {
    cur_frm.fields_dict.item.grid.toggle_display("po_qty", true);
    cur_frm.fields_dict.item.grid.toggle_display("qty", false);
    }
    if(d.supporting_document == "Sales Invoice" || d.supporting_document == "Delivery Note" )
    {
    cur_frm.fields_dict.item.grid.toggle_display("po_qty", false);
    cur_frm.fields_dict.item.grid.toggle_display("qty", true);   
    }
    cur_frm.refresh_field("item");
    }
    });
    