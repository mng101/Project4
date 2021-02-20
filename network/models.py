from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Post(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name='posts')
    timestamp = models.DateTimeField(auto_now=True)
    body = models.TextField(blank=False)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)

    # def __str__(self):
    #     return f"{self.user} - {self.timestamp} - {self.body}"

    def serialize(self):
        return {
            "user": self.user.username,
            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p %Z"),
            "body": self.body,
            #
            # TODO - add likes and dislikes to serialize
            #
        }
