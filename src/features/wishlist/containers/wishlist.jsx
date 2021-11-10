import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWishlist, removeFromWishlist, wishlistSelector } from '../slice'
import Content from 'features/recommendations/components/content'
import { profileSelector } from 'features/profile/slice'

const WishlistContainer = () => {
  const { wishlist, loading, wishlisted } = useSelector(wishlistSelector)

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


  return (
    <div className="flex-col">
      <Content
        loading={loading || profileLoading}
        recommendationId={wishlist.wishlistId}
        query={wishlist.query}
        recommendations={Object.values(wishlist)
          .map(w => ({ ...w.data }))}
        user={user}
        mapEnabled={true} wishlist={wishlist}
        wishlistedIds={wishlisted}
        toggleWishlist={removeFromWishlistHandler}
        noItemsMessage="There is nothing here. Not yet"
        title="Wishlist"
      />
    </div>
  )
}

export default WishlistContainer
