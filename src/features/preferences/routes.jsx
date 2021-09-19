import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import EventInterestsContainer from './containers/event-interests'
import OnboardingContainer from './containers/onboarding'
import OnboardedRoutesWrapper from 'components/routes/onboarded-routes-wrapper'
import ActivityInterestsContainer from './containers/activity-interests'
import AreaClusterContainer from './containers/area-cluster'
import DatesContainer from './containers/dates/index'
import SettingsContainer from './containers/settings'
import PreferencesContainer from './containers/preferences'
import OnboardingPage from './components/onboarding-page'
import PreferencesPage from './components/preferences-page'
import OnboardingCompleteContainer from './containers/onboarding-complete'

export const PreferencesRoutes = () => (
  <Route path="/:path/query/:index">
    <OnboardedRoutesWrapper>
      <PreferencesContainer page={PreferencesPage}>
        <Switch>
          <Route path="/recommendations/query/1">
            <DatesContainer />
          </Route>
        </Switch>
      </PreferencesContainer>
    </OnboardedRoutesWrapper>
  </Route>
)

export const SettingsRoute = () => (
  <Route path="/:path/preferences">
    <OnboardedRoutesWrapper>
      <PreferencesContainer page={PreferencesPage} isSettings={true}>
        <SettingsContainer showLogout />
      </PreferencesContainer>
    </OnboardedRoutesWrapper>
  </Route>
)

export const OnboardingRoutes = () => (
  <Route path="/onboarding/:index">
    <OnboardingContainer>
      <PreferencesContainer page={OnboardingPage} isOnboarding>
        <Switch>
          {/*<Route path="/onboarding/1">
            <EventInterestsContainer />
          </Route>
          <Route path="/onboarding/2">
            <ActivityInterestsContainer />
</Route> */}
          <Route path="/onboarding/1">
            <DatesContainer />
          </Route>
          <Route path="/onboarding/2">
            {/*  WE ARE GOING TO PUT AREACLUSTERCONTAINER HERE! */}

            <AreaClusterContainer />
          </Route>
          <Route path="/onboarding/3">
            <OnboardingCompleteContainer />
          </Route>
        </Switch>
      </PreferencesContainer>
    </OnboardingContainer>
  </Route>
)
