import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import EventInterestsContainer from "./containers/event-interests";
import OnboardingContainer from "./containers/onboarding";
import OnboardedRoutesWrapper from "components/routes/onboarded-routes-wrapper";
import ActivityInterestsContainer from "./containers/activity-interests";
import DatesContainer from "./containers/dates/index";
import SettingsContainer from "./containers/settings";
import PreferencesContainer from "./containers/preferences";
import OnboardingPage from "./components/onboarding-page";
import PreferencesPage from "./components/preferences-page";
import OnboardingCompleteContainer from "./containers/onboarding-complete";

export const PreferencesRoutes = () => (
  <Route path="/:path/preferences/:index">
    <OnboardedRoutesWrapper>
      <PreferencesContainer page={PreferencesPage}>
        <Switch>
          {/* <Route path="/recommendations/preferences/1">
            <EventInterestsContainer />
          </Route>
          <Route path="/recommendations/preferences/2">
            <ActivityInterestsContainer />
          </Route>*/}
          <Route path="/recommendations/preferences/1">
            <DatesContainer />
          </Route>
          <Route path="/recommendations/preferences/2">
            <SettingsContainer showLogout />
          </Route>
        </Switch>
      </PreferencesContainer>
    </OnboardedRoutesWrapper>
  </Route>
);

export const OnboardingRoutes = () => (
  <Route path="/onboarding/:index">
    <OnboardingContainer>
      <PreferencesContainer page={OnboardingPage} isOnboarding>
        <Switch>
          <Route path="/onboarding/1">
            <EventInterestsContainer />
          </Route>
          <Route path="/onboarding/2">
            <ActivityInterestsContainer />
          </Route>
          <Route path="/onboarding/3">
            <DatesContainer />
          </Route>
          <Route path="/onboarding/4">
            <SettingsContainer />
          </Route>
          <Route path="/onboarding/5">
            <OnboardingCompleteContainer />
          </Route>
        </Switch>
      </PreferencesContainer>
    </OnboardingContainer>
  </Route>
);
