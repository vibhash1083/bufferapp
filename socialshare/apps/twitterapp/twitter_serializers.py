from rest_framework import serializers

from .models import TwitterUser, TwitterSlot, TwitterPost


class TwitterUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = TwitterUser
        fields = ('id', 'name', 'display_name', 'profile_image_url', 'user')


class TwitterSlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = TwitterSlot
        fields = ('id', 'slot_time', 'social_user')


class TwitterPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = TwitterPost
        fields = ('id', 'social_user', 'post_content',
                  'post_date', 'post_slot', 'post_custom_time')
