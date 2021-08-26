import React from 'react'
import { NotAuthenticatedRoute, SheetWrapper } from 'components'
import LoginContainer from 'features/auth/containers/login'
import SignupContainer from 'features/auth/containers/signup'
import { Switch } from 'react-router-dom'

const Routes = () => (
  <Switch>
    <NotAuthenticatedRoute path="/:path/login" children={
      <SheetWrapper><LoginContainer/></SheetWrapper>
    }
    />
    <NotAuthenticatedRoute path="/:path/signup" children={
      <SheetWrapper><SignupContainer/></SheetWrapper>}
    />
    <NotAuthenticatedRoute path="/login" children={
      <SheetWrapper><LoginContainer/></SheetWrapper>
    }
    />
    <NotAuthenticatedRoute path="/signup" children={
      <SheetWrapper><SignupContainer/></SheetWrapper>}
    />
  </Switch>
)
export default Routes
