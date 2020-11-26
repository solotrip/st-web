import React from 'react'
import { render } from 'react-dom'
import App from './app'

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    render(<NextApp/>, document.getElementById('root'))
  })
}

render(<App/>, document.getElementById('root'))
