import frappe
import json

@frappe.whitelist()
def get_child_account(doc):
    doc = json.loads(doc)
    child_budget_accounts = []

    for account in doc.get('custom_group_account', []):
        if account.get('group_account') is None:
            frappe.throw('Give Value for Group Account')

        if account.get('budget_amount') is None:
            frappe.throw('Give Value for Budget')

        budget_amount = account['budget_amount']
        group_account = account['group_account']

        child_accounts = frappe.get_list('Account', filters={'parent_account': group_account}, fields=['name'])

        if child_accounts:
            num_children = len(child_accounts)
            divided_budget = budget_amount / num_children if num_children > 0 else 0

            for child in child_accounts:
                child_budget_accounts.append({'account': child['name'], 'allocated_budget': divided_budget})

        else:
            frappe.msgprint(f'No child accounts found for {group_account}')

    return child_budget_accounts
