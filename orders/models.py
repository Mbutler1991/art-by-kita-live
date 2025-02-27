from django.db import models
from django.conf import settings
from gallery.models import Painting

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    stripe_checkout_id = models.CharField(max_length=255, blank=True, null=True)  # Store Checkout Session ID
    paid = models.BooleanField(default=False)  # Manually mark as paid

    # Shipping Information
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    address = models.TextField()

    def __str__(self):
        return f'Order {self.id} - {"Paid" if self.paid else "Pending"}'


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    painting = models.ForeignKey(Painting, related_name='order_items', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.painting.title} - {self.order.id}'