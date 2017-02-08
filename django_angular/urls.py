from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    # Examples:
    url(r'^$', include('myapp.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('projects.urls')),
]