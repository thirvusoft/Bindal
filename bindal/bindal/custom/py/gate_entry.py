import frappe
import json
from frappe.model.naming import parse_naming_series
from io import BytesIO
# from barcode import Code128
# from barcode.writer import ImageWriter
import base64


@frappe.whitelist()
def get_items(doctype, txt, searchfield, start, page_len, filters, as_dict=False):    
    return frappe.db.sql(f"""select `tabPO Item`.item_code,`tabPO Item`.item_name from `tabPO Item` where `tabPO Item`.parent = '{filters.get('name')}' and (`tabPO Item`.item_code like '%{txt}%' or `tabPO Item`.item_name like '%{txt}%' )""")


@frappe.whitelist()
def get_barcode(doc):
    doc = frappe.get_doc("Gate Entry",doc)

    for it in doc.item:
        item_doc = frappe.get_doc("Item",it.item_code)
        starting_count = frappe.get_value("Item",it.item_code,'last_updated_series')
        if it.custom_barcode_with_bundle:
            qty = it.custom_total_bundle
        else:
            qty = it.received_qty
        for count in range(starting_count+1,int(qty)+starting_count+1,1):
            barcode = frappe.new_doc('Barcode Label')
            if "U1" in doc.naming_series.replace("-",''):
                unit =  "U1"
            elif "U2" in doc.naming_series.replace("-",''):
                unit = "U2"
            elif "U3" in doc.naming_series.replace("-",''):
                unit = "U3"
            else:
                unit = "WH"
            if it.custom_barcode_with_bundle:
                barcode.barcode = it.item_code +'-'+unit+'-'+ str((doc.name.split("-")[-1]))+'-'+'{:03d}'.format(count) + '-'+str(round(it.custom_pcs_per_bundle))+"-"+it.uom
            else:
                barcode.barcode = it.item_code +'-'+unit+'-'+ str((doc.name.split("-")[-1]))+'-'+'{:03d}'.format(count)

            barcode.reference_doctype = "Gate Entry"
            barcode.reference_document = doc.name
            barcode.item = it.item_code
            barcode.save()
            
            if count == int(qty)+starting_count:
                frappe.set_value("Item",it.item_code,'last_updated_series',count)

    return 1

def on_submit(doc,event):
    get_barcode(doc.name)

@frappe.whitelist()
def update_barcode(doc,data):
    data = json.loads(data)
    frappe.db.set_value("Gate Entry",doc,'barcode_type',data.get('type'))
    frappe.db.set_value("Gate Entry",doc,'barcode',data.get('barcode'))
    frappe.db.set_value("Gate Entry",doc,'barcode_item',data.get('item'))

    # series = frappe.db.get_single_value("Stock Settings","raw_material_series")
    # doc = frappe.get_doc("Gate Entry",doc)

    # for it in doc.item:
    #     if series and not it.barcode:
    #         import re

    #         # Define a function to replace placeholders with their values
    #         def replace(match):
    #             placeholder = match.group(0)  # Get the matched placeholder including curly braces
    #             key = placeholder[2:-2]       # Remove curly braces to get the key (e.g., item.item_code)
    #             # Look up the value in the dictionary, or use the placeholder itself if not found
    #             return it.get(key.replace('item.',''))

    #         # Define a regular expression pattern to match text within curly braces
    #         pattern = r'\.{item.*?\}.'

    #         # Replace all occurrences of the pattern with the values from the dictionary
    #         output_string = re.sub(pattern, replace, series)

    #         html_code = parse_naming_series(output_string,doc=doc)
    #         item_doc =  frappe.get_doc("Item",it.item_code)
    #         item_doc.append("barcodes",{'barcode':html_code})
    #         item_doc.save()
    #         frappe.set_value("PO Item",it.name,'barcode',html_code)

    #         frappe.set_value("Item",it.item_code,'last_updated_series',it.current_series)
            
    #     elif series and it.barcode:
    #         pass
    #     else:
    #         frappe.throw("Series not found for Finished Goods in Stock Settings")
    # return 1