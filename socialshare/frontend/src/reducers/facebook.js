import { EDIT_FB_POSTS_QUEUE, GET_FB_POSTS_QUEUE, ADD_FB_POSTS_QUEUE, GET_FB_USER, GET_FB_SLOTS, ADD_FB_SLOTS, DELETE_FB_POSTS_QUEUE, DELETE_FB_SLOTS, DELETE_FB_USERS } from '../constants/social_constants';

const initialState = [];
const INITIAL_STATE =  { posts: '', users: '',slots: '',
                        isLoading: false,post: '',
                        error: null}

export function fbposts(state = [], action)
{
  switch (action.type) {

  case GET_FB_POSTS_QUEUE:

    return [ ...action.fbposts ];

  case ADD_FB_POSTS_QUEUE:
    return [ ...state, action.fbpost ];

  case DELETE_FB_POSTS_QUEUE:

    var newState =[ ...state.filter((option) => option.id !== parseInt(action.id))];
    return newState

  case EDIT_FB_POSTS_QUEUE:
    var Edit_state = state.map(post =>
      post.id === parseInt(action.fbpost.id) ? action.fbpost : post
    );
    return Edit_state

  default:
    return state;
  }
}

export function fbusers(state = [], action)
{
  switch (action.type) {

  case GET_FB_USER:
    return [ ...action.fbusers ];

  case DELETE_FB_USERS:
    var newState =[ ...state.filter((option) => option.id !== parseInt(action.id))];
    return newState

  default:
    return state;
  }
}

export function fbslots(state = [], action)
{
  switch (action.type) {

  case GET_FB_SLOTS:
    return [ ...action.fbslots ];

  case ADD_FB_SLOTS:
    return [ ...state, action.fbslot ];

  case DELETE_FB_SLOTS:
    var newState =[ ...state.filter((option) => option.id !== parseInt(action.id))];
    return newState

  default:
    return state;
  }
}