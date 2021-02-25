
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes added to the distribution code
    #
    path("newpost", views.newpost, name="newpost"),
    #
    # The "allpost" view is combined into the index view
    # TODO - Cleanup before submission
    # path("allpost", views.allpost, name="allposts"),
    # path("followpost/<str:follow>", views.followpost, name="followpost"),
]
