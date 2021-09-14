import React from 'react'
import { Route, Switch } from 'react-router-dom'
import OnboardedRoutesWrapper from 'components/routes/onboarded-routes-wrapper'
//Pages
import SavedContainer from './containers/saved'


const Routes = () => (
  <Switch>
    <Route path="/saved">
      <OnboardedRoutesWrapper>
        <SavedContainer/>
      </OnboardedRoutesWrapper>
    </Route>
  </Switch>
)
export default Routes
