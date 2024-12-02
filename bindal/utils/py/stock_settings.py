import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields
from frappe.custom.doctype.property_setter.property_setter import make_property_setter
def stock_customization():
    stock_custom_field()

    
def stock_custom_field():
    stock_custom_fields = {
        "Stock Settings": [
            dict(
                fieldname="raw_material_series",
                fieldtype="Data",
                label="Barcode Series - Raw Material",
                insert_after="item_naming_by",
                translatable=0,
                description = "Example :\n ITEM-.{item.item_code}.-.{current_series}. -> ITEM-FG-001-1",
                hidden=1
            ),
             dict(
                fieldname="finished_good_series",
                fieldtype="Data",
                label="Barcode Series - Finished Goods",
                insert_after="raw_material_series",
                translatable=0,
                description = "Example :\n ITEM-.{production_item}.-.{current_series}. -> ITEM-FG-001-1",
                hidden=1
            )
            
            ]}
    create_custom_fields(stock_custom_fields)
    create_agt_item()

def create_agt_item():
    if not frappe.db.exists('Item Group','Expenses'):
        expenses_group = frappe.new_doc('Item Group')
        expenses_group.item_group_name = 'Expenses'
        expenses_group.flags.ignore_permissions = True
        expenses_group.insert()
        
        print('Creating Expense Item Group ...')

    if not frappe.db.exists('Item','AGT Payable'):
        agt_item = frappe.new_doc('Item')
        agt_item.item_code = 'AGT Payable'
        agt_item.item_name = 'AGT Payable'
        agt_item.item_group = 'Expenses'
        agt_item.is_stock_item = 0
        agt_item.stock_uom = 'Nos'
        agt_item.include_item_in_manufacturing = 0
        agt_item.flags.ignore_permissions = True
        agt_item.flags.ignore_validate = True
        agt_item.insert()

        print('Creating AGT Payable Item ...')
