import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../slice'
import SignupPage from '../components/alternative-signup-page'

const SignupContainer = () => {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])
  return (
    <SignupPage
      error={error}
      registerFunc={({ name, username, email, password }) =>
        dispatch(
          register({
            name,
            username,
            email,
            password
          })
        )
      }
    />
  )
}

export default SignupContainer
