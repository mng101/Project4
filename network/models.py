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
    #
    # TODO - Are the following 2 fields required
    #
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
    #


class Resume(models.Model):
    user = models.OneToOneField("User", on_delete=models.CASCADE,
                                primary_key=True, related_name='details')
    company = models.CharField(max_length=64)
    job = models.CharField(max_length=64)
    website = models.URLField
    narative = models.TextField(max_length=1024)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.company}"


class Follow(models.Model):
        user = models.ForeignKey("User", on_delete=models.CASCADE, related_name='follows')
        follow = models.ForeignKey("User", on_delete=models.CASCADE)

        def __str__(self):
            return f"{self.user.first_name} follows {self.follow.first_name}"


# TODO - class Vote
