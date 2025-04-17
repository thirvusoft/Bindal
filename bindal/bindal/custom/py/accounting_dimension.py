import frappe

def set_accounting_dimension(doc, method):
    for row in doc.items:
        if doc.branch:
            row.branch = doc.branch
        if doc.cost_center:
            row.cost_center = doc.cost_center

