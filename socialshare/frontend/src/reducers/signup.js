import jwt_decode from 'jwt-decode'
import { SIGNUP_URL } from '../constants/auth_constants'
import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../constants/auth_constants'
import { UPDATE_SIGNUP_FORM } from '../constants/auth_constants'

function getInitialAuthState() 
{
    var isAuthenticated = false
    return {
    signup_form: {
        username: '',
        password: '',
        email: ''
    },
    isLoading: false,
    isAuthenticated: isAuthenticated,
    error: null
    }
}

export default function signup(state = getInitialAuthState(), action) 
{
    switch(action.type) 
    {
        case UPDATE_SIGNUP_FORM:
        var form = state.signup_form;
        form[action.key] = action.value;
        return Object.assign({}, state, {
            signup_form: form
        });

        case SIGNUP_REQUEST:
        return Object.assign({}, state, {
            isLoading: action.isLoading
        });
        case SIGNUP_SUCCESS:
        return Object.assign({}, state, {
            isLoading: action.isLoading,
            isAuthenticated: action.isAuthenticated,
            error: action.err
        });
        case SIGNUP_FAILURE:
        return Object.assign({}, state, {
            signup_form: {username: '', password: '', email: ''},
            isLoading: action.isLoading,
            isAuthenticated: action.isAuthenticated,
            error: action.err
        });

        default:
        return state;
    }
}