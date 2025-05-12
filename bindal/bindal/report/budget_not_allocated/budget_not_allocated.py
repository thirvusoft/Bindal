# Copyright (c) 2025, jyoti and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import getdate
import datetime

def execute(filters=None):
    if not filters:
        filters = {}  # Ensure filters is not None

    columns = get_columns(filters)  # Make sure filters are passed here
    data = get_data(filters)  # Similarly pass filters to the function that retrieves the data

    return columns, data, None


def get_columns(filters):
    return [
        {
            "label": "Account",
            "fieldname": "account",
            "fieldtype": "Link",
            "options": "Account",
            "width": 200
        },
        {
            "label": "Cost Center",
            "fieldname": "cost_center",
            "fieldtype": "Link",
            "options": "Cost Center",
            "width": 150
        },
        {
            "label": "Allocated Budget",
            "fieldname": "budget_amount",
            "fieldtype": "Currency",
            "width": 150
        },
        {
            "label": "Actual",
            "fieldname": "actual_amount",
            "fieldtype": "Currency",
            "width": 150
        },
        {
            "label": "Variance",
            "fieldname": "variance",
            "fieldtype": "Currency",
            "width": 150
        }
    ]


def get_data(filters=None):

    group_accounts = frappe.get_all(
        "Account",
        filters={"is_group": 1, "disabled": 0},
        fields=["name", "account_name", "company", "parent_account"]
    )

    account_names = [acc.name for acc in group_accounts]

    budgets = frappe.get_all(
        "Budget",
        filters={"cost_center": filters['costcenter']},
        pluck="name"
    )

    budget_accounts = frappe.get_all(
        "Budget Account",
        filters={"account": ["in", account_names], "docstatus": 1, 'parent':['in', budgets]},
        fields=["account", "budget_amount"]
    )

    budget_dict = {b["account"]: b["budget_amount"] for b in budget_accounts}

    cost_centers = frappe.get_all(
        "Cost Center",
        filters={"company": filters["company"], 'name': filters['costcenter']},
        fields=["name"]
    )
    cost_center_names = [cc["name"] for cc in cost_centers]

    account_data = []
    for acc in group_accounts:
        if acc.name in budget_dict:
            # Calculate Actual for each account and cost center
            for cost_center in cost_center_names:
                actual_amount = get_actual_amount(acc.name, cost_center, filters["from_fiscal_year"], filters["from_date"],filters["to_date"], filters["company"])
                variance = budget_dict[acc.name] - actual_amount

                # Append the data for the account and cost center
                account_data.append({
                    "account": acc.name,
                    "account_name": acc.account_name,
                    "company": acc.company,
                    "parent_account": acc.parent_account,
                    "cost_center": cost_center,
                    "budget_amount": budget_dict[acc.name],
                    "actual_amount": actual_amount,
                    "variance": variance
                })
        else:
            # If there's no budget for this account, set budget to 0 and calculate actual and variance
            for cost_center in cost_center_names:
                actual_amount = get_actual_amount(acc.name, cost_center, filters["from_fiscal_year"], filters["from_date"],filters["to_date"], filters["company"])
                account_data.append({
                    "account": acc.name,
                    "account_name": acc.account_name,
                    "company": acc.company,
                    "parent_account": acc.parent_account,
                    "cost_center": cost_center,
                    "budget_amount": 0.0,
                    "actual_amount": actual_amount,
                    "variance": -actual_amount
                })

    return account_data

def get_actual_amount(account, cost_center, from_fiscal_year, from_date, to_date, company):
    child_accounts = get_child_accounts(account)

    fiscal_year = from_fiscal_year
    # from_date = get_fiscal_year_start_date(from_fiscal_year)
    # to_date = get_fiscal_year_end_date(to_fiscal_year)

    actual_debit = frappe.db.sql("""
        SELECT SUM(debit) FROM `tabGL Entry`
        WHERE account IN %(accounts)s
        AND cost_center = %(cost_center)s
        AND company = %(company)s
        AND posting_date BETWEEN %(from_date)s AND %(to_date)s
        AND is_cancelled = 0
        AND fiscal_year = %(fiscal_year)s
    """, {
        "accounts": tuple(child_accounts),
        "cost_center": cost_center,
        "company": company,
        "from_date": from_date,
        "to_date": to_date,
        "fiscal_year": fiscal_year
    })[0][0] or 0.0

    actual_credit = frappe.db.sql("""
        SELECT SUM(credit) FROM `tabGL Entry`
        WHERE account IN %(accounts)s
        AND cost_center = %(cost_center)s
        AND company = %(company)s
        AND posting_date BETWEEN %(from_date)s AND %(to_date)s
        AND is_cancelled = 0
        AND fiscal_year = %(fiscal_year)s
    """, {
        "accounts": tuple(child_accounts),
        "cost_center": cost_center,
        "company": company,
        "from_date": from_date,
        "to_date": to_date,
        "fiscal_year": fiscal_year
    })[0][0] or 0.0

    return actual_debit - actual_credit


def get_fiscal_year_start_date(fiscal_year):
    """
    Returns the start date of the given fiscal year.
    """
    year_start = fiscal_year.split("-")[0]
    return getdate(f"{year_start}-01-01")

def get_fiscal_year_end_date(fiscal_year):
    """
    Returns the end date of the given fiscal year.
    """
    year_end = fiscal_year.split("-")[1]
    return getdate(f"{year_end}-12-31")

def get_child_accounts(account):
    accounts = [account]
    child_accounts = frappe.get_all("Account", filters={"parent_account": account}, pluck="name")
    for child in child_accounts:
        accounts.extend(get_child_accounts(child))
    return accounts
