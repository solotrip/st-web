import React from 'react'
import { NotAuthenticatedRoute, SheetWrapper } from 'components'
import LoginContainer from 'features/auth/containers/login'
import SignupContainer from 'features/auth/containers/signup'
import { Switch } from 'react-router-dom'
import SettingsSection from 'components/settings-section'

const Routes = () => (
  <Switch>
    <NotAuthenticatedRoute
      path="/:path/login"
      children={
        <SheetWrapper>
          <SheetWrapper.Content>
            <SettingsSection>
              <LoginContainer />{' '}
            </SettingsSection>
          </SheetWrapper.Content>
        </SheetWrapper>
      }
    />
    <NotAuthenticatedRoute
      path="/:path/signup"
      children={
        <SheetWrapper>
          <SheetWrapper.Content>
            <SettingsSection>
              <SignupContainer authWall />
            </SettingsSection>
          </SheetWrapper.Content>
        </SheetWrapper>
      }
    />
    <NotAuthenticatedRoute path="/login" children={<LoginContainer />} />
    <NotAuthenticatedRoute path="/signup" children={<SignupContainer />} />
  </Switch>
)
export default Routes
