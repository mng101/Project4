from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    pass

class Post(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name='posts')
    #
    # The timestamp is automatically set when a new Post is created, and must not be
    # updated when a Post itself is updated, or when users "like" and "unlike" a Post
    #
    # timestamp = models.DateTimeField(auto_now_add=True)
    timestamp = models.DateTimeField(default=timezone.now)
    body = models.TextField(blank=False)
    likes = models.IntegerField(default=0)
    unlikes = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user} - {self.timestamp} - {self.body}"

    # Originally started with the serialize function. But this is no longer required
    # since we are using the paginator class in Django to implement pagination on the
    # back end
    # TODO - Delete before final submission
    #
    # def serialize(self):
    #     return {
    #         "user": self.user.username,
    #         "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p %Z"),
    #         "body": self.body,
    # TODO - add likes and Unlikes to serialize
    #         #
    #           }

    # TODO - class UserProfile

    # TODO - class Follower

    # TODO - class Vote
