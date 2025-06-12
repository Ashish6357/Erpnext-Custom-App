frappe.ui.form.on('Sales Invoice', {
    onload: function(frm) {
        cur_frm.set_query('customer', () => {
            return {
                filters: {
                    customer_group: 'Dieture Subscribers'
                }
            };
        });
    }
});