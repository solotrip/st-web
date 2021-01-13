/* eslint-disable */
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

//Pages
import OverviewContainer from './features/city/components/pages/overview'
import ActivitiesContainer from './features/city/components/pages/activities'
import ScoresContainer from './features/city/components/pages/scores'
import BudgetContainer from './features/city/components/pages/budget'
import FlightsContainer from './features/city/components/pages/flights'
import VisaStatusContainer from './features/city/components/pages/visa-status'
import WeatherNatureContainer from './features/city/components/pages/weather-and-nature'
import CultureContainer from './features/city/components/pages/culture'
import TransportationContainer from './features/city/components/pages/transportation'

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
      {/*<Route path='/cities/:slug' component={CityContainer} exact />*/}
      <Route
        path='/cities/:slug/overview'
        component={OverviewContainer}
        exact
      />
      <Route
        path='/cities/:slug/activities'
        component={ActivitiesContainer}
        exact
      />
      <Route path='/cities/:slug/scores' component={ScoresContainer} exact />
      <Route path='/cities/:slug/budget' component={BudgetContainer} exact />
      <Route path='/cities/:slug/flights' component={FlightsContainer} exact />
      <Route
        path='/cities/:slug/visa-status'
        component={VisaStatusContainer}
        exact
      />
      <Route
        path='/cities/:slug/weather-and-nature'
        component={WeatherNatureContainer}
        exact
      />
      <Route path='/cities/:slug/culture' component={CultureContainer} exact />
      <Route
        path='/cities/:slug/transportation'
        component={TransportationContainer}
        exact
      />
    </Switch>
  </Router>
)
export default Routes
