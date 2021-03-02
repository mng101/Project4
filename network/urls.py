
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    path("<int:pk>/", views.ResumeDetailView.as_view(), name="resume"),

    # API Routes added to the distribution code
    #
    path("newpost", views.newpost, name="newpost"),
    path("follower/<int:user_id>", views.follower, name="follower")
    #
    # The "allpost" view is combined into the index view
    # TODO - Cleanup before submission
    # path("allpost", views.allpost, name="allposts"),
    # path("followpost/<str:follow>", views.followpost, name="followpost"),
]
