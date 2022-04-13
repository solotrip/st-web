import React from 'react'
import { Route, Switch } from 'react-router-dom'
import OnboardingContainer from './containers/onboarding'
import OnboardedRoutesWrapper from 'components/routes/onboarded-routes-wrapper'
import AreaClusterContainer from './containers/area-cluster'
import SettingsContainer from './containers/settings'
import PreferencesContainer from './containers/preferences'
import OnboardingPage from './components/onboarding-page'
import PreferencesPage from './components/preferences-page'
import OnboardingCompleteContainer from './containers/onboarding-complete'

export const SettingsRoute = () => (
  <Route path="/:path/preferences">
    <OnboardedRoutesWrapper>
      <PreferencesContainer page={PreferencesPage} isSettings>
        <SettingsContainer showLogout />
      </PreferencesContainer>
    </OnboardedRoutesWrapper>
  </Route>
)

export const OnboardingRoutes = () => (
  <Route path="/onboarding/:index">
    <OnboardingContainer>
      <PreferencesContainer page={OnboardingPage}>
        <Switch>
          <Route path="/onboarding/1">
            <AreaClusterContainer />
          </Route>
          <Route path="/onboarding/2">
            <OnboardingCompleteContainer />
          </Route>
        </Switch>
      </PreferencesContainer>
    </OnboardingContainer>
  </Route>
)
