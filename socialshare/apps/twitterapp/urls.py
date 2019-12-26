"""
This module has urls required for managing to twitter account here
"""

from django.conf.urls import (url, include)

from rest_framework import routers

from .twitter_viewsets import TwitterUserViewSet, TwitterSlotViewSet, TwitterPostViewSet

from . import views

router = routers.SimpleRouter()
router.register(r'twitter/user', TwitterUserViewSet)
router.register(r'twitter/slot', TwitterSlotViewSet)
router.register(r'twitter/post', TwitterPostViewSet)

urlpatterns = [

    url('^api/', include(router.urls)),
    url(r'^user/(?P<userid>[0-9]+)/twitterlogin/', views.get_token),
    url(r'^user/(?P<userid>[0-9]+)/connecttwitter/', views.begin_auth),
    url(r'^deletetwposts/(?P<twuser_id>[0-9]+)/$', views.delete_tw_posts)

]
