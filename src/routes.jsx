import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeContainer from "./features/home/containers/home";
import AuthRoutes from "./features/auth/routes";
import RecommendationRoutes from "./features/recommendations/routes";
import NotificationRoutes from "./features/notifications/routes";
import {
  OnboardingRoutes,
  PreferencesRoutes,
} from "./features/preferences/routes";

import { Loader } from "components";

/**
 * These routes are just for development purposes
 * They won't be displayed in production release.
 */
const DevRoutes = () => (
  <Switch>
    <Route path="/test/loading" component={Loader} />
  </Switch>
);

const Routes = () => (
  <Router>
    <Route path="/" component={HomeContainer} exact />
    <OnboardingRoutes />
    <AuthRoutes />
    <RecommendationRoutes />
    <NotificationRoutes />
    <PreferencesRoutes />
    <Route path="/404">404</Route>

    {process.env.NODE_ENV === "development" && <DevRoutes />}
  </Router>
);
export default Routes;
