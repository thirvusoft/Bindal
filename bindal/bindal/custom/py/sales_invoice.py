import frappe
def get_tax_table_pos(doc,doctype):
    po = frappe.get_doc("Purchase Order", doc)
    tax_row = {}
    total_taxable_value = 0
    total_cgst_amount = 0
    total_sgst_amount = 0
    total_igst_amount = 0
    if po.taxes_and_charges and po.total_taxes_and_charges:
        for it in po.items:
            gst_rate = it.cgst_rate + it.sgst_rate if 'In-state' in po.taxes_and_charges else it.igst_rate
            taxable_value = it.net_amount
            total_taxable_value += taxable_value

            if gst_rate in tax_row:
                tax_row[gst_rate]['taxable_value'] += taxable_value
                if 'In-state' in po.taxes_and_charges:
                    cgst_amount = (it.cgst_rate / 100) * taxable_value
                    sgst_amount = (it.sgst_rate / 100) * taxable_value
                    tax_row[gst_rate]['cgst_amount'] += cgst_amount
                    tax_row[gst_rate]['sgst_amount'] += sgst_amount
                    total_cgst_amount += cgst_amount
                    total_sgst_amount += sgst_amount
                else:
                    igst_amount = (gst_rate / 100) * taxable_value
                    tax_row[gst_rate]['igst_amount'] += igst_amount
                    total_igst_amount += igst_amount
            else:
                if 'In-state' in po.taxes_and_charges:
                    cgst_amount = (it.cgst_rate / 100) * taxable_value
                    sgst_amount = (it.sgst_rate / 100) * taxable_value
                    tax_row[gst_rate] = {
                        'taxable_value': taxable_value,
                        'cgst_rate': it.cgst_rate,
                        'cgst_amount': cgst_amount,
                        'sgst_rate': it.sgst_rate,
                        'sgst_amount': sgst_amount,
                    }
                    total_cgst_amount += cgst_amount
                    total_sgst_amount += sgst_amount
                else:
                    igst_amount = (gst_rate / 100) * taxable_value
                    tax_row[gst_rate] = {
                        'taxable_value': taxable_value,
                        'igst_rate': gst_rate,
                        'igst_amount': igst_amount
                    }
                    total_igst_amount += igst_amount

    final_table = []
    for gst_rate, values in tax_row.items():
        if po.taxes_and_charges and 'In-state' in po.taxes_and_charges:
            final_table.append([
                gst_rate,
                round(values['taxable_value'], 2),
                values['cgst_rate'],
                round(values['cgst_amount'], 2),
                values['sgst_rate'],
                round(values['sgst_amount'], 2)
            ])
        else:
            final_table.append([
                gst_rate,
                round(values['taxable_value'], 2),
                values['igst_rate'],
                # round(values['igst_amount'], 2)
            ])
    
    return {
    "tax_rows": final_table,
    "tax_category": "In-State" if po.taxes_and_charges and "In-state" in po.taxes_and_charges else "Out-State",
    "total_taxable_value": round(total_taxable_value, 2),
    "total_cgst_amount": round(total_cgst_amount, 2),
    "total_sgst_amount": round(total_sgst_amount, 2),
    "total_igst_amount": round(total_igst_amount, 2)
}

