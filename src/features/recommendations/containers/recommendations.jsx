import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from 'utils/hooks/use-query'

import {
  fetchRecommendations,
  fetchRecommendationsWithShash,
  recommendationsSelector,
  resetActiveRecommendation
} from '../slice'
import { isGuestSelector, profileSelector } from 'features/profile/slice'
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
import _get from 'lodash/get'
import { isVisaFilterSelector } from './filters/slice'
import DetailHeader from '../components/detailHeader'

const RecommendationsContainer = () => {
  let query = useQuery()
  const location = useLocation()
  const history = useHistory()
  const {
    recommendations,
    activeRecommendationId,
    loadingRecommendations,
    errorRecommendations
  } = useSelector(recommendationsSelector)
  const { wishlisted } = useSelector(wishlistSelector)
  const { data: user, loading: profileLoading } = useSelector(profileSelector)
  const isVisaFilter = useSelector(isVisaFilterSelector)
  const isGuest = useSelector(isGuestSelector)
  const dispatch = useDispatch()

  const [isHeaderExpanded, setIsHeaderExpanded] = useState(true)
  const [lastScrollPos, setLastScrollPos] = useState(0)

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
        location.pathname.includes('/recommendations/r/')
      ) {
        dispatch(resetActiveRecommendation())
        if (!query.start && !query.months) return openDateSheet(query)
        //if (!query.lat || !query.lon) {
        //return openLocationSheet(query)
        //dispatch(fetchRecommendations(query))
        //}
        if (_get(query, 'filters', []).some(f => isVisaFilter(f.id)) && !query.passports) {
          return openPassportSheet(query)
        }
        dispatch(fetchRecommendations(query))
      }
      const r = /\/recommendations\/([^/]{6})/
      const matches = location.pathname.match(r)
      if (matches) {
        dispatch(fetchRecommendationsWithShash({ history, shash: matches[1] }))
      }
      setLastScrollPos(0)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, dispatch]
  )

  const toggleWishlist = ({ query, recommendation }) => {
    if (isGuest) {
      history.replace({
        pathname: `${location.pathname}/signup`,
        search: location.search
      })
      return
    }
    if (wishlisted[recommendation.id]) {
      dispatch(removeFromWishlist(recommendation))
    } else {
      dispatch(addToWishlist({ query, recommendation }))
    }
  }

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

  const openPassportSheet = q => {
    history.replace({
      pathname: '/recommendations/passport',
      search: qs.stringify(q)
    })
  }

  const handleScroll = e => {
    setIsHeaderExpanded(e.target.scrollTop === 0)
    if (detailIndex === -1 && activeRecommendationId) {
      setLastScrollPos(e.target.scrollTop)
    }
  }

  const loading = profileLoading || loadingRecommendations || !activeRecommendationId
  const detailIndex = !loading
    ? location.pathname.includes('/recommendations/r/')
      ? recommendations[activeRecommendationId].recommendations.findIndex(
        r => r.id === location.pathname.split('/recommendations/r/')[1]
      )
      : recommendations[activeRecommendationId].recommendations.length === 1 ? 0 : -1
    : -1

  return (
    <div className="flex-col">
      {detailIndex === -1 && (
        <Header
          recommendationId={activeRecommendationId}
          recommendationHash={!loading && recommendations[activeRecommendationId].hash}
          loading={loading}
          defaultExpanded={isHeaderExpanded}
          alwaysShowBack={detailIndex !== -1}
          basePath="/recommendations"
        />
      )}
      {detailIndex !== -1 && (
        <DetailHeader
          recommendationId={activeRecommendationId}
          recommendationHash={!loading && recommendations[activeRecommendationId].hash}
          loading={loading}
          defaultExpanded={isHeaderExpanded}
          alwaysShowBack={detailIndex !== -1}
          basePath="/recommendations"
        />
      )}
      <Content
        loading={loading}
        recommendations={!loading && recommendations[activeRecommendationId].recommendations}
        user={user}
        queryFunction={() => ({
          query,
          queryString: location.search
        })}
        query={query}
        wishlistedIds={wishlisted}
        toggleWishlist={toggleWishlist}
        detailIndex={detailIndex}
        basePath="/recommendations"
        error={errorRecommendations}
        handleScroll={handleScroll}
        initialScrollPos={detailIndex === -1 ? lastScrollPos : 0}
      />
    </div>
  )
}

export default RecommendationsContainer
