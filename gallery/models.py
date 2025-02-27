from django.db import models
from django.urls import reverse
from cloudinary.models import CloudinaryField
from django.core.validators import MinValueValidator


class Painting(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    dimensions = models.CharField(max_length=50)
    materials = models.CharField(max_length=150)
    image = CloudinaryField('image', folder='paintings')
    price = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('gallery:painting_detail', args=[str(self.id)])
