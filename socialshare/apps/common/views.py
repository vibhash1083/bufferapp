from django.conf import settings
from django.shortcuts import render, redirect


def index(request, demo):
    return render(request, "common/pages/frontpage.html")
