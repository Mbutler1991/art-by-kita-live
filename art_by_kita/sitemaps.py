from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from gallery.models import Painting

class StaticViewSitemap(Sitemap):
    priority = 0.8
    changefreq = "weekly"

    def items(self):
        return ["home:home", "contact:contact", "gallery:painting-list"]  # Add namespace prefixes

    def location(self, item):
        return reverse(item)  # Ensure these match your named URLs

class PaintingSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.9

    def items(self):
        return Painting.objects.all()
    
    def location(self, obj):
        return reverse("gallery:painting-detail", args=[obj.pk])

    def lastmod(self, obj):
        return obj.updated_at  # Ensure Painting model has an `updated_at` field

sitemaps = {
    "static": StaticViewSitemap,
    "paintings": PaintingSitemap,
}
