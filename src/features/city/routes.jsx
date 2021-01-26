import React from 'react'
import { Route, Switch } from 'react-router-dom'
//Pages
import OverviewContainer from './containers/overview'

const Routes = () => (
  <Switch>
    <Route
      path='/cities/:sid/overview'
      component={OverviewContainer}
    />
    <Route
      path='/cities/:slug/activities'
      component={OverviewContainer}
      exact
    />
    <Route path='/cities/:slug/scores' component={OverviewContainer} exact/>
    <Route path='/cities/:slug/budget' component={OverviewContainer} exact/>
    <Route path='/cities/:slug/flights' component={OverviewContainer} exact/>
    <Route
      path='/cities/:slug/visa-status'
      component={OverviewContainer}
      exact
    />
    <Route
      path='/cities/:slug/weather-and-nature'
      component={OverviewContainer}
      exact
    />
    <Route path='/cities/:slug/culture' component={OverviewContainer} exact/>
    <Route
      path='/cities/:slug/transportation'
      component={OverviewContainer}
      exact
    />
  </Switch>
)
export default Routes
