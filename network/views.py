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

from .models import User, Post


def index(request):
    return render(request, "network/index.html")


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

# APIs Added

@csrf_exempt
@login_required
def newpost(request):
    # Composing a new POst must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    # Empty Post body is checked in the Javascript
    # Nothing to check here
    data = json.loads(request.body)

    # Compile the Post object and save to database
    post = Post(
        user=request.user,
        body=data.get("body")
    )
    post.save()

    return JsonResponse({"message": "Post successful." }, status=201)


def allposts(request):
    all_posts = Post.objects.all().order_by('-timestamp')

    paginator = Paginator(all_posts, 10)

    page = request.GET.get('page', 1)

    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        posts = paginator.page(1)
    except EmptyPage:
        posts = paginator.page(paginator.num_pages)

    return JsonResponse([post.serialize() for post in posts], safe=False)

# class ProfileCreateView(LoginRequiredMixin, CreateView):
#     model = Profile
#     form_class = ProfileForm
#     # template_name = profile_form.html
#
#     login_url = 'login'
#     '''
#     The user will be automatically redirected to the Login view if an unautenticated
#     user attempts to create a new Profile
#     '''
#
#     def form_valid(self, form):
#         form.instance.user_id = self.request.user
#         form.instance.valid = True
#         return super(ProfileCreateView, self).form_valid(form)
