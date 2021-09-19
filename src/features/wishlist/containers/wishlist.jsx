import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from 'components'
import {
  fetchAvailableDates,
  recommendationsSelector,
  updateActiveDate
} from '../../recommendations/slice'

import { wishlistSelector } from '../slice'
import Content from '../../recommendations/components/content'
import Header from '../../notifications/components/header'
import { profileSelector } from '../../profile/slice'

const WishlistContainer = () => {
  const {
    recommendations,
    loadingRecommendations,
    availableDates,
    loadingAvailableDates,
    activeDateIndex
  } = useSelector(recommendationsSelector)

  const { wishlist } = useSelector(wishlistSelector)

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
          headerName="Wishlist"
        />
      </Loader>
      <Loader loading={loadingRecommendations}>
        <Content recommendations={wishlist} user={user} mapEnabled={true} />
      </Loader>
    </Loader>
  )
}

export default WishlistContainer
