from django.urls import path
from .views import *

app_name = 'mail'
urlpatterns = [
    path('', index_view, name='index')
]