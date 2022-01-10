import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWishlist, removeFromWishlist, wishlistSelector } from '../slice'
import Content from 'features/recommendations/components/content'
import { profileSelector } from 'features/profile/slice'
import qs from 'qs'
import { useLocation } from 'react-router-dom'
import Header from '../../recommendations/components/header'

const WishlistContainer = () => {
  const { wishlist, loading, wishlisted } = useSelector(wishlistSelector)
  const location = useLocation()
  const { data: user, loading: profileLoading } = useSelector(profileSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchWishlist())
  }, [dispatch])


  const removeFromWishlistHandler = useCallback(({
    recommendation
  }) => {
    dispatch(removeFromWishlist(recommendation))
  }, [dispatch])
  const recommendations = Object.values(wishlist)
    .map(w => ({ ...w.data, recommendationId: w.wishlistId }))

  const detailIndex = !loading &&
  location.pathname.startsWith('/wishlist/r/') ?
    recommendations.findIndex(
      r => r.id === location.pathname.split('/wishlist/r/')[1]
    ) :
    -1
  return (
    <div className="flex-col">
      {detailIndex !== -1 && (
        <Header
          searchIsVisible={false}
          loading={loading}
          defaultExpanded={false}
          basePath="/wishlist"
        />
      )}
      <Content
        loading={loading || profileLoading}
        // Put wishlist id in recommendation data
        // so that we can use it to get query and add to wishlist actions
        recommendations={recommendations}
        user={user}
        queryFunction={recommendation => ({
          query: recommendation &&
            wishlist[recommendation.recommendationId].query,
          queryString: recommendation &&
            qs.stringify(wishlist[recommendation.recommendationId].query)
        })}
        mapEnabled
        wishlist={wishlist}
        detailIndex={detailIndex}
        wishlistedIds={wishlisted}
        toggleWishlist={removeFromWishlistHandler}
        noItemsMessage="There is nothing here. Not yet"
        title="Wishlist"
        basePath="/wishlist"
      />
    </div>
  )
}

export default WishlistContainer
