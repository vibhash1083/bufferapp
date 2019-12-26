import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { browserHistory } from 'react-router'

import AuthenticatedApp from './containers/AuthenticatedApp'
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'

import Logout from './components/auth/Logout'
import Main from './components/Main'
import AddAccountPage from './components/AddAccountPage'

import Registered from './components/auth/Registered'

import { requireAuthentication } from './components/auth/AuthenticatedComponent'

export default (
  <Route path="/" component={AuthenticatedApp} history={browserHistory}>
    <IndexRoute component={requireAuthentication(Main)}  />

  	<Route path="signin/" component={SignIn} />
  	<Route path="signup/" component={SignUp} />


  	<Route path="logout-page/" component={Logout} />
    <Route path="registered/" component={Registered} />

  </Route>
)
