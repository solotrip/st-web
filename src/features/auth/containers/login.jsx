import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, loginWithApple, loginWithGoogle } from '../slice'
import LoginPage from '../components/login'
import { useHistory } from 'react-router-dom'

const LoginContainer = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { error } = useSelector(state => state.auth)
  return (
    <LoginPage
      loginFunc={({ email, password }) => {
        dispatch(login({ email, password, history }))
      }}
      loginWithApple={() => dispatch(loginWithApple({ history }))}
      loginWithGoogle={() => dispatch(loginWithGoogle({ history }))}
      error={error}
    />
  )
}

export default LoginContainer
