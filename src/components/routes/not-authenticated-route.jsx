import { Redirect, Route, useHistory } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialize } from 'features/auth/slice'
import { Loader } from 'components'

const NotAuthenticatedRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(initialize({ history, ensureAuth: false }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  const { loading, isAuthenticated, isGuest } = useSelector(
    state => state.auth
  )
  if (loading) {
    return <Loader/>
  }

  if(isAuthenticated && !isGuest) {
    return <Redirect to="/browse"/>
  }
  return (
    <Route
      {...rest}
      render={props =>
          <Component {...props} />
      }
    />
  )
}

export default NotAuthenticatedRoute
