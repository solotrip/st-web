import React from 'react'
import { Route, Switch } from 'react-router-dom'
import OnboardedRoutesWrapper from 'components/routes/onboarded-routes-wrapper'
//Pages
import RecommendationsContainer from './containers/recommendations'

const Routes = () => (
  <Switch>
    <Route path="/recommendations">
      <OnboardedRoutesWrapper>
        <RecommendationsContainer />
      </OnboardedRoutesWrapper>
    </Route>
  </Switch>
)
export default Routes
