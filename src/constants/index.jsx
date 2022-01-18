export const NOTIFICATION_TYPES = {
  EVENT: 'event',
  RECOMMENDATION: 'recommendation',
  WISHLIST: 'wishlist'
}
export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

export const DATE_QUERY_TYPE = {
  calendar: 'calendar',
  flexible: 'flexible',
  recentQueries: 'recent-queries'
}

export const FLEXIBLE_DATE_CONFIG = {
  weekend: {
    label: 'Weekend',
    value: 'weekend',
    payload: { duration: undefined, weekendOnly: true }
  },
  week: {
    label: 'Week',
    value: 'week',
    payload: { duration: '7', weekendOnly: undefined }
  },
  month: {
    label: 'Month',
    value: 'month',
    payload: { duration: '30', weekendOnly: undefined }
  }
}

export const RECENT_FILTERS_CATEGORY = 'Recent'
export const RECENT_FILTERS_COUNT = 10
