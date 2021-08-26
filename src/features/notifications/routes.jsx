import React from "react";
import { Route, Switch } from "react-router-dom";
import OnboardedRoutesWrapper from "components/routes/onboarded-routes-wrapper";
//Pages
import NotificationsContainer from "./containers/notifications";

const Routes = () => (
  <Switch>
    <Route path="/notifications">
      <OnboardedRoutesWrapper>
        <NotificationsContainer />
      </OnboardedRoutesWrapper>
    </Route>
  </Switch>
);
export default Routes;
