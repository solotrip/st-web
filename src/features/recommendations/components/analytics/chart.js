import React from 'react'
import _get from 'lodash/get'
import { chartConfig } from './config'
import Chart from 'components/chart/chart'
import styles from './chart.module.scss'
const AnalyticsChart = ({ recommendations, type, title }) => {

  const chartData = recommendations.map((recommendation, k) => {

    const min = _get(recommendation, chartConfig[type].min)
    const max = _get(recommendation, chartConfig[type].max)

    const image = recommendation.area_has_image
      ? `https://ik.imagekit.io/stmedia/areas/${recommendation.sid}?tr=w-700,h-550`
      : (_get(recommendation, 'events[0].images[0]') &&
        `https://ik.imagekit.io/stmedia/${recommendation.events[0].images[0]}`)


    return {
      name: '#' + (k + 1) + ' ' + recommendation.name,
      category: title,
      min: min,
      max: max,
      bulletSettings: {
        src: image
      }
    }
  })


  return <div className={styles.container}>
    <Chart
    data={chartData}
    type={type}
    DOMroot={type}
    />
  </div>

}


export default AnalyticsChart
