
# -*- coding: utf-8 -*-
"""
Django settings for bsgp project.

For more information on this file, see
https://docs.djangoproject.com/en/dev/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/dev/ref/settings/
"""
import environ
import os
import datetime
import djcelery
from jinja2 import Environment, FileSystemLoader

try:
    from .local import (ADN, BROKER_URL, BROKER_POOL_LIMIT, DEBUG, SECRET_KEY, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, ALLOWED_HOSTS, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, EMAIL_ADMIN, SITE_ROOT, DATABASES, BASE_URL)

except ImportError:
    from .production import (ADN, BROKER_URL, BROKER_POOL_LIMIT, DEBUG, SECRET_KEY, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, ALLOWED_HOSTS, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, EMAIL_ADMIN, SITE_ROOT, DATABASES, BASE_URL)

# Load enviroment
# root = environ.Path(__file__) - 2
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# env = environ.Env()


# # Read configuration file
# # CHANGE THIS FILE AND CREATE A NEW ENV FILE OUTSIDE GIT REPOSITORY

# environ.Env.read_env('.env_dev_file.py')

# # DEBUG
#  = env.bool('DEBUG')
# # END DEBUG

# # SECRET KEY DEFINITION
#  = env('SECRET_KEY')

# #FACEBOOK PARAMETERS
#  = env('FACEBOOK_CLIENT_ID')
#  = env('FACEBOOK_CLIENT_SECRET')

# #TWITTER PARAMETERS
#  = env('TWITTER_CONSUMER_KEY')
#  = env('TWITTER_CONSUMER_SECRET')

# Define site root
# SITE_ROOT = root()

# Site id
SITE_ID  = 1
SITE_NAME = 'SocialShare'

# Application definition
ROOT_URLCONF     = 'config.urls'
WSGI_APPLICATION = 'config.wsgi.application'

# Allowed hosts
 # = env.list('ALLOWED_HOSTS')

APPEND_SLASH = True

# APP CONFIGURATION
DJANGO_APPS = (
    # Default Django apps:
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework_jwt',
    'corsheaders',

    # Useful template tags:
    'django.contrib.humanize',
    'docs',

    # Admin
    'django.contrib.admin',


)

THIRD_PARTY_APPS = (
    'braces',
    # 'django_extensions',
    'webpack_loader',
    'custom_user',
    'djcelery',
    'djoser',

    #Rest Framework
    'rest_framework',
    'rest_framework_swagger',
    'rest_framework.authtoken',

    #health-check
    'health_check',                             # required
    'health_check.db',                          # stock Django health checkers
    'health_check.cache',
    'health_check.storage',
    'health_check.contrib.celery',              # requires celery
    # 'health_check.contrib.s3boto_storage',

    # 'dynamic_logging'
)

# Apps specific for this project go here.
LOCAL_APPS = (
    'apps',
    'apps.accounts',
    'apps.common',
    # Your stuff: custom apps go here
    # PROJECT SPECIFIC
    'apps.facebookapp',
    'apps.twitterapp'
)

# See: https://docs.djangoproject.com/en/dev/ref/settings/#installed-apps
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS
# END APP CONFIGURATION

# DOCS ROOT
DOCS_ROOT = 'docs/_build/html/'
DOCS_ACCESS = 'staff'

# IPYTHON SETTINGS
IPYTHON_ARGUMENTS = [
    '--ext', 'django_extensions.management.notebook_extension',
]

# MIDDLEWARE CONFIGURATION
MIDDLEWARE_CLASSES = (
    # Make sure djangosecure.middleware.SecurityMiddleware is listed first
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',

)
# END MIDDLEWARE CONFIGURATION

CORS_ORIGIN_ALLOW_ALL = False

CORS_ORIGIN_WHITELIST = (
    '127.0.0.1:8000',
)

SEND_ACTIVATION_EMAIL = True

# MIGRATIONS CONFIGURATION
#MIGRATION_MODULES = {
#    'sites': 'contrib.sites.migrations'
#}
# END MIGRATIONS CONFIGURATION


# FIXTURE CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-FIXTURE_DIRS
FIXTURE_DIRS = (
    os.path.join(BASE_DIR, 'fixtures'),
)
# END FIXTURE CONFIGURATION

# EMAIL CONFIGURATION
#EMAIL_BACKEND = values.Value('django.core.mail.backends.smtp.EmailBackend')
# END EMAIL CONFIGURATION

# MANAGER CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#admins
ADMINS = (
    ("""saket@sosio.in""", 'saket@sosio.in'),
)

# See: https://docs.djangoproject.com/en/dev/ref/settings/#managers
MANAGERS = ADMINS
# END MANAGER CONFIGURATION

# DATABASE CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#databases
# DATABASES = { 'default': env.db() }
# END DATABASE CONFIGURATION

# GENERAL CONFIGURATION

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.

# See: https://docs.djangoproject.com/en/dev/ref/settings/#language-code
# See: https://docs.djangoproject.com/en/dev/ref/settings/#use-tz
# END GENERAL CONFIGURATION
# TEMPLATE CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#template-context-processors
TEMPLATES = [
    {
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [os.path.join(BASE_DIR, 'templates')],
    'OPTIONS': {
        'context_processors': [
            'django.contrib.auth.context_processors.auth',
            'django.template.context_processors.debug',
            'django.template.context_processors.i18n',
            'django.template.context_processors.media',
            'django.template.context_processors.static',
            'django.template.context_processors.tz',
            'django.contrib.messages.context_processors.messages',
            'django.template.context_processors.request',
            # Your stuff: custom template context processors go here
            'apps.common.context_processors.site_info',
            ],
        'loaders': [
            'django.template.loaders.filesystem.Loader',
            'django.template.loaders.app_directories.Loader',
            ]
        }
    }
]

# STATIC FILE CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#static-root
STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'staticfiles')
# See: https://docs.djangoproject.com/en/dev/ref/settings/#static-url
STATIC_URL = '/static/'
# See: https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#std:setting-STATICFILES_DIRS
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

# See: https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#staticfiles-finders
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)
# END STATIC FILE CONFIGURATION

# MEDIA CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#media-root
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# See: https://docs.djangoproject.com/en/dev/ref/settings/#media-url
MEDIA_URL = '/media/'
# END MEDIA CONFIGURATION

# URL Configuration
ROOT_URLCONF = 'config.urls'

# See: https://docs.djangoproject.com/en/dev/ref/settings/#wsgi-application
WSGI_APPLICATION = 'config.wsgi.application'
# End URL Configuration

# AUTHENTICATION CONFIGURATION
AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
)
# END AUTHENTICATION CONFIGURATION

@classmethod
def post_setup(cls):
    cls.DATABASES['default']['ATOMIC_REQUESTS'] = True

# Your common stuff: Below this line define 3rd party library settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

JWT_AUTH = {
    'JWT_PAYLOAD_HANDLER': 'apps.accounts.views.jwt_payload_handler',

    'JWT_ENCODE_HANDLER':
    'rest_framework_jwt.utils.jwt_encode_handler',

    'JWT_DECODE_HANDLER':
    'rest_framework_jwt.utils.jwt_decode_handler',

    # 'JWT_PAYLOAD_HANDLER':
    # 'rest_framework_jwt.utils.jwt_payload_handler',

    'JWT_PAYLOAD_GET_USER_ID_HANDLER':
    'rest_framework_jwt.utils.jwt_get_user_id_from_payload_handler',

    'JWT_RESPONSE_PAYLOAD_HANDLER':
    'rest_framework_jwt.utils.jwt_response_payload_handler',

    'JWT_PUBLIC_KEY': None,
    'JWT_PRIVATE_KEY': None,
    'JWT_ALGORITHM': 'HS256',
    'JWT_VERIFY': True,
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_LEEWAY': 0,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=2),
    'JWT_AUDIENCE': None,
    'JWT_ISSUER': None,

    'JWT_ALLOW_REFRESH': False,
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=7),

    'JWT_AUTH_HEADER_PREFIX': 'JWT',
}

# EMAIL CONFIGURATION
EMAIL_BACKEND       = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS       = True
EMAIL_HOST          = 'smtp.gmail.com'
# = env('EMAIL_HOST_USER')
# = env('EMAIL_PWD')
EMAIL_PORT          = 587
# = env.list('EMAIL_ADMIN')
DEFAULT_FROM_EMAIL  = EMAIL_HOST_USER
# END EMAIL CONFIGURATION

# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# JINJA CONFIG
JINJA_TEMPLATES = Environment(
    autoescape=False,
    loader=FileSystemLoader(os.path.join(BASE_DIR, 'path/to/templates/dir')),
    trim_blocks=False)

### WEBPACK LOADER
WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'bundle/', # must end with slash
        'STATS_FILE': os.path.join(BASE_DIR, 'frontend/webpack-stats.json'),
        'POLL_INTERVAL': 0.1,
        'IGNORE': ['.+\.hot-update.js', '.+\.map']
    }
}

if not DEBUG:
  WEBPACK_LOADER['DEFAULT']['BUNDLE_DIR_NAME'] = 'dist/'
  WEBPACK_LOADER['DEFAULT']['STATS_FILE'] = os.path.join(BASE_DIR, 'frontend/webpack-stats-prod.json')

# ACCOUNT REGISTRATION
REGISTRATION_AUTO_LOGIN = True
ACCOUNT_ACTIVATION_DAYS = 1

#Celery Settings
djcelery.setup_loader()

CELERY_IMPORTS = ('apps.common.tasks', )
from celery.schedules import crontab
from datetime import timedelta

# CELERYBEAT_SCHEDULE = {
#   'schedule-name': {
#           'task': 'apps.common.tasks.per_day_status_report',  # We are going to create a email_sending_method later in this post.
#           'schedule': crontab(minute=0,hour=18),
#     },
# }

TEST_RUNNER = 'djcelery.contrib.test_runner.CeleryTestSuiteRunner'

DEFAULT_PAGINATION_CLASS = "rest_framework_reactive.pagination.LimitOffsetPagination"

# WS4REDIS_SUBSCRIBER = "rest_framework_reactive.websockets.QueryObserverSubscriber"

APIDOC = False

REACT_ROUTES = [
    'signin/',
    'signup/',
    'logout-page/',
    'registered/',
]

CELERYD_LOG_FILE = 'celery.log'


LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'simple': {
            'format': '%(levelname)s %(message)s',
             'datefmt': '%y %b %d, %H:%M:%S',
            },
        },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'celery.task': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': 'celery_task.log',
            'formatter': 'simple',
            'maxBytes': 1024 * 1024 * 100,  # 100 mb
        },
    },
    'loggers': {
        'celery.task': {
            'handlers': ['celery.task', 'console'],
            'level': 'INFO',
        },
    }
}

from logging.config import dictConfig
dictConfig(LOGGING)