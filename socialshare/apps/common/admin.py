from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(SocialUser)
admin.site.register(SocialSlot)
admin.site.register(SocialPost)