/* eslint-disable camelcase */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as RecommendationsApi from 'api/recommendation'
import { AREA_SID_FILTER_ID } from 'constants/index'
import qs from 'qs'
import { reformatQuery } from 'utils/recommendation'

export const fetchRecommendation = createAsyncThunk(
  'shareRecommendation/fetchRecommendation',
  async ({ areaSid, ...rest }) => {
    const payload = {
      ...rest,
      filters: [{ id: AREA_SID_FILTER_ID, variables: { areaSids: [areaSid] } }]
    }
    return await RecommendationsApi.getRecommendations(payload)
  }
)

export const fetchRecommendations = createAsyncThunk(
  'shareRecommendation/fetchRecommendations',
  async (
    { start, end, months, duration, weekendOnly, filters, lat, lon, passports },
    { getState }
  ) => {
    const payload = {
      start,
      end,
      months,
      duration,
      weekendOnly,
      filters,
      lat,
      lon,
      passports
    }
    const {
      activeRecommendationId,
      recommendations
    } = getState().recommendations
    if (
      activeRecommendationId &&
      qs.stringify(
        reformatQuery(recommendations[activeRecommendationId].query)
      ) === qs.stringify(payload)
    ) {
      return recommendations[activeRecommendationId]
    }
    return await RecommendationsApi.getRecommendations(payload)
  }
)

const shareRecommendationSlice = createSlice({
  name: 'shareRecommendation',
  initialState: {
    loading: false,
    error: null,
    recommendation: null,
    recommendations: null,
    recommendations_loading: null,
    recommendations_error: null
  },
  reducers: {
    resetActiveRecommendation: state => {
      state.recommendation = null
      state.loading = true
    }
  },
  extraReducers: {
    [fetchRecommendation.pending]: state => {
      state.error = null
      state.loading = true
      state.recommendation = null
    },
    [fetchRecommendation.fulfilled]: (state, action) => {
      state.recommendation = action.payload
      state.loading = false
    },
    [fetchRecommendation.rejected]: state => {
      state.error = true
      state.loading = false
    },
    [fetchRecommendations.pending]: state => {
      state.recommendations_error = null
      state.recommendations_loading = true
      state.recommendations = null
    },
    [fetchRecommendations.fulfilled]: (state, action) => {
      state.recommendations = action.payload
      state.recommendations_loading = false
    },
    [fetchRecommendations.rejected]: state => {
      state.recommendations_error = true
      state.recommendations_loading = false
    }
  }
})

export const shareRecommendationSelector = state => state.shareRecommendation
export default shareRecommendationSlice.reducer
