# Create your views here.
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth.models import User
from django.shortcuts import render

from apps.twitterapp import models as twitter_models
from apps.common import models as common_models
import datetime
from django.db.models import Q

import tweepy

consumer_key = settings.TWITTER_CONSUMER_KEY
consumer_secret = settings.TWITTER_CONSUMER_SECRET
callback_base_url = settings.BASE_URL + "/user/"


def get_token(request, userid):

    callback_url = callback_base_url + userid + '/connecttwitter'
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret, callback_url)

    auth_url = auth.get_authorization_url()
    request.session['request_token'] = auth.request_token

    return redirect(auth_url)


def begin_auth(request, userid):

    callback_url = callback_base_url + userid + '/connecttwitter'
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret, callback_url)

    token = request.session['request_token']
    auth.request_token = token

    try:
        verifier_value = request.GET['oauth_verifier']
        token_value = request.GET['oauth_token']

        access_token = auth.get_access_token(verifier_value)

        access_token_key = access_token[0]
        access_token_secret = access_token[1]

        auth_new = tweepy.OAuthHandler(consumer_key, consumer_secret)

        auth_new.set_access_token(access_token_key, access_token_secret)
        api = tweepy.API(auth_new)

        twitter_user = api.me()

        username = twitter_user.screen_name
        profile_image_url = twitter_user.profile_image_url
        display_name = twitter_user.name

        twitter_models.TwitterUser.objects.filter(
            name=username).filter(user=userid).delete()
        twitter_user = twitter_models.TwitterUser(
            name=username, access_token=access_token_key, access_token_secret=access_token_secret, profile_image_url=profile_image_url, display_name=display_name)

        try:
            user = User.objects.get(id=userid)
            twitter_user.user = user
        except User.DoesNotExist:
            print("No user found")
        twitter_user.save()

        social_user = common_models.SocialUser.objects.get(
            Q(name=username), user=userid)

        # Creating default slots for the user
        default_slots = ['10:00:00', '16:00:00']
        for slot in default_slots:
            twitter_slot = twitter_models.TwitterSlot(slot_time=slot)
            twitter_slot.social_user = social_user
            twitter_slot.save()
    except:
        pass

    return redirect("/")


def delete_tw_posts(request, twuser_id):

    fb_posts = twitter_models.TwitterPost.objects.filter(
        social_user=twuser_id).delete()
    return redirect('/')
