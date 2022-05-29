import React, { useMemo } from 'react'
import _get from 'lodash/get'
import { chartConfig } from './config'
import Chart from 'components/chart/chart'
import styles from './chart.module.scss'
import { getImagePath, SUPPORTED_SIZES } from '../../../../utils/image'
import { formatAsMonthDay } from 'utils/date'

const AnalyticsChart = ({ recommendations, type, title, contentType, tabbed }) => {
  const chartData = recommendations.map((recommendation, k) => {
    const min = _get(recommendation, chartConfig[type].min)
    const max = _get(recommendation, chartConfig[type].max)

    const image = recommendation.area_has_image
      ? getImagePath(`${recommendation.sid}`, SUPPORTED_SIZES['720'], 'areas/')
      : _get(recommendation, 'events[0].images[0]') &&
        getImagePath(`${recommendation.events[0].images[0]}`, SUPPORTED_SIZES['720'])

    const dates =
      recommendation.startDate && recommendation.endDate
        ? recommendation.startDate !== recommendation.endDate
          ? formatAsMonthDay(recommendation.startDate) +
            ' - ' +
            formatAsMonthDay(recommendation.endDate)
          : formatAsMonthDay(recommendation.startDate)
        : ' '

    return {
      name: '#' + (k + 1) + ' ' + recommendation.name,
      category: title,
      dates: dates,
      min: min,
      max: max,
      bulletSettings: {
        src: image
      }
    }
  })

  const filteredChartData = chartData.filter(
    d =>
      d !== null && d.min !== null && d.max !== null && d.min !== undefined && d.max !== undefined
  )

  const activeChart = useMemo(
    () => (
      <Chart
        data={filteredChartData}
        type={type}
        DOMroot={type + contentType + tabbed}
        contentType={contentType}
      />
    ),
    [recommendations, chartData, filteredChartData]
  )

  return <div className={styles.container}>{activeChart}</div>
}

export default AnalyticsChart
