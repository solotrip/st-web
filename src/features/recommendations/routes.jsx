import React from 'react'
import { Route, Switch } from 'react-router-dom'
import OnboardedRoutesWrapper from 'components/routes/onboarded-routes-wrapper'
//Pages
import RecommendationsContainer from './containers/recommendations'
import DateSelectorContainer from './containers/date-selector'
import FiltersContainer from './containers/filters'
import LocationContainer from './containers/location'
import PassportCountriesContainer from './containers/passport-countries'
import MapContainer from './containers/map'

const Routes = () => (
  <Switch>
    <Route path="/recommendations">
      <OnboardedRoutesWrapper>
        <RecommendationsContainer />
        <Switch>
          <Route path="/recommendations/date">
            <DateSelectorContainer />
          </Route>
          <Route path="/recommendations/location">
            <LocationContainer />
          </Route>
          <Route path="/recommendations/passport">
            <PassportCountriesContainer />
          </Route>
          <Route path="/recommendations/filters">
            <FiltersContainer />
          </Route>
          <Route path="/recommendations/analytics">
            <FiltersContainer />
          </Route>
          <Route path="/recommendations/map">
            <MapContainer />
          </Route>
        </Switch>
      </OnboardedRoutesWrapper>
    </Route>
  </Switch>
)
export default Routes
