import os
# Configure settings for project
# Need to run this before calling models from application!
os.environ.setdefault('DJANGO_SETTINGS_MODULE','project4.settings')

import django
# Import settings
django.setup()

# from django.contrib.auth.models import User
from network.models import User
from faker import Faker
fake = Faker()

def populate(count):
    for i in range(count):
        name = fake.unique.name()
        first_name = name.split(' ')[0]
        last_name = ' '.join(name.split(' ')[-1:])
        # Username is set to the First Name
        username = first_name.lower()
        # Password defaults to the user name
        user = User.objects.create_user(username, password=username)
        user.first_name = first_name
        user.last_name = last_name
        # user.is_superuser = False
        # user.is_staff = False
        user.email = username + "@example.com"
        user.save()

        print (f'User ID: {user.id}')

if __name__ == '__main__':
    print("Populating User...Please Wait")
    populate(1)
    print('Populating Complete')