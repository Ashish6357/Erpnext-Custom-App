// Copyright (c) 2025, Ashish and contributors
// For license information, please see license.txt

frappe.ui.form.on('Service Booking', {
	after_workflow_action: function(frm) {
		if (frm.doc.workflow_state == 'Completed') {
            // Call the backend Python function to send the email
            frappe.call({
                method: 'custom_app.custom_changes.send_completion_email',
                args: {
                    service_booking_id: frm.doc.name
                },
                callback: function(response) {
                    if (response.message) {
                        frappe.msgprint("Email has been sent to the customer.");
                    } else {
                        frappe.msgprint("Failed to send the email.");
                    }
                }
            });
        }

	}
});
