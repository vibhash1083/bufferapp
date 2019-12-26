from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .facebook_serializers import *
from .models import *

from apps.common import tasks


class FacebookUserViewSet(viewsets.ModelViewSet):

    queryset = FacebookUser.objects.all()
    serializer_class = FacebookUserSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        Facebook_user_obj = serializer.save()
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        facebook_user_obj = serializer.save()

        return Response(serializer.data)

    def destroy(self, request, pk=None):

        instance = self.get_object()
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class FacebookSlotViewSet(viewsets.ModelViewSet):

    queryset = FacebookSlot.objects.all()
    serializer_class = FacebookSlotSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        facebook_slot_obj = serializer.save()
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        facebook_slot_obj = serializer.save()

        return Response(serializer.data)

    def destroy(self, request, pk=None):

        instance = self.get_object()
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class FacebookPostViewSet(viewsets.ModelViewSet):

    queryset = FacebookPost.objects.all()
    serializer_class = FacebookPostSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        facebook_post_obj = serializer.save()
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        facebook_post_obj = serializer.save()

        return Response(serializer.data)

    def destroy(self, request, pk=None):
        instance = self.get_object()
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
