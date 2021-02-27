import os
# Configure settings for project
# Need to run this before calling models from application!
import time

os.environ.setdefault('DJANGO_SETTINGS_MODULE','project4.settings')

import django
from django.utils import timezone
# Import settings
django.setup()

# from django.contrib.auth.models import User
from network.models import User, Post, Resume
from faker import Faker
import random
fake = Faker()
Faker.seed(0)

# Get the list of usernames from the User object
names = User.objects.values_list('username', flat=True).exclude(username='mahesh')

# def get_user():
#     user = User.objects.get(username=name)
#     return user

def populate():
    for name in names:
        # get user for the post
        profile=fake.profile()

        u = User.objects.get(username=name)
        c = profile['company']
        j = profile['job']
        w = profile['website'][0]
        # bd = str(fake.date_between(start_date='-70y',end_date='-18y'))
        b = fake.paragraph(nb_sentences=20)

        print (f'{c} {j}')
        print (f'{w}')
        # print (f'{bd}')
        print (f'{b}')

        time.sleep(5)

        # Create fake Resume
        r = Resume.objects.get_or_create(user=u)[0]
        r.company=c
        r.job=j
        r.website=w
        r.narative=b
        r.save()


if __name__ == '__main__':
    print("Populating the databases...Please Wait")
    populate()
    print('Populating Complete')