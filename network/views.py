import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .models import User, Post, Resume, Follow, Vote
from django.views.generic import (View, TemplateView, ListView,
                                  DetailView, CreateView, DeleteView,
                                  UpdateView, )
from django.views.generic.detail import SingleObjectMixin
from django.db.models import Count, Case, When, BooleanField, Value
from . import utils


# The original index view is merged with the "allpost" view
#
# def index(request):
#     return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


# APIs Added to the original distribution code

@csrf_exempt
@login_required
def newpost(request):
    # Composing a new Post must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    # Empty Post body is checked in the Javascript
    # Nothing to check here
    data = json.loads(request.body)

    # Compile the Post object and save to database
    # The timestamp will be automatically created ONLY when the Post is created
    #
    post = Post(
        user=request.user,
        body=data.get("body")
    )
    post.save()

    return JsonResponse({"message": "Post successful."}, status=201)


@csrf_exempt
@login_required
def updatepost(request):
    # Post must be updated via  PUT request
    if request.method != "PUT":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)
    post_id = data[0]['post_id']
    # post_body = data[0]['post_body']

    # Confirm the post being updated actually exists
    try:
        post = Post.objects.get(user=request.user, pk=post_id)
    except:
        return JsonResponse({"error": "Post does not exist, or is not your own"})

    post.body = data[0]["post_body"]

    print("Saving post")
    msg = post.save()
    # print(data.get(body))
    print(msg)
    return JsonResponse({"message": "Update successful."}, status=201)


def index(request):
    all_posts = utils.enrich(request, Post.objects.all().order_by('-timestamp'))

    paginator = Paginator(all_posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'network/index.html', {'page_obj': page_obj})


class ResumeDetailView(SingleObjectMixin, ListView):
    # model = Resume
    context_object_name = "resume"
    paginate_by = 10
    template_name = 'network/resume_detail.html'

    def get(self, request, *args, **kwargs):
        self.object = self.get_object(queryset=Resume.objects.all())
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        return utils.enrich(self.request, self.object.user.posts.all().order_by('-timestamp'))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['resume'] = self.object
        return context


@csrf_exempt
@login_required
def is_follower(request, pk):
    u1 = User.objects.get(id=pk)
    u2 = request.user

    if u1.follow_set.filter(user=u2).count() == 0:
        is_follower = False
    else:
        is_follower = True

    data = {
        'is_follower': is_follower,
    }

    return JsonResponse(data)


# @login_required()
def follower_count(request, pk):
    # Return the count of followers for the user

    u1 = User.objects.get(id=pk)
    followers = u1.follow_set.count()
    follows = u1.follows.count()

    data = {'followers': followers, 'follows': follows, }

    return JsonResponse(data)


@login_required()
def toggle_follow(request, pk):
    # Toggle the Follow button

    u1 = User.objects.get(id=pk)  # Resume User
    u2 = request.user  # Authenticated User

    # Find the follower if one exists
    f = u1.follow_set.filter(user=u2)

    # f = Follow.objects.create(user=u2, follow=u1)
    print(f)

    if f.count() == 0:
        # u2 does not follow u1. Create the object
        msg = Follow.objects.create(user=u2, follow=u1)
        print("Object created")
    else:
        # u2 does follow u1. Delete the object created
        msg = f.delete()
    print(msg)
    return JsonResponse({'message': 'Done'})


class FollowingPostListView(LoginRequiredMixin, ListView):
    model = Post
    login_url = 'login'
    paginate_by = 10
    template_name = 'network/following_post.html'

    def get_queryset(self):
        # Find the users followed. This will return an array of tuples
        users_followed = self.request.user.follows.all().values()
        # Find the id of the users followed. Array of id
        users_followed_id = [x['follow_id'] for x in users_followed]
        # Find the posts for the users in the is list 'i'
        return utils.enrich(self.request, Post.objects.filter(user_id__in=users_followed_id).order_by('-timestamp'))


@login_required()
def toggle_vote(request, pk):
    # Toggle the Vote button

    u1 = request.user  # Authenticated User
    p1 = Post.objects.get(id=pk)  # Post owner

    # One final check for the user voting for their own post, just in case other checks have failed
    #
    if p1.user == request.user:
        return JsonResponse({"error": "Users cannot vote their own Posts"}, status=400)

    v1 = p1.vote_set.filter(user=u1)

    if v1.count() == 0:
        # u1 has not voted for the post p1
        msg = Vote.objects.create(user=u1, like=p1)
        action = 'created'
        print("object created")
    else:
        # u1 has voted for p1. Delete the vote
        action = 'deleted'
        msg = v1.delete()
    print(msg)

    votes = p1.vote_set.count()
    print(votes)

    # data = ({'votes': votes}, {'action': action},)
    data = {'votes': votes, 'action': action, }

    return JsonResponse(data)
