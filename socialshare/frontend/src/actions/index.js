import * as types from '../constants/social_constants'
import 'isomorphic-fetch'
import axios from 'axios'
import { BASE_URL } from '../constants/global'
import jwt_decode from 'jwt-decode'


function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();

      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

//const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:8000/api/' : '/api/';
const ROOT_URL = BASE_URL + 'api/';


/////// FACEBOOK ACTIONS
export function addfbpostque(creds) {
    const token = localStorage.getItem('id_token')


   return function(dispatch) {
    axios.post(`${ROOT_URL}facebook/post/`, creds, {
      headers: {Authorization: "JWT " + `${token}`}
    })
      .then(response => {
      dispatch({
        type: types.ADD_FB_POSTS_QUEUE,
        fbpost: response.data
      });
    }).catch((error) => {
      console.log('error',error)
    });
  }
}

export function addfbslot(creds) {
    const token = localStorage.getItem('id_token')


   return function(dispatch) {
    axios.post(`${ROOT_URL}facebook/slot/`, creds, {
      headers: {Authorization: "JWT " + `${token}`}
    })
      .then(response => {
      dispatch({
        type: types.ADD_FB_SLOTS,
        fbslot: response.data
      });
    })
  }
}

export function getfbpostque() {
    const token = localStorage.getItem('id_token')

  return function(dispatch) {
    axios.get(`${ROOT_URL}facebook/post/`, {
      headers: {Authorization: "JWT " + `${token}`}
    })
    .then(response => {
      dispatch({
        type: types.GET_FB_POSTS_QUEUE,
        fbposts: response.data
      });
    })
    .catch((error) => {
      console.log('error',error)
    });
  }
}

export function editfbpostque(creds) {
    const token = localStorage.getItem('id_token')

  return function(dispatch) {
    axios.put(`${ROOT_URL}facebook/post/`+`${creds.id}/`, creds, {
      headers: {
        Authorization: "JWT " + `${token}`,
        "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: 'same-origin'
    })
    .then(response => {
      dispatch({
        type: types.EDIT_FB_POSTS_QUEUE,
        fbpost: response.data
      });
    })
    .catch((error) => {
      console.log('error',error)
    });
  }
}


export function deletefbposts(id) {
    const token = localStorage.getItem('id_token')

    return function(dispatch) {
        axios.delete(`${ROOT_URL}facebook/post/`+`${id}`,{
         headers: {Authorization: "JWT " + `${token}`}
        }).then(response => {
      dispatch({
        type: types.DELETE_FB_POSTS_QUEUE,
        id: id
      });
    })
    }
}

export function deletefbslots(id) {
    const token = localStorage.getItem('id_token')

    return function(dispatch) {
        axios.delete(`${ROOT_URL}facebook/slot/`+`${id}`,{
         headers: {Authorization: "JWT " + `${token}`}
        }).then(response => {
      dispatch({
        type: types.DELETE_FB_SLOTS,
        id: id
      });
    })
    }
}

export function deletefbusers(id) {
    const token = localStorage.getItem('id_token')

    return function(dispatch) {
        axios.delete(`${ROOT_URL}facebook/user/`+`${id}`,{
         headers: {Authorization: "JWT " + `${token}`}
        }).then(response => {
      dispatch({
        type: types.DELETE_FB_USERS,
        id: id
      });
    })
    }
}



export function getfbuser() {
    const token = localStorage.getItem('id_token')
  return function(dispatch) {
    axios.get(`${ROOT_URL}facebook/user/`, {
      headers: {Authorization: "JWT " + `${token}`}
    })
    .then(response => {
      dispatch({
        type: types.GET_FB_USER,
        fbusers: response.data
      });
    })
    .catch((error) => {
      console.log('error',error)
    });
  }
}

export function getfbslot() {
    const token = localStorage.getItem('id_token')

  return function(dispatch) {
    axios.get(`${ROOT_URL}facebook/slot/`, {
      headers: {Authorization: "JWT " + `${token}`}
    })
    .then(response => {
      dispatch({
        type: types.GET_FB_SLOTS,
        fbslots: response.data
      });
    })
    .catch((error) => {
      console.log('error',error)
    });
  }
}


/////// TWITTER ACTIONS
export function addtwpostque(creds) {
    const token = localStorage.getItem('id_token')


   return function(dispatch) {
    axios.post(`${ROOT_URL}twitter/post/`, creds, {
      headers: {Authorization: "JWT " + `${token}`}
    })
      .then(response => {
      dispatch({
        type: types.ADD_TW_POSTS_QUEUE,
        twpost: response.data
      });
    }).catch((error) => {
      console.log('error',error)
    });
  }
}

export function gettwpostque() {
    const token = localStorage.getItem('id_token')

  return function(dispatch) {
    axios.get(`${ROOT_URL}twitter/post/`, {
      headers: {Authorization: "JWT " + `${token}`}
    })
    .then(response => {
      dispatch({
        type: types.GET_TW_POSTS_QUEUE,
        twposts: response.data
      });
    })
    .catch((error) => {
      console.log('error',error)
    });
  }
}

export function deletetwposts(id) {
    const token = localStorage.getItem('id_token')

    return function(dispatch) {
        axios.delete(`${ROOT_URL}twitter/post/`+`${id}`,{
         headers: {Authorization: "JWT " + `${token}`}
        }).then(response => {
      dispatch({
        type: types.DELETE_TW_POSTS_QUEUE,
        id: id
      });
    })
    }
}

export function edittwpostque(creds) {
    const token = localStorage.getItem('id_token')

  return function(dispatch) {
    axios.put(`${ROOT_URL}twitter/post/`+`${creds.id}/`, creds, {
      headers: {
        Authorization: "JWT " + `${token}`,
        "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: 'same-origin'
    })
    .then(response => {
      dispatch({
        type: types.EDIT_TW_POSTS_QUEUE,
        twpost: response.data
      });
    })
    .catch((error) => {
      console.log('error',error)
    });
  }
}


export function gettwuser() {
    const token = localStorage.getItem('id_token')

  return function(dispatch) {
    axios.get(`${ROOT_URL}twitter/user/`, {
      headers: {Authorization: "JWT " + `${token}`}
    })
    .then(response => {
      dispatch({
        type: types.GET_TW_USER,
        twusers: response.data
      });
    })
    .catch((error) => {
      console.log('error',error)
    });
  }
}


export function gettwslot() {
    const token = localStorage.getItem('id_token')

  return function(dispatch) {
    axios.get(`${ROOT_URL}twitter/slot/`, {
      headers: {Authorization: "JWT " + `${token}`}
    })
    .then(response => {
      dispatch({
        type: types.GET_TW_SLOTS,
        twslots: response.data
      });
    })
    .catch((error) => {
      console.log('error',error)
    });
  }
}

export function addtwslot(creds) {
    const token = localStorage.getItem('id_token')


   return function(dispatch) {
    axios.post(`${ROOT_URL}twitter/slot/`, creds, {
      headers: {Authorization: "JWT " + `${token}`}
    })
      .then(response => {
      dispatch({
        type: types.ADD_TW_SLOTS,
        twslot: response.data
      });
    })
  }
}

export function deletetwslots(id) {
    const token = localStorage.getItem('id_token')

    return function(dispatch) {
        axios.delete(`${ROOT_URL}twitter/slot/`+`${id}`,{
         headers: {Authorization: "JWT " + `${token}`}
        }).then(response => {
      dispatch({
        type: types.DELETE_TW_SLOTS,
        id: id
      });
    })
    }
}

export function deletetwusers(id) {
    const token = localStorage.getItem('id_token')

    return function(dispatch) {
        axios.delete(`${ROOT_URL}twitter/user/`+`${id}`,{
         headers: {Authorization: "JWT " + `${token}`}
        }).then(response => {
      dispatch({
        type: types.DELETE_TW_USERS,
        id: id
      });
    })
    }
}