import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { fetchRecommendations } from 'features/recommendations/slice'
import { RECENT_QUERIES_COUNT } from 'constants/index'
import objectHash from 'object-hash'

const recentQueriesSlice = createSlice({
  name: 'recentQueries',
  initialState: {
    items: []
  },
  extraReducers: {
    [fetchRecommendations.pending]: (state, action) => {
      const { arg = {} } = action.meta
      state.items = _.uniqBy([
        arg,
        ...state.items
      ], objectHash)
        .slice(0, RECENT_QUERIES_COUNT)

    }
  }
})

export const recentQueriesSelector = state => state.recentQueries

export default recentQueriesSlice.reducer
