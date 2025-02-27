from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_POST, require_GET
import json
from .models import Contact

@ensure_csrf_cookie
def get_csrf_token(request):
    """
    View to return CSRF token as JSON and ensure the cookie is set.
    """
    csrf_token = get_token(request)
    return JsonResponse({"csrfToken": csrf_token})


@csrf_exempt  # Only use this if necessary (e.g., for testing without CSRF)
@require_POST
def contact_view(request):
    """
    Handle contact form submissions from the frontend.
    Saves messages to the database.
    """
    try:
        data = json.loads(request.body)
        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        if not name or not email or not message:
            return JsonResponse({"success": False, "error": "All fields are required."}, status=400)

        # Save message to the database
        new_message = Contact.objects.create(name=name, email=email, message=message)

        return JsonResponse({"success": True, "message": "Message received!", "id": new_message.id})
    
    except json.JSONDecodeError:
        return JsonResponse({"success": False, "error": "Invalid JSON format."}, status=400)


@require_GET
def get_messages(request):
    """
    Get all messages stored in the database.
    """
    messages = Contact.objects.all().order_by("-created_at")  # Newest first
    messages_list = [
        {"id": msg.id, "name": msg.name, "email": msg.email, "message": msg.message, "created_at": msg.created_at}
        for msg in messages
    ]
    return JsonResponse({"messages": messages_list})


