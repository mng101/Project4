import os
# Configure settings for project
# Need to run this before calling models from application!
os.environ.setdefault('DJANGO_SETTINGS_MODULE','project4.settings')

import django
from django.utils import timezone
# Import settings
django.setup()

# from django.contrib.auth.models import User
from network.models import User, Post
from faker import Faker
import random
fake = Faker()

# Get the list of usernames from the User object
names = User.objects.values_list('username', flat=True).exclude(username='mahesh')

def get_user():
    user = User.objects.get(username=random.choice(names))
    return user

def populate(count):
    for entry in range(count):
        # get user for the post
        u = get_user()
        # fake_timestamp=fake.date_time()
        ts1 = fake.date_time()
        tz = timezone.get_current_timezone()
        ts2 = timezone.make_aware(ts1, tz)
        # fake_ts=fake.date_time()
        fake_post=fake.paragraph(nb_sentences=5)

        # Create fake post
        post = Post.objects.get_or_create(user=u,
                                          timestamp=ts2,
                                          body=fake_post)[0]

if __name__ == '__main__':
    print("Populating the databases...Please Wait")
    populate(180)
    print('Populating Complete')