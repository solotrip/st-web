import { Redirect, Route } from 'react-router-dom'
import React from 'react'
import { getIsGuest } from '../../utils/auth'

const NotAuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      getIsGuest() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/recommendations"/>
      )
    }
  />
)

export default NotAuthenticatedRoute
