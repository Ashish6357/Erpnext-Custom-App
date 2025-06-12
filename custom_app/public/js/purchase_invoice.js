frappe.ui.form.on('Purchase Invoice', {
	refresh(frm) {
		// your code here
	}
})

frappe.ui.form.on('Purchase Invoice Item', {
    item_code: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        if (!row.item_code) return;

        // Optional: Avoid repeat triggering
        if (row.__rates_shown) return;

        frappe.call({
            method: "custom_app.custom_changes.custom_python.get_last_purchase_rates",
            args: {
                item_code: row.item_code
            },
            callback: function(r) {
                if (r.message && Array.isArray(r.message) && r.message.length > 0) {
                    const rates = r.message;

                    // Avoid duplicated rates
                    let uniqueDates = new Set();
                    let html = `<div style="padding: 8px;"><strong>Last 3 Purchase Rates:</strong><ul style="margin: 4px;">`;

                    const highest = Math.max(...rates.map(r => r.base_rate));

                    rates.forEach(rate => {
                        let key = `${rate.base_rate}-${rate.posting_date}`;
                        if (uniqueDates.has(key)) return; // skip duplicates
                        uniqueDates.add(key);

                        const color = rate.base_rate === highest ? 'red' : 'inherit';
                        html += `<li><span style="color:${color}; font-weight: bold;">₹${rate.base_rate}</span> (on ${frappe.datetime.str_to_user(rate.posting_date)})</li>`;
                    });

                    html += `</ul></div>`;

                    frappe.msgprint({
                        title: __('Recent Purchase Rates'),
                        message: html,
                        indicator: 'blue'
                    });

                    frappe.model.set_value(cdt, cdn, '__rates_shown', true);
                }
            }
        });
    }
});
