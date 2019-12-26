from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib.auth.models import User
from urllib.request import urlopen
import datetime
from facebook import *
from apps.facebookapp import models as facebook_models
from apps.common import models as common_models
from django.db.models import Q
import json


# Create your views here.
def get_token(request, userid):

    callback_base_url = "https://www.facebook.com/dialog/oauth?client_id="
    app_id = settings.FACEBOOK_APP_ID
    redirect_uri = settings.BASE_URL + "/user/" + userid + "/facebookreturn"
    scope_parameters = "&scope=email,user_birthday,publish_actions,user_posts&auth_type=reauthenticate"

    callback_url = callback_base_url + app_id + \
        "&redirect_uri=" + redirect_uri + scope_parameters

    return redirect(callback_url)


def facebook_return(request, userid):

    code = request.GET.get('code')
    facebook_base_url = "https://graph.facebook.com/oauth/access_token?client_id="
    client_id = settings.FACEBOOK_APP_ID
    redirect_uri = settings.BASE_URL + "/user/" + userid + "/facebookreturn"
    client_secret = settings.FACEBOOK_APP_SECRET

    facebook_return_url = facebook_base_url + client_id + "&redirect_uri=" + \
        redirect_uri + "&client_secret=" + client_secret + "&code=%s#_=_"

    site_url_obj = urlopen(facebook_return_url % code)

    site_read_data = site_url_obj.read().decode(
        site_url_obj.headers.get_content_charset())

    access_token = json.loads(site_read_data)['access_token']

    graph = GraphAPI(access_token)
    profile = graph.get_object('me')
    facebook_id = profile.get('id')
    username = profile.get('name')
    profile_pic = 'https://graph.facebook.com/' + facebook_id + '/picture/'

    facebook_models.FacebookUser.objects.filter(
        name=username).filter(user=userid).delete()
    facebook_user = facebook_models.FacebookUser(
        name=username, access_token=access_token, facebook_id=facebook_id, picture_url=profile_pic)
    try:
        user = User.objects.get(id=userid)
        facebook_user.user = user
    except User.DoesNotExist:
        print("No user found")

    facebook_user.save()

    social_user = common_models.SocialUser.objects.get(
        Q(name=username), user=userid)

    default_slots = ['10:00:00', '16:00:00']
    for slot in default_slots:
        facebook_slot = facebook_models.FacebookSlot(slot_time=slot)
        facebook_slot.social_user = social_user
        facebook_slot.save()

    return redirect('/')


def delete_fb_posts(request, fbuser_id):

    fb_posts = facebook_models.FacebookPost.objects.filter(
        social_user=fbuser_id).delete()
    return redirect('/')
