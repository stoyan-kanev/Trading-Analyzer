from django.urls import path, include

from users.views import RegisterViewAPI, LoginViewAPI, MeView, RefreshView, LogoutAPI

urlpatterns = [
    path("register/", RegisterViewAPI.as_view() , name="register"),
    path("login/", LoginViewAPI.as_view(), name="login"),
    path('refresh/', RefreshView.as_view(), name='refresh'),

    path('logout/', LogoutAPI .as_view(), name='logout'),
    path('me/', MeView.as_view(), name='me'),

]
