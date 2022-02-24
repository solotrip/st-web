import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomeContainer from './features/home/containers/home'
import AuthRoutes from './features/auth/routes'
import RecommendationRoutes from './features/recommendations/routes'
import NotificationRoutes from './features/notifications/routes'
import WishlistRoutes from './features/wishlist/routes'
import BrowseRoutes from './features/browse/routes'
import SavedRoutes from './features/track/routes'
import { OnboardingRoutes, SettingsRoute } from './features/preferences/routes'

import { Layout, Loader, MonthPicker } from 'components'
import BottomBar from './components/bottom-bar'
import SideBar from './components/sidebar'
// eslint-disable-next-line max-len
import DateSelectorContainer from './features/recommendations/containers/date-selector'
import { NotAuthenticatedRoute } from 'components'

/**
 * These routes are just for development purposes
 * They won't be displayed in production release.
 */
const DevRoutes = () => (
  <Switch>
    <Route path="/test/loading" component={Loader} exact />
    <Route path="/test/month-picker" exact>
      <MonthPicker onSelect={() => {}} defaultValue={[1, 2, 12]} />
    </Route>
    <Route path="/test/date-selector" exact>
      <DateSelectorContainer />
    </Route>
  </Switch>
)

const MainRoutes = () => {
  return (
    <Route
      path={[
        '/browse',
        '/recommendations',
        '/notifications',
        '/wishlist',
        '/saved',
        '/preferences'
      ]}
    >
      <Layout sidebar={<SideBar />} bottomBar={<BottomBar />}>
        <BrowseRoutes />
        <RecommendationRoutes />
        <NotificationRoutes />
        <WishlistRoutes />
        <SavedRoutes />
      </Layout>
    </Route>
  )
}

const Routes = () => (
  <Router>
    <Route path="/" exact>
      <NotAuthenticatedRoute component={HomeContainer} path="/" exact />
    </Route>
    <OnboardingRoutes />
    <AuthRoutes />
    <MainRoutes />
    <SettingsRoute />
    <Route path="/404">404</Route>
    {process.env.NODE_ENV === 'development' && <DevRoutes />}
  </Router>
)
export default Routes
