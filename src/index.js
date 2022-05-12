import React from 'react'
import { render } from 'react-dom'
import { WebpMachine } from 'webp-hero'
import App from './app'
const webpMachine = new WebpMachine()
webpMachine.polyfillDocument()

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    render(<NextApp />, document.getElementById('root'))
  })
}
render(<App />, document.getElementById('root'))
