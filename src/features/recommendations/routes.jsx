import React from "react";
import { Route, Switch } from "react-router-dom";
//Pages
import RecommendationsContainer from "./containers/recommendations/recommendations";

const Routes = () => (
  <Switch>
    <Route path="/recommendations" component={RecommendationsContainer} />
  </Switch>
);
export default Routes;
