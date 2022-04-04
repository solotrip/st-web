import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthRoutes from './features/auth/routes'
import RecommendationRoutes from './features/recommendations/routes'
import NotificationRoutes from './features/notifications/routes'
import WishlistRoutes from './features/wishlist/routes'
import BrowseRoutes from './features/browse/routes'
import SavedRoutes from './features/track/routes'
import { OnboardingRoutes, SettingsRoute } from './features/preferences/routes'
import { Helmet } from 'react-helmet'

import { BottomBar, Layout, Loader, MonthPicker, NotAuthenticatedRoute, SideBar } from 'components'
import DateSelectorContainer from 'features/recommendations/containers/date-selector'
import WelcomeContainer from 'features/welcome/containers'

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
    <Helmet>
      <title>
        Pulfy - Get personalized travel recommendations, updates, restrictions and much more.
      </title>
      <meta
        name="description"
        // eslint-disable-next-line max-len
        content="Get travel updates and recommendations based on restrictions, requirements, events, festivals, costs, weather and much more"
      />
      <meta name="twitter:card" content="app" />
      <meta
        name="twitter:image"
        content="https://ik.imagekit.io/stmedia/logo_o3TcRoTaq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1648556830533"
      />
      <meta
        name="twitter:title"
        content="Pulfy - Get personalized travel recommendations, updates, restrictions
          and much more."
      />
      <meta name="twitter:creator" content="@pulfycom" />
      <meta name="twitter:site" content="@pulfycom" />
      <meta
        name="twitter:description"
        // eslint-disable-next-line max-len
        content="Get travel updates and recommendations based on restrictions, requirements, events, festivals, costs, weather and much more."
      />
      <meta name="twitter:app:country" content="US" />
      <meta name="twitter:app:name:iphone" content="Pulfy" />
      <meta name="twitter:app:id:iphone" content="929750075" />
      <meta name="twitter:app:url:iphone" content="cannonball://poem/5149e249222f9e600a7540ef" />
      <meta name="twitter:app:name:ipad" content="Pulfy" />
      <meta name="twitter:app:id:ipad" content="929750075" />
      <meta name="twitter:app:url:ipad" content="cannonball://poem/5149e249222f9e600a7540ef" />
      <meta name="twitter:app:name:googleplay" content="Pulfy" />
      <meta name="twitter:app:id:googleplay" content="io.fabric.samples.cannonball" />
      <meta
        name="twitter:app:url:googleplay"
        content="http://cannonball.fabric.io/poem/5149e249222f9e600a7540ef"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="http://pulfy.com" />
      <meta
        property="og:title"
        content="Pulfy - Get personalized travel recommendations, updates, restrictions
          and much more."
      />
      <meta
        property="og:description"
        content="Get travel updates and recommendations based on restrictions, requirements, events, festivals, costs, weather and much more."
      />
      <meta
        property="og:image"
        content="https://ik.imagekit.io/stmedia/logo_o3TcRoTaq.png?ik-sdk-version=javascript-1.4.3&updatedAt=1648556830533"
      />
    </Helmet>

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
