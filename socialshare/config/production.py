"""
Django production settings for core project
"""

import os
import json

BASE_URL = "http://share.apcelent"


ADN = {'login_id': os.environ.get(
    "ADN_LOGIN_ID"), 'transaction_key': os.environ.get("ADN_TRANSACTION_KEY")}

BROKER_URL = "mongodb://localhost:27017/brokerdb"
BROKER_POOL_LIMIT = 10

# Load enviroment
root = environ.Path(__file__) - 2
env = environ.Env()

# Read configuration file
environ.Env.read_env('.env_prod_file.py')

# DEBUG
DEBUG = env.bool('DEBUG')
# END DEBUG

# SECRET KEY DEFINITION
SECRET_KEY = env('SECRET_KEY')

#FACEBOOK PARAMETERS
FACEBOOK_APP_ID = env('FACEBOOK_CLIENT_ID')
FACEBOOK_APP_SECRET = env('FACEBOOK_CLIENT_SECRET')

#TWITTER PARAMETERS
TWITTER_CONSUMER_KEY = env('TWITTER_CONSUMER_KEY')
TWITTER_CONSUMER_SECRET = env('TWITTER_CONSUMER_SECRET')


# Define site root
SITE_ROOT = root()


ALLOWED_HOSTS = env.list('ALLOWED_HOSTS')

EMAIL_HOST_USER     = env('EMAIL_HOST_USER')

EMAIL_HOST_PASSWORD = env('EMAIL_PWD')
EMAIL_ADMIN         = env.list('EMAIL_ADMIN')

# DATABASE CONFIGURATION
# See: https://docs.djangoproject.com/en/dev/ref/settings/#databases
DATABASES = { 'default': env.db() }
# END DATABASE CONFIGURATION


