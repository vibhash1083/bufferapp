from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(TwitterUser)
admin.site.register(TwitterSlot)
admin.site.register(TwitterPost)