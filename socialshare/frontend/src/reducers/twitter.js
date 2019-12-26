import { GET_TW_POSTS_QUEUE, ADD_TW_POSTS_QUEUE, GET_TW_USER, GET_TW_SLOTS, ADD_TW_SLOTS, DELETE_TW_POSTS_QUEUE, DELETE_TW_SLOTS, DELETE_TW_USERS, EDIT_TW_POSTS_QUEUE } from '../constants/social_constants';

const initialState = [];
const INITIAL_STATE =  { posts: '', users: '',slots: '',
                        isLoading: false,
                        error: null}

export function twposts(state = [], action)
{
  switch (action.type) {

  case GET_TW_POSTS_QUEUE:

    return [ ...action.twposts ];

  case ADD_TW_POSTS_QUEUE:

    return [ ...state, action.twpost ];

  case DELETE_TW_POSTS_QUEUE:

    var newState =[ ...state.filter((option) => option.id !== parseInt(action.id))]
    return newState

  case EDIT_TW_POSTS_QUEUE:

    var Edit_state = state.map(post =>
          post.id === parseInt(action.twpost.id) ? action.twpost : post
    );
    return Edit_state

  default:
    return state;
  }
}

export function twusers(state = [], action)
{
  switch (action.type) {

  case GET_TW_USER:
    return [ ...action.twusers ];

  case DELETE_TW_USERS:
    var newState =[ ...state.filter((option) => option.id !== parseInt(action.id))]
    return newState

  default:
    return state;
  }
}

export function twslots(state = [], action)
{
  switch (action.type) {

  case GET_TW_SLOTS:
    return [ ...action.twslots ];

  case ADD_TW_SLOTS:
    return [ ...state, action.twslot ];

  case DELETE_TW_SLOTS:
    var newState =[ ...state.filter((option) => option.id !== parseInt(action.id))];
    return newState

  default:
    return state;
  }
}