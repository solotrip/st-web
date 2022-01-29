import _uniq from 'lodash/uniq'
import dayjs from 'dayjs'
import IsSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(IsSameOrBefore)

dayjs.extend(relativeTime)
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export const getMonthAbbreviation = index => months[index]

export const getMonth = date => {
  const monthIndex = date.getMonth()
  return months[monthIndex]
}

export const getMonthsStartingFromToday = () => {
  const today = new Date()
  const monthIndex = today.getMonth()
  return [...months.slice(monthIndex), ...months.slice(0, monthIndex)]
    .map((m, i) => ({
      label: m,
      value: (monthIndex + i) % 12 + 1
    }))

}

export const groupByMonths = dates => {
  const enhancedDates = dates.map((date, index) => {
    const startDate = new Date(date.start)
    const endDate = new Date(date.end)
    return ({
      index: index,
      ...date,
      month: getMonth(startDate),
      startDay: startDate.getDate(),
      endDay: endDate.getDate()
    })
  })
  return {
    months: _uniq(enhancedDates.map(d => d.month)),
    dates: enhancedDates
  }
}

export const getTimeDiffString = date => {
  return dayjs().to(dayjs(date))
}

export const formatAsMonthDay = date => {
  return dayjs(date).format('MMM DD')
}

export const formatAsDate = date => {
  return dayjs(date).format('YYYY-MM-DD')
}

export const formatDuration = (days, weekendOnly) => {
  if (weekendOnly) return 'a weekend'
  switch (days) {
  case 1:
  case '1':
    return 'a day'
  case 7:
  case '7':
    return 'a week'
  case 14:
  case '14':
    return 'two weeks'
  case 30:
  case '30':
    return 'a month'
  default:
    return `${days} days`
  }
}

export const isExpired = d => dayjs(d).isSameOrBefore(new Date(), 'day')
