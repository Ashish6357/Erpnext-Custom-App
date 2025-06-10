import frappe
from frappe.core.doctype.communication.email import send_email

@frappe.whitelist()
def send_completion_email(service_booking_id):
    # Fetch the service booking document
    service_booking = frappe.get_doc('Service Booking', service_booking_id)
    
    # Get customer email from the service booking document
    customer_email = service_booking.customer_email
    customer_name = service_booking.customer_name

    # Compose the subject and message
    subject = f"Service Booking {service_booking.name} Completed"
    message = f"Dear {customer_name},\n\nYour service booking with ID {service_booking.name} has been successfully completed.\n\nBest regards,\nYour Company Name"
    
    # Send the email
    send_email(
        recipients=customer_email,
        subject=subject,
        message=message
    )
    return {"status": "success"}