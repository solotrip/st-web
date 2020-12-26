import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import LoginContainer from './features/auth/containers/login'
import SignupContainer from './features/auth/containers/signup'
import SearchContainer from './features/home/containers/search'
import CityContainer from './features/city/containers/city'

const NotAuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !localStorage.getItem('accessToken') ? (
        <Component {...props} />
      ) : (
        <Redirect to='/' />
      )
    }
  />
)

const Routes = () => (
  <Router>
    <Switch>
      <NotAuthenticatedRoute path='/login' component={LoginContainer} />
      <NotAuthenticatedRoute path='/signup' component={SignupContainer} />
      <Route path='/' component={SearchContainer} exact />
      <Route path='/cities/:slug' component={CityContainer} exact />
    </Switch>
  </Router>
)
export default Routes
