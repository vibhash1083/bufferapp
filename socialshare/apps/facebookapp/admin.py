from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(FacebookUser)
admin.site.register(FacebookSlot)
admin.site.register(FacebookPost)