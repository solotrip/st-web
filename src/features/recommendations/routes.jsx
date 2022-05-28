import React from 'react'
import { Route, Switch } from 'react-router-dom'
import OnboardedRoutesWrapper from 'components/routes/onboarded-routes-wrapper'
//Pages
import RecommendationsContainer from './containers/recommendations'
import DateSelectorContainer from './containers/date-selector'
import FiltersContainer from './containers/filters'
import LocationContainer from './containers/location'
import PassportCountriesContainer from './containers/passport-countries'
import ShareContainer from './containers/share'
import ShareListContainer from './containers/share/list'
import DestinationContainer from './containers/destination'

const Routes = () => (
  <Switch>
    <Route path="/recommendations">
      <OnboardedRoutesWrapper>
        <RecommendationsContainer />
        <Switch>
          {/*
            DO NOT ADD ANY PATH THAT HAS 6 LENGTH e.g.
            /recommendations/6chars
            BECAUSE SHORT HASHES HAVE 6 CHARS
            AND WE CHECK IF WE USE SHORT HASH BY PATH LENGTH
          */}
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
          <Route path="/recommendations/r/:sid/:start/:end/share">
            <ShareContainer />
          </Route>
          <Route path="/recommendations/share">
            <ShareListContainer />
          </Route>
          <Route path="/recommendations/destination">
            <DestinationContainer />
          </Route>
        </Switch>
      </OnboardedRoutesWrapper>
    </Route>
  </Switch>
)
export default Routes
