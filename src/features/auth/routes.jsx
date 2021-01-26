import React from 'react'
import { NotAuthenticatedRoute } from 'components'
import LoginContainer from 'features/auth/containers/login'
import SignupContainer from 'features/auth/containers/signup'
import { Switch } from 'react-router-dom'

const Routes = () => (
  <Switch>
    <NotAuthenticatedRoute path='/login' component={LoginContainer}/>
    <NotAuthenticatedRoute path='/signup' component={SignupContainer}/>
  </Switch>
)
export default Routes
