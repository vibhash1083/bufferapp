"""
All tasks related to buffer app here
"""

import io
import os
from django.conf import settings
from django.utils import timezone
from django.contrib.auth import get_user_model

from datetime import timedelta, datetime

from celery import task
from celery.task.schedules import crontab
from celery.decorators import periodic_task
from celery.utils.log import get_task_logger


import tweepy
import facebook
from django.db.models import Q

from apps.twitterapp import models as tweet_models
from apps.facebookapp import models as facebook_models
from apps.common.time_celery_task import timeit
import logging


current_scheduled_tweets = tweet_models.TwitterPost.objects.filter(
        is_posted=False)
current_scheduled_posts = facebook_models.FacebookPost.objects.filter(
            is_posted=False)


logger = get_task_logger('celery.task')

logger.info('Current Tweets: %s', current_scheduled_tweets)

logger.info("Current Fb posts: %s", current_scheduled_posts)

@periodic_task(run_every=timedelta(seconds=55))
def tweet_scheduled_posts():
    """
    Tweets all scheduled posts
    """

    cfg = {
        "consumer_key": settings.TWITTER_CONSUMER_KEY,
        "consumer_secret": settings.TWITTER_CONSUMER_SECRET,
    }

    auth = tweepy.OAuthHandler(cfg['consumer_key'], cfg['consumer_secret'])

    start_date = timezone.now().date()
    end_date = start_date + timedelta(days=1)


    try:
        for scheduled_tweet in current_scheduled_tweets:
            if not scheduled_tweet.is_posted:
                if scheduled_tweet.post_slot:
                    scheduled_time = scheduled_tweet.post_slot.slot_time
                else:
                    scheduled_time = scheduled_tweet.post_custom_time

                from django.utils.timezone import now, localtime
                import pytz

                current_time = datetime.now(
                    pytz.timezone('Asia/Kolkata')).time()
                current_date = datetime.now(
                    pytz.timezone('Asia/Kolkata')).date()

                if scheduled_time < current_time and scheduled_tweet.post_date <= current_date:
                    access_token = scheduled_tweet.social_user.access_token
                    social_user_name = scheduled_tweet.social_user.name
                    app_user = scheduled_tweet.social_user.user
                    twitter_user = tweet_models.TwitterUser.objects.get(
                        Q(name=social_user_name, user=app_user))
                    access_token_secret = twitter_user.access_token_secret

                    auth = tweepy.OAuthHandler(
                        cfg['consumer_key'], cfg['consumer_secret'])
                    auth.set_access_token(access_token, access_token_secret)
                    api = tweepy.API(auth)

                    tweet_content = scheduled_tweet.post_content

                    status = api.update_status(status=tweet_content)
                    scheduled_tweet.is_posted = True
                    scheduled_tweet.save()
    except Exception as e:
        pass


@periodic_task(run_every=timedelta(seconds=55))
def share_scheduled_facebook_posts():
    """
    Shares all scheduled posts on facebook
    """
    try:

        # print("Current Fb posts", current_scheduled_posts)


        for scheduled_fbpost in current_scheduled_posts:

            access_token = scheduled_fbpost.social_user.access_token
            graph = facebook.GraphAPI(access_token=access_token)
            if not scheduled_fbpost.is_posted:
                if scheduled_fbpost.post_slot:
                    scheduled_time = scheduled_fbpost.post_slot.slot_time
                else:
                    scheduled_time = scheduled_fbpost.post_custom_time

                from django.utils.timezone import now, localtime
                import pytz

                current_time = datetime.now(
                    pytz.timezone('Asia/Kolkata')).time()
                current_date = datetime.now(
                    pytz.timezone('Asia/Kolkata')).date()

                if scheduled_time < current_time and scheduled_fbpost.post_date <= current_date:
                    post_content = scheduled_fbpost.post_content
                    respose = graph.put_wall_post(message=post_content)

                    scheduled_fbpost.is_posted = True
                    scheduled_fbpost.save()

    except Exception as e:
        pass