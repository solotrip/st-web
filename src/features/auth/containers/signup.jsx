import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithApple, loginWithGoogle, register } from '../slice'
import SignupPage from '../components/signup'
import { useHistory } from 'react-router-dom'

const SignupContainer = () => {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)
  const history = useHistory()

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
            history
          })
        )
      }
      loginWithApple={() => dispatch(loginWithApple({ history }))}
      loginWithGoogle={() => dispatch(loginWithGoogle({ history }))}
    />
  )
}

export default SignupContainer
