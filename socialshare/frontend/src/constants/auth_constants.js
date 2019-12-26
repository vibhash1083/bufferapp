import { BASE_URL } from './global'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'

export const LOGIN_URL = BASE_URL + 'auth/login/'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
export const UPDATE_SIGNUP_FORM = 'UPDATE_SIGNUP_FORM'

export const SIGNUP_URL = BASE_URL + 'auth/register/'