import { createSlice } from '@reduxjs/toolkit'
import _uniqBy from 'lodash/uniqBy'
import { fetchRecommendations } from 'features/recommendations/slice'
import { RECENT_QUERIES_COUNT } from 'constants/index'
import { deepSort }  from 'tiny-object-hash'
import { isExpired } from 'utils/date'

const filterOldQueries = queries => queries.filter(q =>
  !q.end || (!isExpired(q.end) && !isExpired(q.start))
)

const recentQueriesSlice = createSlice({
  name: 'recentQueries',
  initialState: {
    items: []
  },
  extraReducers: {
    [fetchRecommendations.pending]: (state, action) => {
      const { arg = {} } = action.meta
      state.items = filterOldQueries(_uniqBy([
        arg,
        ...state.items
      ], a => JSON.stringify(deepSort(a)))).slice(0, RECENT_QUERIES_COUNT)

    }
  }
})

export const recentQueriesSelector = state => filterOldQueries(
  state.recentQueries.items
)

export default recentQueriesSlice.reducer
