from django.urls import include, path
from .views import *
urlpatterns = [
    # Other URL patterns...
    path('recognize/', detectface, name='recognize'),
    path('chatBot/', chat, name="Chat")
]