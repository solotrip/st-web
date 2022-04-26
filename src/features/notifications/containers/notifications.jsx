import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from 'components'
import Content from '../components/content'
import { fetchNotifications, notificationsSelector } from '../slice'
import { registerDevice } from 'utils/notification'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'utils/hooks/use-query'

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
        <Loader loading={notificationsLoading}>
          <Content
            notifications={notifications}
            queryFunction={() => ({
              query,
              queryString: location.search
            })}
          />
        </Loader>
      </div>
    </>
  )
}

export default NotificationsContainer
