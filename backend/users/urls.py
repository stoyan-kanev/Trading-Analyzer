from django.urls import path, include

from users.views import RegisterViewAPI


urlpatterns = [
    path("register/", RegisterViewAPI.as_view() , name="register"),
]
