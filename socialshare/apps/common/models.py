from django.db import models
from django.conf import settings

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import BaseUserManager

# Create your models here.


class SocialUser(models.Model):

    name = models.CharField(max_length=255, blank=True, null=True)
    access_token = models.TextField(
        blank=True, null=True)
    is_default = models.BooleanField(default=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL)

    def __str__(self):
        return self.name


class SocialSlot(models.Model):

    slot_time = models.TimeField(blank=True, null=True)
    social_user = models.ForeignKey(SocialUser)

    def __str__(self):
        return str(self.slot_time)


class SocialPost(models.Model):

    social_user = models.ForeignKey(SocialUser)
    post_content = models.CharField(max_length=255)
    post_date = models.DateField()
    post_slot = models.ForeignKey(SocialSlot, blank=True, null=True)
    post_custom_time = models.TimeField(blank=True, null=True)
    is_posted = models.BooleanField(default=False)

    def __str__(self):
        return self.post_content
