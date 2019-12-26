import { CALL_API, Schemas } from '../middleware/api'
import { browserHistory } from 'react-router';
import { SIGNUP_URL } from '../constants/auth_constants'
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../constants/auth_constants'
import { UPDATE_SIGNUP_FORM } from '../constants/auth_constants'

// Returns cookie value
function getCookie(name)
{
    var cookieValue = null;
    if (document.cookie && document.cookie != '')
    {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++)
        {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '='))
                {
                    var cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
        }
    }
    return cookieValue;
}


// UPDATE SIGN FORM
export function update_signup_form(value, key){
    return {
    type: UPDATE_SIGNUP_FORM,
    value: value,
    key: key
    }
}

// SIGNUP ACTIONS
function signup_request() {
    return {
    type: SIGNUP_REQUEST,
    isLoading: true
    }
}

function signup_success() {
    return {
    type: SIGNUP_SUCCESS,
    isLoading: false,
    isAuthenticated: true,
    err: null
    }
}

function signup_failure(err) {
    return {
    type: SIGNUP_FAILURE,
    isAuthenticated: false,
    isLoading: false,
    err: err
    }
}


// signup user
export function signupUser(creds, redirect="registered/") {
    // Get csrf token
    let csrf_token = getCookie('csrftoken')


    // Build body data
    let body = new FormData()
    body.append('username', creds.username)
    body.append('password', creds.password)
    body.append('email', creds.email)

    // Build request
    let config = {
    method: 'POST',
    body: body
    }
    // Get url
    let URL = SIGNUP_URL

    // Dispatch login
    return dispatch => {
    dispatch(signup_request())
    return fetch(URL, config)
        .then(response =>
          response.json().then(user => ({ user, response }))
         ).then(({ user, response }) =>  {
             if (!response.ok) {
             // If there was a problem, we want to
             // dispatch the error condition
             dispatch(signup_failure(user))
             return Promise.reject(user)
             } else {
             // If login was successful, set the token in local storage
             localStorage.setItem('id_token', user.token)
             // Dispatch the success action
             dispatch(signup_success())
             // Redirect
             browserHistory.push(redirect)
             }
         }).catch(err => console.log("Error: ", err))
             }
    }