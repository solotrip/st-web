import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWishlist, removeFromWishlist, wishlistSelector } from '../slice'
import Content from 'features/recommendations/components/content'
import { profileSelector } from 'features/profile/slice'

const WishlistContainer = () => {
  const { wishlist, loading } = useSelector(wishlistSelector)

  const { data: user, loading: profileLoading } = useSelector(profileSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchWishlist())
  }, [dispatch])


  const removeFromWishlistHandler = useCallback(({
    recommendationId
  }) => {
    dispatch(removeFromWishlist(recommendationId))
  }, [dispatch])


  return (
    <div className="flex-col">
      <Content
        loading={loading || profileLoading}
        recommendations={wishlist.map(w => ({ ...w.data, wishlisted: true }))}
        user={user}
        mapEnabled={true} wishlist={wishlist}
        toggleWishlist={removeFromWishlistHandler}
        noItemsMessage="There is nothing here. Not yet"
        title="Wishlist"
      />
    </div>
  )
}

export default WishlistContainer
