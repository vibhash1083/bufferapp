from django.db import models
from apps.common import models as social_models

# Create your models here.


class TwitterUser(social_models.SocialUser):
    """
    Twitter user
    """
    access_token_secret = models.TextField(blank=True, null=True)
    profile_image_url = models.TextField(blank=True, null=True)
    display_name = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class TwitterSlot(social_models.SocialSlot):
    """
    Tweet slots
    """

    def __str__(self):
        return str(self.slot_time)


class TwitterPost(social_models.SocialPost):
    """
    Tweets
    """

    def __str__(self):
        return self.post_content
