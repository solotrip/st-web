import React, { Suspense, useEffect } from 'react'
import { Provider } from 'react-redux'
import Routes from './routes'
import store from './store'
import useThemeState, {
  DARK_CLASS,
  LIGHT_CLASS,
  NO_PREF_CLASS
} from 'utils/hooks/use-theme-state'
import { Loader } from 'components'
import './styles/global.scss'
import './i18n/i18n'


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
          <Routes/>
        </Provider>
      </Suspense>
    </React.StrictMode>
  )
}

export default App
