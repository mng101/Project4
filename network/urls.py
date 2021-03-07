
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    path("<int:pk>/", views.ResumeDetailView.as_view(), name="resume"),
    path("following_posts/<int:pk>", views.FollowingPostListView.as_view(), name="following_posts"),

    # API Routes added to the distribution code
    #
    path("newpost", views.newpost, name="newpost"),
    path("is_follower/<int:pk>", views.is_follower, name="follower"),
    path("follower_count/<int:pk>", views.follower_count, name="follower_count"),
    path("toggle_follow/<int:pk>", views.toggle_follow, name="toggle_follow"),
    #
]
