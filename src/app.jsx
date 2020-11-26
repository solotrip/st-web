import React from 'react'
import { Provider } from 'react-redux'
import Routes from './routes'
import store from './store'
import './styles/global.scss'

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <Routes/>
      </Provider>
    </React.StrictMode>
  )
}

export default App
