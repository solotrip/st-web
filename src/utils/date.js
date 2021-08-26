import _uniq from 'lodash/uniq'

export const getMonth = date => {
  const monthIndex = date.getMonth()
  return [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Dec'
  ][monthIndex]
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
