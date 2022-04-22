import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as RecommendationsApi from 'api/recommendation'
import _get from 'lodash/get'
import qs from 'qs'
import { reformatQuery } from 'utils/recommendation'


export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetchRecommendations',
  async ({
    start,
    end,
    months,
    duration,
    weekendOnly,
    filters,
    lat,
    lon,
    passports
  }, { getState }) => {
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
    if (activeRecommendationId && qs.stringify(
      reformatQuery(recommendations[activeRecommendationId].query)) === qs.stringify(payload)
    ) {
      return recommendations[activeRecommendationId]
    }
    return await RecommendationsApi.getRecommendations(payload)
  }
)

export const fetchRecommendationsWithShash = createAsyncThunk(
  'recommendations/fetchWShash',
  async ({ shash, history }, { getState, dispatch }) => {
    const {
      activeRecommendationId,
      recommendations
    } = getState().recommendations
    if (activeRecommendationId &&
      recommendations[activeRecommendationId].shash === shash) {
      return recommendations[activeRecommendationId]
    }
    dispatch(resetActiveRecommendation())
    const res = await RecommendationsApi.getRecommendationsWithShash(shash)
    history.replace({
      pathname:  `/recommendations/${shash}`,
      search: qs.stringify(reformatQuery(res.query))
    })
    return res
  }
)


export const fetchHolidays = createAsyncThunk(
  'recommendations/fetchHolidays',
  async country => {
    return RecommendationsApi.getHolidays(country)
  }
)

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState: {
    loadingRecommendations: false,
    errorRecommendations: null,
    recommendations: {},
    holidays: [],
    filters: [],
    errorHolidays: null,
    activeRecommendationId: null,
    loadingHolidays: true
  },
  reducers: {
    resetActiveRecommendation: state => {
      state.activeRecommendationId = null
      state.loadingRecommendations = true
    }
  },
  extraReducers: {
    [fetchRecommendations.pending]: state => {
      state.activeRecommendationId = null
      state.errorRecommendations = null
      state.loadingRecommendations = true
    },
    [fetchRecommendations.fulfilled]: (state, action) => {
      const { recommendationId } = action.payload
      state.recommendations[recommendationId] = action.payload
      state.activeRecommendationId = recommendationId
      state.loadingRecommendations = false
    },
    [fetchRecommendations.rejected]: state => {
      state.errorRecommendations = true
      state.loadingRecommendations = false
    },
    [fetchRecommendationsWithShash.pending]: state => {
      state.activeRecommendationId = null
      state.errorRecommendations = null
      state.loadingRecommendations = true
    },
    [fetchRecommendationsWithShash.fulfilled]: (state, action) => {
      const { recommendationId } = action.payload
      state.recommendations[recommendationId] = action.payload
      state.activeRecommendationId = recommendationId
      state.loadingRecommendations = false
    },
    [fetchRecommendationsWithShash.rejected]: state => {
      state.errorRecommendations = true
      state.loadingRecommendations = false
    },
    [fetchHolidays.fulfilled]: (state, action) => {
      state.holidays = action.payload
      state.loadingAvailableDates = false
    },
    [fetchHolidays.rejected]: (state, action) => {
      state.errorRecommendations = _get(
        action.error,
        'data',
        action.error.toString()
      )
      state.loadingAvailableDates = false
    }
  }
})

export const recommendationsSelector = state => state.recommendations
export const { resetActiveRecommendation } = recommendationsSlice.actions
export default recommendationsSlice.reducer
