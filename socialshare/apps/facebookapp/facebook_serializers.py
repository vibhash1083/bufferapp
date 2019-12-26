from rest_framework import serializers

from .models import FacebookUser, FacebookSlot, FacebookPost


class FacebookUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = FacebookUser
        fields = ('id', 'user', 'name', 'picture_url')


class FacebookSlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = FacebookSlot
        fields = ('id', 'slot_time', 'social_user')


class FacebookPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = FacebookPost
        fields = ('id', 'social_user', 'post_content',
                  'post_date', 'post_slot', 'post_custom_time')
