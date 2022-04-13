import React from 'react'
import { Route, Switch } from 'react-router-dom'
import OnboardedRoutesWrapper from 'components/routes/onboarded-routes-wrapper'
//Pages
import WishlistContainer from './containers/wishlist'

const Routes = () => (
  <Switch>
    <Route path="/wishlist">
      <OnboardedRoutesWrapper registeredOnly>
        <WishlistContainer />
      </OnboardedRoutesWrapper>
    </Route>
  </Switch>
)
export default Routes
