import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from 'components'
import {
  fetchAvailableDates,
  recommendationsSelector,
  updateActiveDate
} from '../../recommendations/slice'
import Content from '../components/content'
import Header from '../components/header'
import { profileSelector } from '../../profile/slice'

const NotificationsContainer = () => {
  const {
    loadingRecommendations,
    availableDates,
    loadingAvailableDates,
    activeDateIndex
  } = useSelector(recommendationsSelector)

  const notifications = [
    {
      dates: '28 June - 5 July',
      notificationText:
        'Visa restrictions for Malta has changed. Malta is visa free for you now.',
      notificationDetails: {
        image:
          'https://ik.imagekit.io/7zlqc1cmihe/menuitems/AirDrop-2_KOognXFyn.png?updatedAt=1617469757594',
        title: 'Malta Visa',
        subtitle: 'July 3 - ?'
      },
      hasSeen: false,
      sid: '1',
      timeStamp: '1 day ago'
    },
    {
      dates: '28 June - 5 July',
      notificationText: 'Oslo flights are 30% cheaper than usual now.',
      notificationDetails: {
        image:
          'https://ik.imagekit.io/7zlqc1cmihe/darkplane_6qiv8c4PG.svg?updatedAt=1629578118558',
        title: 'Oslo flights',
        subtitle: 'July 3 - 5'
      },
      hasSeen: false,
      sid: '1',
      timeStamp: '1 day ago'
    },
    {
      dates: '28 June - 5 July',
      notificationText: 'Berlin is a good idea for these dates',
      notificationDetails: {
        image:
          'https://images.unsplash.com/photo-1552553302-9211bf7f7053?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
        title: 'Berlinale International Film Festival',
        subtitle: 'July 3 - 5'
      },
      hasSeen: true,
      sid: '1',
      timeStamp: '1 day ago'
    },
    {
      dates: 'New Feature',
      notificationText:
        'Now you can import your Foursquare trips to get better recommendations.',
      notificationDetails: {
        image:
          'https://images.unsplash.com/photo-1552553302-9211bf7f7053?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
        title: 'Foursquare Import',
        subtitle: ''
      },
      hasSeen: true,
      sid: '1',
      timeStamp: '1 day ago'
    },
    {
      dates: 'New Feauture',
      notificationText: 'Now you can track flight prices.',
      notificationDetails: {
        image:
          'https://images.unsplash.com/photo-1552553302-9211bf7f7053?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
        title: 'Track Flight Prices',
        subtitle: ''
      },
      hasSeen: true,
      sid: '1',
      timeStamp: '1 day ago'
    },
    {
      dates: 'New Feature',
      notificationText:
        'Now you can import your Airbnb Trips to get better recommendations.',
      notificationDetails: {
        image:
          'https://images.unsplash.com/photo-1552553302-9211bf7f7053?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
        title: 'Airbnb Import',
        subtitle: ''
      },
      hasSeen: true,
      sid: '1',
      timeStamp: '1 day ago'
    }
  ]

  const { data: user, loading: profileLoading } = useSelector(profileSelector)
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(fetchAvailableDates())
    },
    [dispatch]
  )

  useEffect(
    () => {
      if (availableDates.length > 0) {
        dispatch(updateActiveDate(0))
      }
    },
    [dispatch, availableDates]
  )

  const onDateSelect = useCallback(
    index => {
      dispatch(updateActiveDate(index))
    },
    [dispatch]
  )

  return (
    <Loader loading={profileLoading}>
      <Loader loading={loadingAvailableDates}>
        <Header
          availableDates={availableDates}
          onSelect={onDateSelect}
          activeDateIndex={activeDateIndex}
          headerName="Notifications"
        />
      </Loader>
      <Loader loading={loadingRecommendations}>
        <Content notifications={notifications} user={user} />
      </Loader>
    </Loader>
  )
}

export default NotificationsContainer
