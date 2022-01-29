import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { fetchRecommendations } from 'features/recommendations/slice'
import {
  RECENT_DATE_RANGES_COUNT,
  RECENT_MONTH_RANGES_COUNT
} from 'constants/index'

const datesSlice = createSlice({
  name: 'dates',
  initialState: {
    recentDateRanges: [],
    recentMonths: []
  },
  reducers: {},
  extraReducers: {
    [fetchRecommendations.pending]: (state, action) => {
      const { arg = {} } = action.meta
      const {
        start,
        end,
        months,
        duration,
        weekendOnly
      } = arg
      if(start && end) {
        state.recentDateRanges = _.uniqBy([
          {
            start,
            end
          },
          ...state.recentDateRanges
        ], d => `${d.start}-${d.end}`).slice(0, RECENT_DATE_RANGES_COUNT)
      }
      if(months) {
        state.recentMonths = _.uniqBy([
          {
            months,
            duration,
            weekendOnly
          },
          ...state.recentMonths
        ], d => `${d.months.join(',')}-${d.duration || d.weekendOnly}`)
          .slice(0, RECENT_MONTH_RANGES_COUNT)
      }

    }
  }
})

export const datesSelector = state => state.dates

export default datesSlice.reducer
