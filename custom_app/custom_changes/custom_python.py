import frappe
from frappe import _

@frappe.whitelist()
def get_last_purchase_rates(item_code):
    rates = frappe.db.sql("""
        SELECT pii.base_rate, pi.posting_date
        FROM `tabPurchase Invoice Item` pii
        LEFT JOIN `tabPurchase Invoice` pi ON pi.name = pii.parent
        WHERE pii.item_code = %s
        ORDER BY pi.posting_date DESC
        LIMIT 3
    """, (item_code,), as_dict=True)
    
    return rates
