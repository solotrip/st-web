import React from 'react'
import { Route } from 'react-router-dom'
import OnboardedRoutesWrapper from 'components/routes/onboarded-routes-wrapper'
//Pages
import BrowseContainer from './containers/browse'

const Routes = () => (
  <Route path="/browse">
    <OnboardedRoutesWrapper>
      <BrowseContainer />
    </OnboardedRoutesWrapper>
  </Route>
)
export default Routes
