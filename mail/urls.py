from django.urls import path
from .views import *

app_name = 'mail'
urlpatterns = [
    path('', index_view, name='index'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('register/', register_view, name='register'),
    path('compose/', compose_view, name='compose'),
    path('<str:mailbox>/', mailbox, name='mailbox'),
]