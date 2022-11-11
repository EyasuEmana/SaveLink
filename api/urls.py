
from django.urls import path, include,re_path

urlpatterns = [
    path('account/',include('api.account.urls')),
    path('service/',include('api.service.urls')),
]