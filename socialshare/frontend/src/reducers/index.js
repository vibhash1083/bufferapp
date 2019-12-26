import merge from 'lodash/merge'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import auth  from './auth.js'
import {fbposts, fbusers, fbslots} from './facebook'
import {twposts, twusers, twslots} from './twitter'

import signup  from './signup'

// Updates the pagination data for different actions.
const rootReducer = combineReducers({
    auth,
    fbposts,
    fbusers,
    fbslots,
    twposts,
    twusers,
    twslots,
    signup,
    routing
})

export default rootReducer