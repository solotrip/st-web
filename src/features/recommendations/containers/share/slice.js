import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as RecommendationsApi from 'api/recommendation'
import { AREA_SID_FILTER_ID } from 'constants/index'


export const fetchRecommendation = createAsyncThunk(
  'shareRecommendation/fetchRecommendation',
  async ({
    areaSid,
    ...rest
  }) => {
    const payload = {
      ...rest,
      filters: [{ id: AREA_SID_FILTER_ID, variables: { areaSids: [areaSid] } }]
    }
    return await RecommendationsApi.getRecommendations(payload)
  }
)

const shareRecommendationSlice = createSlice({
  name: 'shareRecommendation',
  initialState: {
    loading: false,
    error: null,
    recommendation: null
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
    }
  }
})

export const shareRecommendationSelector = state => state.shareRecommendation
export default shareRecommendationSlice.reducer
