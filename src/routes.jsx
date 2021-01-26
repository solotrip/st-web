import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SearchContainer from './features/home/containers/search'
import CityRoutes from './features/city/routes'
import AuthRoutes from './features/auth/routes'

import NavbarContainer from './features/navigation/containers/navbar'
import { Loader } from 'components'

/**
 * These routes are just for development purposes
 * They won't be displayed in production release.
 */
const DevRoutes = () => (
  <Switch>
    <Route path='/test/loading' component={Loader}/>
  </Switch>
)

const Routes = () => (
  <Router>
    <Route path='/' component={SearchContainer} exact/>
    <AuthRoutes/>
    <CityRoutes/>
    <NavbarContainer/>
    {process.env.NODE_ENV === 'development' && <DevRoutes/>}
  </Router>
)
export default Routes
