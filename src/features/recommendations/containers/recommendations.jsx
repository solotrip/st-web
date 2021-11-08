import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'utils/hooks/use-query'
import { fetchRecommendations, recommendationsSelector } from '../slice'
import { profileSelector } from '../../profile/slice'
import {
  addToWishlist,
  fetchWishlist,
  wishlistSelector
} from '../../wishlist/slice'
import Header from '../components/header'
import Content from '../components/content'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'qs'
import { locationSelector } from './location/slice'

const RecommendationsContainer = () => {
  const query = useQuery()
  const location = useLocation()
  const history = useHistory()
  const {
    recommendations,
    activeRecommendationId,
    loadingRecommendations
  } = useSelector(recommendationsSelector)
  const { wishlist, loading: wishlistLoading } = useSelector(wishlistSelector)
  const { data: user, loading: profileLoading } = useSelector(profileSelector)
  const { coordinates } = useSelector(locationSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchWishlist())
  }, [dispatch])

  useEffect(() => {
    if (location.pathname === '/recommendations') {
      if (!query.start && !query.months)
        return openDateSheet(query)
      if ((!query.lat || !query.lon)) {
        if (coordinates) {
          return history.replace({
            pathname: '/recommendations',
            search: qs.stringify({
              ...query,
              lat: coordinates.latitude,
              lon: coordinates.longitude
            })
          })
        }
        return openLocationSheet(query)
      }

      dispatch(fetchRecommendations(query))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, location, dispatch]
  )

  const toggleWishlist = useCallback(({ query, recommendationId, sid }) => {
    // TODO: Handle removing from wishlist
    // if (wishlisted) {
    //   dispatch(removeFromWishlist(recommendationId))
    // } else {
    dispatch(addToWishlist({ query, areaSid: sid }))
    // }
  }, [dispatch])

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
  const loading = profileLoading
    || loadingRecommendations
    || !activeRecommendationId || wishlistLoading
  return (
    <>

      <div className="flex-col">

        <Header
          recommendationId={activeRecommendationId}
          loading={loading}
        />
        <Content
          loading={loading}
          recommendations={
            !loading && recommendations[activeRecommendationId].recommendations
          }
          recommendationId={activeRecommendationId} user={user}
          query={query}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />


      </div>

    </>
  )
}

export default RecommendationsContainer
