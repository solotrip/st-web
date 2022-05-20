import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as RecommendationApi from 'api/recommendation'
import _get from 'lodash/get'
import _zipObject from 'lodash/zipObject'
import _keyBy from 'lodash/keyBy'


export const addToWishlist = createAsyncThunk(
  'wishlist/add',
  async ({ query, recommendation }) => {
    return RecommendationApi.addToWishlist({
      start: recommendation.startDate,
      end: recommendation.endDate,
      lat: query.lat,
      lon: query.lon,
      passports: query.passports,
      areaSid: recommendation.sid
    })
  }
)

export const removeFromWishlist = createAsyncThunk(
  'wishlist/remove',
  async (recommendation, { getState, rejectWithValue }) => {
    const { ridToWishlistId } = wishlistSelector(getState())
    const wishlistId = ridToWishlistId[recommendation.id]
    if (wishlistId) {
      try {
        await RecommendationApi.removeFromWishlist(wishlistId)
      } catch (e) {
        return rejectWithValue({ wishlistId, error: e })
      }

      return { wishlistId }
    }
    return null
  }
)

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetch',
  async () => {
    const response = await RecommendationApi.getWishlist()
    return _keyBy(response, 'wishlistId')
  }
)

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: {},
    wishlisted: {},
    ridToWishlistId: {},
    initialized: false,
    loading: false,
    error: null
  },
  extraReducers: {
    [addToWishlist.fulfilled]: (state, action) => {
      state.wishlist[action.payload.wishlistId] = action.payload
      state.wishlisted[_get(action.meta.arg, 'recommendation.id')]
        = action.payload.wishlistId
      state.ridToWishlistId[_get(action.meta.arg, 'recommendation.id')]
        = action.payload.wishlistId

      state.loading = false
    },
    [addToWishlist.rejected]: (state, action) => {
      state.error = _get(
        action.error,
        'response.data',
        action.error.toString()
      )
      state.loading = false
      state.wishlisted
        [_get(
          state.wishlist[action.meta.arg], 'recommendation.id')
        ] = false
    },
    [addToWishlist.pending]: (state, action) => {
      state.loading = true
      state.error = null
      state.wishlisted[_get(action.meta.arg, 'recommendation.id')] = true
    },
    [removeFromWishlist.pending]: (state, action) => {
      const rid = _get(action.meta.arg, 'id')
      if (rid) {
        state.wishlisted[rid] = false
      }
      state.loading = true
      state.error = null
    },
    [removeFromWishlist.fulfilled]: (state, action) => {
      state.loading = false
      if (action.payload === null) {
        return
      }
      delete state.wishlist[action.payload.wishlistId]
    },
    [removeFromWishlist.rejected]: (state, action) => {
      const rid = _get(action.meta.arg, 'id')
      state.wishlisted[rid] = true
      state.error = _get(
        action.error,
        'response.data',
        action.error.toString()
      )
      state.loading = false
    },

    [fetchWishlist.fulfilled]: (state, action) => {
      if (action.payload === null) return
      state.wishlist = action.payload
      state.wishlisted = _zipObject(
        Object.values(action.payload).map(r => r.data.id),
        Object.values(action.payload).map(r => true))
      state.ridToWishlistId = _zipObject(
        Object.values(action.payload).map(r => r.data.id),
        Object.values(action.payload).map(r => r.wishlistId))
      state.loading = false
      state.initialized = true
    },
    [fetchWishlist.rejected]: (state, action) => {
      state.error = _get(
        action.error,
        'response.data',
        action.error.toString()
      )
      state.loading = false
      state.initialized = false
    },
    [fetchWishlist.pending]: state => {
      state.loading = true
      state.error = null
    }
  }
})

// Action creators are generated for each case reducer function
export const wishlistSelector = state => state.wishlist

export default wishlistSlice.reducer
