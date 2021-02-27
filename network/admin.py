from django.contrib import admin

# Register your models here.

from network.models import User, Post, Resume

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Resume)
