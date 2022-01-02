import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from 'components'
import Content from '../components/content'
import { fetchNotifications, notificationsSelector } from '../slice'
import { registerDevice } from 'utils/notification'

const NotificationsContainer = () => {

  const {
    notifications,
    loading: notificationsLoading
  } = useSelector(notificationsSelector)
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(fetchNotifications())
      registerDevice()
    },
    [dispatch]
  )

  return (
        <Loader loading={notificationsLoading}>
            <Content notifications={notifications}/>
        </Loader>
  )
}

export default NotificationsContainer
