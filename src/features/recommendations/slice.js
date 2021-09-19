import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as UserApi from 'api/user'
import _ from 'lodash'

export const updateActiveDate = createAsyncThunk(
  'profile/recommendations/updateActiveDate',
  async (index, { dispatch, getState }) => {
    const {
      availableDates,
      activeDateIndex,
      recommendations
    } = recommendationsSelector(getState())
    if (activeDateIndex !== index || recommendations.length === 0) {
      dispatch(recommendationsSlice.actions.startFetchingRecommendations())
      try {
        dispatch(recommendationsSlice.actions.updateActiveDateState(index))
        return UserApi.getRecommendations({
          start: availableDates[index].start,
          end: availableDates[index].end
        })
      } catch (e) {
        dispatch(recommendationsSlice.actions.errorReccommendations(e))
      }
    }
  }
)
export const fetchAvailableDates = createAsyncThunk(
  'profile/recommendations/fetchAvailableDates',
  async () => {
    return UserApi.getAvailableDates()
  }
)

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState: {
    loadingRecommendations: true,
    errorRecommendations: null,
    recommendations: [],
    availableDates: [],
    loadingAvailableDates: true,
    errorAvailableDates: null,
    activeDateIndex: 0
  },
  reducers: {
    updateActiveDateState(state, action) {
      state.activeDateIndex = action.payload
    },
    startFetchingRecommendations(state) {
      state.errorRecommendations = null
      state.loadingRecommendations = true
    }
  },
  extraReducers: {
    [updateActiveDate.fulfilled]: (state, action) => {
      if (action.payload) {
        state.recommendations = action.payload
        state.loadingRecommendations = false
      }
    },
    [updateActiveDate.rejected]: (state, action) => {
      state.errorRecommendations = _.get(
        action.error,
        'data',
        action.error.toString()
      )
      state.loadingRecommendations = false
    },
    [fetchAvailableDates.pending]: state => {
      state.errorRecommendations = null
      if (state.availableDates.length === 0) {
        state.loadingAvailableDates = true
      }
    },
    [fetchAvailableDates.fulfilled]: (state, action) => {
      state.availableDates = action.payload
      state.loadingAvailableDates = false
    },
    [fetchAvailableDates.rejected]: (state, action) => {
      state.errorRecommendations = _.get(
        action.error,
        'data',
        action.error.toString()
      )
      state.loadingAvailableDates = false
    }
  }
})

export const recommendationsSelector = state => state.recommendations

export default recommendationsSlice.reducer
