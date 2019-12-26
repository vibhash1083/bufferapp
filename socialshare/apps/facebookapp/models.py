from django.db import models
from apps.common import models as social_models

# Create your models here.


class FacebookUser(social_models.SocialUser):
    """
    Facebook user
    """
    facebook_id = models.BigIntegerField(blank=True, null=True)
    picture_url = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class FacebookSlot(social_models.SocialSlot):
    """
    Facebook post slots
    """

    def __str__(self):
        return str(self.slot_time)


class FacebookPost(social_models.SocialPost):
    """
    Facebook posts
    """

    def __str__(self):
        return self.post_content
