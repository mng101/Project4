from django.db.models import Count, Case, When, BooleanField, Value
from network.models import User, Post, Follow, Vote

def enrich (request, p):
    # Enrich the query set with the Vote count for each post in the set
    all_posts = p.annotate(num_votes=Count("vote"))

    # If the User is authenticated, identify the posts the user has voted for (like'd)
    # If the user is not authenticated, the template will ignore this data element

    if request.user.is_authenticated:
        u1 = request.user
        # Find the posts the user has voted for
        v1 = Vote.objects.filter(user=u1).values_list('like')
        # For the posts voted for, and a boolean field "has_my_vote"=True, else False
        all_posts = all_posts.annotate(has_my_vote=Case(
            When(id__in=v1), then=Value(True), default=Value(False), output_field=BooleanField()
        ))

    return (all_posts)
