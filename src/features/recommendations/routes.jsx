import React from 'react'
import { Route, Switch } from 'react-router-dom'
import OnboardedRoutesWrapper from 'components/routes/onboarded-routes-wrapper'
//Pages
import RecommendationsContainer from './containers/recommendations'
import DateSelectorContainer from './containers/date-selector'
import FiltersContainer from './containers/filters'
import LocationContainer from './containers/location'
import PassportCountriesContainer from './containers/passport-countries'

const Routes = () => (
  <Route path="/recommendations">
    <OnboardedRoutesWrapper>
      <RecommendationsContainer/>
      <Switch>
        <Route path="/recommendations/date">
          <DateSelectorContainer/>
        </Route>
        <Route path="/recommendations/location">
          <LocationContainer/>
        </Route>
        <Route path="/recommendations/passport">
          <PassportCountriesContainer/>
        </Route>
        <Route path="/recommendations/filters">
          <FiltersContainer/>
        </Route>
      </Switch>
    </OnboardedRoutesWrapper>
  </Route>
)
export default Routes
