import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../slice'
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
    />
  )
}

export default SignupContainer
