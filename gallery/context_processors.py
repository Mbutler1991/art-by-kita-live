from .models import Painting
import random

def random_navbar_painting(request):
    paintings = list(Painting.objects.all())
    navbar_painting = random.choice(paintings) if paintings else None
    return {'navbar_painting': navbar_painting}