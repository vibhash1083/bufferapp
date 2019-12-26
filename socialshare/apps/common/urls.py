from django.conf.urls import url, include
from django.views.generic import TemplateView
from django.conf.urls import (url, include, )
from django.views.static import serve
from django.contrib import admin
from django.conf import settings

from rest_framework_swagger.views import get_swagger_view

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from django.views.generic import TemplateView

import rest_framework_jwt.views
import djoser.views
from rest_framework import routers

from rest_framework_jwt import views as jwt_views
from . import views

api_doc_schema_view = get_swagger_view(title='API Explorer')

routes = getattr(settings, 'REACT_ROUTES', [])

router = routers.SimpleRouter()

urlpatterns = [

    url(r'^api-auth', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
    url(r'^', include('apps.facebookapp.urls')),
    url(r'^', include('apps.twitterapp.urls')),

    url(r'^ht/', include('health_check.urls')),

    url('^api/', include(router.urls)),
    url(r'^(%s)?$' % '|'.join(routes), views.index, name='frontpage'),
]

urlpatterns += [url(r'^static/(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT}), ]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]

if settings.APIDOC:
    urlpatterns += [
        url(r'^api-docs', api_doc_schema_view, name='apidoc'),
    ]
else:
    urlpatterns += [

        # API AUTH

        url(r'^auth/login', rest_framework_jwt.views.obtain_jwt_token),  # using JSON web token
        url(r'^auth/register', djoser.views.RegistrationView.as_view()),

        url(r'^auth/', include('djoser.urls')),

        # JWT TOKENS

        # curl -X POST -d "username=admin&password=password123" http://localhost:8000/api-token-auth/
        url(r'^api-token-auth/', obtain_jwt_token),
        # curl -X POST -H "Content-Type: application/json" -d '{"token":"<EXISTING_TOKEN>"}' http://localhost:8000/api-token-refresh/
        url(r'^api-token-refresh/', refresh_jwt_token),
        # curl -X POST -H "Content-Type: application/json" -d '{"token":"<EXISTING_TOKEN>"}' http://localhost:8000/api-token-verify/
        url(r'^api-token-verify/', verify_jwt_token),

    ]