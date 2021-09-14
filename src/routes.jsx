import React from "react";
import { BrowserRouter as Router, Route, Switch,useLocation } from "react-router-dom";
import HomeContainer from "./features/home/containers/home";
import AuthRoutes from "./features/auth/routes";
import RecommendationRoutes from "./features/recommendations/routes";
import NotificationRoutes from "./features/notifications/routes";
import WishlistRoutes from "./features/wishlist/routes"
import SavedRoutes from "./features/saved/routes"
import {
  OnboardingRoutes,
  PreferencesRoutes,
} from "./features/preferences/routes";

import { Loader } from "components";
import BottomBar from "./components/bottom-bar"
import SideBar from "./components/sidebar"

/**
 * These routes are just for development purposes
 * They won't be displayed in production release.
 */
const DevRoutes = () => (
  <Switch>
    <Route path="/test/loading" component={Loader} />
  </Switch>
);

const MainRoutes =() => {
  const location = useLocation();
return (
  <>
  {location.pathname === '/recommendations' && <SideBar/>}
    {location.pathname === '/notifications' && <SideBar />}
    {location.pathname === '/wishlist' && <SideBar />}
    {location.pathname === '/saved' && <SideBar />}


  <RecommendationRoutes /> 
    <NotificationRoutes /> 
    <WishlistRoutes/>
    <SavedRoutes/>
    {location.pathname === '/recommendations' && <BottomBar />}
    {location.pathname === '/notifications' && <BottomBar />}
    {location.pathname === '/wishlist' && <BottomBar />}
    {location.pathname === '/saved' && <BottomBar />}

    </>)

}

const Routes = () => (
 
  <Router>
    <Route path="/" component={HomeContainer} exact />
    <OnboardingRoutes />
    <AuthRoutes />
    <MainRoutes/>
    <PreferencesRoutes />
    <Route path="/404">404</Route>
    {process.env.NODE_ENV === "development" && <DevRoutes />}
  </Router>
);
export default Routes;
