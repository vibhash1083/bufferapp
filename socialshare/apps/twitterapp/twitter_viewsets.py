from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .twitter_serializers import TwitterUserSerializer, TwitterSlotSerializer, TwitterPostSerializer
from .models import TwitterUser, TwitterSlot, TwitterPost

from apps.common import tasks


class TwitterUserViewSet(viewsets.ModelViewSet):

    queryset = TwitterUser.objects.all()
    serializer_class = TwitterUserSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        twitter_post_obj = serializer.save()
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        twitter_user_obj = serializer.save()

        return Response(serializer.data)

    def destroy(self, request, pk=None):

        instance = self.get_object()
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class TwitterSlotViewSet(viewsets.ModelViewSet):

    queryset = TwitterSlot.objects.all()
    serializer_class = TwitterSlotSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        twitter_slot_obj = serializer.save()
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        twitter_slot_obj = serializer.save()

        return Response(serializer.data)

    def destroy(self, request, pk=None):

        instance = self.get_object()
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class TwitterPostViewSet(viewsets.ModelViewSet):

    queryset = TwitterPost.objects.all()
    serializer_class = TwitterPostSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        twitter_post_obj = serializer.save()
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        twitter_post_obj = serializer.save()

        return Response(serializer.data)

    def destroy(self, request, pk=None):

        instance = self.get_object()
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
