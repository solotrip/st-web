import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'utils/hooks/use-query'

import { fetchRecommendations, recommendationsSelector } from '../slice'
import { profileSelector } from 'features/profile/slice'
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
  wishlistSelector
} from 'features/wishlist/slice'
import Header from '../components/header'
import Content from '../components/content'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'qs'

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
  const { data: user, loading: profileLoading } = useSelector(profileSelector)
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(fetchWishlist())
    },
    [dispatch]
  )

  useEffect(
    () => {
      if (
        location.pathname === '/recommendations' ||
        location.pathname.startsWith('/recommendations/r/')
      ) {
        if (!query.start && !query.months) return openDateSheet(query)
        if (!query.lat || !query.lon) {
          return openLocationSheet(query)
        }
        dispatch(fetchRecommendations(query))
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, location, dispatch]
  )

  const toggleWishlist = useCallback(
    ({ query, recommendation }) => {
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
  const detailIndex =
    !loading && location.pathname.startsWith('/recommendations/r/')
      ? recommendations[activeRecommendationId].recommendations.findIndex(
        r => r.id === location.pathname.split('/recommendations/r/')[1]
      )
      : !loading &&
      location.search.includes(
        'filters%5B0%5D%5Bid%5D=a&filters%5B0%5D%5Bvariables%5D%5BareaSids%5D%5B0%5D='
      ) &&
      location.search.split(
        'filters%5B0%5D%5Bid%5D=a&filters%5B0%5D%5Bvariables%5D%5BareaSids%5D%5B0%5D='
      )[1] &&
      location.search
        .split(
          'filters%5B0%5D%5Bid%5D=a&filters%5B0%5D%5Bvariables%5D%5BareaSids%5D%5B0%5D='
        )[1]
        .split('&') &&
      location.search
        .split(
          'filters%5B0%5D%5Bid%5D=a&filters%5B0%5D%5Bvariables%5D%5BareaSids%5D%5B0%5D='
        )[1]
        .split('&')[0]
        ? recommendations[activeRecommendationId].recommendations.findIndex(
          r =>
            r.sid ===
          location.search
            .split(
              'filters%5B0%5D%5Bid%5D=a&filters%5B0%5D%5Bvariables%5D%5BareaSids%5D%5B0%5D='
            )[1]
            .split('&')[0]
        )
        : -1

  return (
    <div className="flex-col">
      <Header
        recommendationId={activeRecommendationId}
        loading={loading}
        defaultExpanded={true}
        basePath="/recommendations"
      />
      <Content
        loading={loading}
        recommendations={
          !loading && recommendations[activeRecommendationId].recommendations
        }
        user={user}
        queryFunction={() => ({
          query,
          queryString: location.search
        })}
        wishlistedIds={wishlisted}
        toggleWishlist={toggleWishlist}
        detailIndex={detailIndex}
        basePath="/recommendations"
      />
    </div>
  )
}

export default RecommendationsContainer
