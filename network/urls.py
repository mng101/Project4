
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes
    path("newpost", views.newpost, name="newpost"),
    path("allposts", views.allposts, name="allposts"),
    # path("followpost/<str:follow>", views.followpost, name="followpost"),
]
