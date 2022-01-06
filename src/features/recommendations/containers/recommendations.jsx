import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'utils/hooks/use-query'

import { fetchRecommendations, recommendationsSelector } from '../slice'
import { profileSelector } from '../../profile/slice'
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
  wishlistSelector
} from '../../wishlist/slice'
import { save, saveMonths, querySelector } from '../../query/slice'
import Header from '../components/header'
import Content from '../components/content'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'qs'
import { locationSelector, fillLocationData } from './location/slice'

const RecommendationsContainer = () => {
  const query = useQuery()
  const location = useLocation()
  const history = useHistory()
  const {
    recommendations,
    activeRecommendationId,
    loadingRecommendations
  } = useSelector(recommendationsSelector)
  const { wishlisted } = useSelector(wishlistSelector)
  const { queryMonths: stateMonths } = useSelector(querySelector)
  const { data: user, loading: profileLoading } = useSelector(profileSelector)
  const { activeLocation, locations } = useSelector(locationSelector)
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(save(qs.stringify(query)))
      if (query.months) {
        dispatch(saveMonths(query.months))
      }
    },
    [query, dispatch]
  )

  useEffect(
    () => {
      dispatch(fetchWishlist())
    },
    [dispatch]
  )

  useEffect(
    () => {
      if (location.pathname === '/recommendations') {
        if (!query.start && !query.months && !stateMonths)
          return openDateSheet(query)
        if (!query.months && stateMonths) query.months = stateMonths
        if (!query.lat || !query.lon) {
          if (activeLocation) {
            return history.replace({
              pathname: '/recommendations',
              search: qs.stringify({
                ...query,
                lat: locations[activeLocation].lat,
                lon: locations[activeLocation].lon
              })
            })
          }
          return openLocationSheet(query)
        }

        if (query.lat && query.lon && activeLocation === '') {
          dispatch(fillLocationData({ lat: query.lat, lon: query.lon }))
        }

        dispatch(fetchRecommendations(query))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, location, dispatch]
  )

  const toggleWishlist = useCallback(
    ({ query, recommendationId, recommendation }) => {
      if (wishlisted[recommendation.id]) {
        dispatch(removeFromWishlist(recommendation))
      } else {
        dispatch(addToWishlist({ query, recommendation }))
      }
    },
    [dispatch, wishlisted]
  )

  const openDateSheet = q => {
    history.replace({
      pathname: '/recommendations/date',
      search: qs.stringify(q)
    })
  }

  const openLocationSheet = q => {
    history.replace({
      pathname: '/recommendations/location',
      search: qs.stringify(q)
    })
  }

  const loading =
    profileLoading || loadingRecommendations || !activeRecommendationId
  return (
    <>
      <div className="flex-col">
        <Header
          recommendationId={activeRecommendationId}
          loading={loading}
          defaultExpanded={true}
        />

        <Content
          loading={loading}
          recommendations={
            !loading && recommendations[activeRecommendationId].recommendations
          }
          recommendationId={activeRecommendationId}
          user={user}
          query={query}
          wishlistedIds={wishlisted}
          toggleWishlist={toggleWishlist}
        />
      </div>
    </>
  )
}

export default RecommendationsContainer
