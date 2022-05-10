import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from 'components'
import Content from '../components/content'
import { fetchNotifications, notificationsSelector } from '../slice'
import { registerDevice } from 'utils/notification'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'utils/hooks/use-query'
import Header from 'features/recommendations/components/header'

const NotificationsContainer = () => {
  const query = useQuery()
  const location = useLocation()
  const { notifications, loading: notificationsLoading } = useSelector(notificationsSelector)
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(fetchNotifications())
      registerDevice()
    },
    [dispatch]
  )

  return (
    <>
      <div className="flex-col">
        <Header loading={notificationsLoading} basePath="/recommendations" />
        <Content
          loading={notificationsLoading}
          notifications={notifications}
          queryFunction={() => ({
            query,
            queryString: location.search
          })}
        />
      </div>
    </>
  )
}

export default NotificationsContainer
