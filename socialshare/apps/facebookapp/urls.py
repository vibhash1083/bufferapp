"""
This module has urls required for managing to facebook account here
"""


from django.conf.urls import (url, include)

from rest_framework import routers

from .facebook_viewsets import FacebookUserViewSet, FacebookSlotViewSet, FacebookPostViewSet

from . import views

router = routers.SimpleRouter()
router.register(r'facebook/user', FacebookUserViewSet)
router.register(r'facebook/slot', FacebookSlotViewSet)
router.register(r'facebook/post', FacebookPostViewSet)

urlpatterns = [

    url('^api/', include(router.urls)),
    url(r'^deletefbposts/(?P<fbuser_id>[0-9]+)/$', views.delete_fb_posts),
    url(r'^user/(?P<userid>[0-9]+)/facebookreturn/$', views.facebook_return),
    url(r'^user/(?P<userid>[0-9]+)/facebooklogin/', views.get_token),

]