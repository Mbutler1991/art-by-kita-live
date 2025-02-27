from django.contrib import admin
from django.urls import path, include
from django.contrib.sitemaps.views import sitemap
from art_by_kita.sitemaps import sitemaps
from django.views.generic import TemplateView
from . import views
from .views import robots_txt
from django.contrib.sitemaps.views import sitemap
from art_by_kita.sitemaps import sitemaps

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", TemplateView.as_view(template_name="index.html"), name="home"),
    path('contact/', include('contact.urls')),
    path('gallery/', include('gallery.urls')),
    path('orders/', include('orders.urls')),
    path("robots.txt", robots_txt, name="robots_txt"),
    path("sitemap.xml", sitemap, {"sitemaps": sitemaps}, name="sitemap"),
]
