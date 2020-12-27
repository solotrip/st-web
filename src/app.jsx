import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import Routes from './routes'
import store from './store'
import './styles/global.scss'

import './i18n/i18n'

const App = () => {
  return (
    <React.StrictMode>
      <Suspense fallback={null}>
        <Provider store={store}>
          <Routes />
        </Provider>
      </Suspense>
    </React.StrictMode>
  )
}

export default App
