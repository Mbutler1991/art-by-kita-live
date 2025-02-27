import stripe
import json
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from .models import Order, OrderItem
from gallery.models import Painting

stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def create_order(request):
    if request.method == "POST":
        data = json.loads(request.body)
        painting_id = data.get("painting_id")
        painting = get_object_or_404(Painting, id=painting_id)

        order = Order.objects.create(
            full_name=data["full_name"],
            email=data["email"],
            phone_number=data["phone_number"],
            address=data["address"],
            total_amount=painting.price
        )

        OrderItem.objects.create(order=order, painting=painting, price=painting.price)

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "eur",
                    "product_data": {
                        "name": painting.title,
                        "images": [painting.image.url],
                    },
                    "unit_amount": int(painting.price * 100),
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url=f"http://localhost:5173/?payment_status=success&order_id={order.id}",
            cancel_url="http://localhost:5173/?payment_status=cancel",
        )

        # Store Checkout Session ID in the order
        order.stripe_checkout_id = checkout_session.id
        order.save()

        return JsonResponse({"checkout_url": checkout_session.url})

    return JsonResponse({"error": "Invalid request"}, status=400)
