from rest_framework import serializers
from django.conf import settings
from .models import Painting

class PaintingSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            url = obj.image.url
            if "image/upload/" not in url:
                return url.replace("res.cloudinary.com/", "res.cloudinary.com/image/upload/")
            return url
        return None

    class Meta:
        model = Painting
        fields = ['id', 'image', 'title', 'description', 'dimensions', 'price']





