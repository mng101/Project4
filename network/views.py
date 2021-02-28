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

from .models import User, Post, Resume

from django.views.generic import (View, TemplateView, ListView,
                                  DetailView, CreateView, DeleteView,
                                  UpdateView, )
from django.views.generic.detail import SingleObjectMixin

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

    return JsonResponse({"message": "Post successful." }, status=201)

# Views added to the original distribution code

def index(request):
    all_posts = Post.objects.all().order_by('-timestamp')

    paginator = Paginator(all_posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    # try:
    #     posts = paginator.page(page)
    # except PageNotAnInteger:
    #     posts = paginator.page(1)
    # except EmptyPage:
    #     posts = paginator.page(paginator.num_pages)

    # Not using Javascript to render the Posts
    #
    # return JsonResponse([post.serialize() for post in posts], safe=False)

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
        return self.object.user.posts.all()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['resume'] = self.object
        return context


