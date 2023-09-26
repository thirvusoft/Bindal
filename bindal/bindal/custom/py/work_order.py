import frappe
import json
from frappe.model.naming import parse_naming_series
from io import BytesIO
from barcode import Code128
from barcode.writer import ImageWriter
import base64
import pyqrcode

from pyqrcode import create as qr_create

@frappe.whitelist()
def get_barcode(doc):
    doc = frappe.get_doc("Work Order",doc)
    item_doc = frappe.get_doc("Item",doc.production_item)
    starting_count = frappe.get_value("Item",doc.production_item,'last_updated_series')
    if doc.custom_barcode_with_bundle:
        qty = doc.custom_total_bundle
    else:
        qty = doc.qty
    for count in range(starting_count+1,int(qty)+starting_count+1,1):
        barcode = frappe.new_doc('Barcode Label')
        if doc.custom_barcode_with_bundle:
            barcode.barcode = doc.production_item +'-'+ str(int(doc.name.split("-")[-1]))+'-'+'{:06d}'.format(count)+' ('+str(doc.custom_pcs_per_bundle)+""+doc.stock_uom+')'
        else:
            barcode.barcode = doc.production_item +'-'+ str(int(doc.name.split("-")[-1]))+'-'+'{:06d}'.format(count)
        barcode.reference_doctype = "Work Order"
        barcode.reference_document = doc.name
        barcode.item = doc.production_item
        barcode.save()
        
        if count == int(doc.qty)+starting_count:
            frappe.set_value("Item",doc.production_item,'last_updated_series',count)

    return 1


@frappe.whitelist()
def update_barcode(doc,data):
    data = json.loads(data)
    frappe.db.set_value("Work Order",doc,'barcode_type',data.get('type'))
    frappe.db.set_value("Work Order",doc,'barcode',data.get('barcode'))

    
def on_submit(doc,event):
    # frappe.enqueue(get_barcode,queue="long",doc.name)
    # frappe.enqueue(get_barcode, queue="long", doc=doc.name)
    get_barcode(doc.name)

@frappe.whitelist()
def barcode(barcode):
    return get_ewaybill_barcode(barcode)

def get_ewaybill_barcode(ewaybill):
    stream = BytesIO()
    Code128(str(ewaybill), writer=ImageWriter()).write(
        stream,
        {
            "module_width": 0.4,
            "text_distance": 1,
            "font_size": 20,
        },
    )
    barcode_base64 = base64.b64encode(stream.getbuffer()).decode()
    stream.close()

    return barcode_base64

@frappe.whitelist()
def get_qr_code(data, scale):

    return pyqrcode.create(data).png_as_base64_str(scale = scale, quiet_zone = 1)

# @frappe.whitelist()
# def get_barcode(doc):
#     series = frappe.db.get_single_value("Stock Settings","finished_good_series")
#     doc = frappe.get_doc("Work Order",doc)
#     for count in range(0,int(doc.qty),1):
#         print(count)
#         # if series:
#         html_code = doc.production_item + str(count)
#         item_doc =  frappe.get_doc("Item",doc.production_item)
#         item_doc.append("barcodes",{'barcode':html_code})
#         # item_doc.save()
#         doc.append('barcode',{'barcode':html_code})
#         # frappe.set_value("Item",doc.production_item,'last_updated_series',doc.current_series)
#             # return html_code

#             # return doc.barcode
#         # else:
#         #     frappe.throw("Series not found for Finished Goods in Stock Settings")
#     return 1