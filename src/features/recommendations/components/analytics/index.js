import React, { useMemo, useState } from 'react'
import { OPTIONS as options } from 'constants/binder'
import styles from '../sidePanel.module.scss'
import Dropdown from '../../../../components/dropdown'
import ChartSkeleton from '../../../../components/chart/chartSkeleton'
import AnalyticsChart from './chart'
import CostOfLiving from './cost-of-living'
import Restrictions from './restriction'

const Analytics = ({ recommendations, loading }) => {
  const [selectedOption, setSelectedOption] = useState({
    value: 'hotel-prices',
    label: 'Hotel Prices'
  })

  const optionChange = event => {
    setSelectedOption(event)
  }

  const activeChart = useMemo(() => {
    if (loading) {
      return <ChartSkeleton/>
    }
    switch (selectedOption.value) {
    case 'hotel-prices':
    case 'hostel-prices':
    case 'airbnb-prices':
    case 'temperature':
    case 'trip-days':
      return <AnalyticsChart
          recommendations={recommendations}
          title={selectedOption.label}
          type={selectedOption.value}
      />
    case 'cost-of-living':
      return <CostOfLiving recommendations={recommendations}/>
    case 'restrictions':
      return <Restrictions recommendations={recommendations}/>
    default:
      return null
    }
  },
  [recommendations, selectedOption, loading])


  return (
    <div className={styles.middleContainer}>
      <div className={styles.select}>
        <div className={styles.selectItem}>
          {!loading &&
          recommendations &&
          recommendations.length > 0 && (
            <Dropdown options={options} onSelect={optionChange}
                      placeholder="Hotel Prices"
                      isSearchable={false}
            />
          )}
        </div>
      </div>
      <div className={styles.lowerContainer}>
        {activeChart}
      </div>
    </div>
  )
}

export default Analytics