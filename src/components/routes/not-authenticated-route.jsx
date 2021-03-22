import { Redirect, Route } from 'react-router-dom'
import React from 'react'

const NotAuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !localStorage.getItem('accessToken') ? (
        <Component {...props} />
      ) : (
        <Redirect to='/'/>
      )
    }
  />
)

export default NotAuthenticatedRoute
