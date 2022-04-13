import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithApple, loginWithGoogle, register } from '../slice'
import SignupPage from '../components/signup'
import { useHistory, useLocation } from 'react-router-dom'

const SignupContainer = ({ authWall }) => {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)
  const history = useHistory()
  const location = useLocation()
  const redirectTo = authWall ? {
    pathname: location.pathname.replace('/signup', ''),
    search: location.search
  } : '/browse'
  return (
    <SignupPage
      error={error}
      registerFunc={({ name, username, email, password }) =>
        dispatch(
          register({
            name,
            username,
            email,
            password,
            history,
            redirectTo
          })
        )
      }
      loginWithApple={() => dispatch(loginWithApple({ history }))}
      loginWithGoogle={() => dispatch(loginWithGoogle({ history }))}
      authWall={authWall}
    />
  )
}

export default SignupContainer
