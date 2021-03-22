import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavbarComponent from '../components/navbar'
import { initialize } from 'features/auth/slice'

const NavbarContainer = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialize())
  }, [dispatch])
  const { loading, loggedIn } = useSelector(
    state => state.auth
  )

  return (
    <NavbarComponent loading={loading} isLoggedIn={loggedIn}/>
  )
}

export default NavbarContainer
