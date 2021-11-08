import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as RecommendationApi from 'api/recommendation'
import _ from 'lodash'


export const addToWishlist = createAsyncThunk(
  'wishlist/add',
  async ({ query, areaSid }) => {
    return RecommendationApi.addToWishlist({ ...query, areaSid })
  }
)

export const removeFromWishlist = createAsyncThunk(
  'wishlist/remove',
  async wishlistId => {
    await RecommendationApi.removeFromWishlist(wishlistId)
    return { wishlistId }
  }
)

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetch',
  async (_, { getState }) => {
    const { wishlist, initialized } = wishlistSelector(getState())
    if (initialized) {
      return wishlist
    }
    return RecommendationApi.getWishlist()
  }
)

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: [],
    initialized: false,
    loading: false,
    error: null
  },
  extraReducers: {
    [addToWishlist.fulfilled]: (state, action) => {
      state.wishlist = [...state.wishlist, action.payload]
      state.loading = false
    },
    [addToWishlist.rejected]: (state, action) => {
      state.error = _.get(
        action.error,
        'data',
        action.error.toString()
      )
      state.loading = false
    },
    [addToWishlist.pending]: state => {
      state.loading = true
      state.error = null
    },
    [removeFromWishlist.fulfilled]: (state, action) => {
      state.wishlist = state
        .wishlist.filter(w => w.wishlistId !== action.payload.wishlistId)
      state.loading = false
    },
    [removeFromWishlist.rejected]: (state, action) => {
      state.error = _.get(
        action.error,
        'data',
        action.error.toString()
      )
      state.loading = false
    },
    [removeFromWishlist.pending]: state => {
      state.loading = true
      state.error = null
    },
    [fetchWishlist.fulfilled]: (state, action) => {
      state.wishlist = action.payload
      state.loading = false
    },
    [fetchWishlist.rejected]: (state, action) => {
      state.error = _.get(
        action.error,
        'data',
        action.error.toString()
      )
      state.loading = false
      state.initialized = false
    },
    [fetchWishlist.pending]: state => {
      state.loading = true
      state.error = null
      state.initialized = true
    }
  }
})

// Action creators are generated for each case reducer function
export const wishlistSelector = state => state.wishlist

export default wishlistSlice.reducer
