from django.urls import path
from .views import get_csrf_token, contact_view, get_messages

app_name = 'contact'

urlpatterns = [
    path("api/csrf/", get_csrf_token, name="csrf-token"),
    path("api/contact/", contact_view, name="contact"),
    path("api/messages/", get_messages, name="get-messages"),
]
