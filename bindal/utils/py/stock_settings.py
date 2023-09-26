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
