import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthRoutes from './features/auth/routes'
import RecommendationRoutes from './features/recommendations/routes'
import NotificationRoutes from './features/notifications/routes'
import WishlistRoutes from './features/wishlist/routes'
import BrowseRoutes from './features/browse/routes'
import SavedRoutes from './features/track/routes'
import { OnboardingRoutes, SettingsRoute } from './features/preferences/routes'
import { BottomBar, Layout, Loader, MonthPicker, NotAuthenticatedRoute, SideBar } from 'components'
import { BrowseLayout } from 'components'
import DateSelectorContainer from 'features/recommendations/containers/date-selector'
import WelcomeContainer from 'features/welcome/containers'
import SEO from './seo'

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
    <>
      <Route path={['/recommendations', '/notifications', '/wishlist', '/saved', '/preferences']}>
        <Layout sidebar={<SideBar />} bottomBar={<BottomBar />}>
          <RecommendationRoutes />
          <NotificationRoutes />
          <WishlistRoutes />
          <SavedRoutes />
        </Layout>
      </Route>
      <Route path={['/browse']}>
        <BrowseLayout sidebar={<SideBar />} bottomBar={<BottomBar />}>
          <BrowseRoutes />
        </BrowseLayout>
      </Route>
    </>
  )
}

const Routes = () => (
  <Router basename={process.env.PUBLIC_URL}>
    {window.scrollTo(0, 1)}
    <SEO />
    <OnboardingRoutes />
    <AuthRoutes />
    <MainRoutes />
    <SettingsRoute />
    <Route path="/404">404</Route>
    <NotAuthenticatedRoute path="/" exact>
      <WelcomeContainer />
    </NotAuthenticatedRoute>
    {process.env.NODE_ENV === 'development' && <DevRoutes />}
  </Router>
)
export default Routes
