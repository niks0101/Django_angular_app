from django.shortcuts import render
from django.conf import settings

# Create your views here.
from django.shortcuts import render
def index(req):
    return render(req, 'main.html', {'STATIC_URL': settings.STATIC_URL})
