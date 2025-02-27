from django.http import HttpResponse

def robots_txt(request):
    content = """User-agent: *
Disallow: /admin/
Allow: /
Sitemap: https://artbykita.com/sitemap.xml
"""
    return HttpResponse(content, content_type="text/plain")
