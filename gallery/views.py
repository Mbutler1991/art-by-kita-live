from django.views import View
from django.http import JsonResponse
from .models import Painting
import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from .serializers import PaintingSerializer

class PaintingListView(APIView):
    def get(self, request):
        paintings = Painting.objects.all()
        serializer = PaintingSerializer(paintings, many=True)
        return Response(serializer.data)
    

class PaintingDetailView(RetrieveAPIView):
    queryset = Painting.objects.all()
    serializer_class = PaintingSerializer


def random_painting(request):
    paintings = list(Painting.objects.all())
    if paintings:
        painting = random.choice(paintings)
        return JsonResponse({"image_url": painting.image.url})
    return JsonResponse({"error": "No paintings available"}, status=404)

class RandomHeaderPaintingView(View):
    def get(self, request, *args, **kwargs):
        paintings = Painting.objects.all()
        if paintings.exists():
            painting = random.choice(paintings)
            return JsonResponse({'id': painting.id, 'title': painting.title, 'image_url': painting.image.url})
        return JsonResponse({'error': 'No paintings available'}, status=404)