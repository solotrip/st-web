import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Routes from './routes'
import store from './store'
import useThemeState, {
  DARK_CLASS,
  LIGHT_CLASS,
  NO_PREF_CLASS
} from 'utils/hooks/use-theme-state'
import { ToastContainer } from 'react-toastify'
import { Loader } from 'components'
import './styles/global.scss'
// import './i18n/i18n'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import 'utils/firebase'

// Import css files
import 'react-image-shadow/assets/index.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'swiper/swiper.min.css'

const App = () => {
  // Set the theme if user has changed it
  const [appTheme] = useThemeState()
  useEffect(() => {
    if (appTheme === DARK_CLASS) {
      document.documentElement.classList.add(DARK_CLASS)
      document.documentElement.classList.remove(LIGHT_CLASS)
    } else if (appTheme === LIGHT_CLASS) {
      document.documentElement.classList.remove(DARK_CLASS)
      document.documentElement.classList.add(LIGHT_CLASS)
    } else if (appTheme === NO_PREF_CLASS) {
      document.documentElement.classList.remove(DARK_CLASS)
      document.documentElement.classList.remove(LIGHT_CLASS)
    }
  }, [appTheme])

  return (
    <React.StrictMode>
      <Suspense fallback={<Loader/>}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={ persistStore(store)}>
            <Routes/>
            {ReactDOM.createPortal(<ToastContainer
              position={'bottom-right'}
              theme={appTheme === LIGHT_CLASS ? 'light' : 'dark'}
            />, document.body)}
          </PersistGate>
        </Provider>
      </Suspense>
    </React.StrictMode>
  )
}

export default App
