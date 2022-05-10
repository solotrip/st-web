import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { OPTIONS as options } from 'constants/binder'
import styles from '../sidePanel.module.scss'
import Dropdown from '../../../../components/dropdown'
import ChartSkeleton from '../../../../components/chart/chartSkeleton'
import AnalyticsChart from './chart'
import CostOfLiving from './cost-of-living'
import Restrictions from './restriction'
import { localPreferencesSelector } from 'reducers/localPreferencesSlice'
import { temperatureUnits } from '../../../../constants/preferencesOptions'

const Analytics = ({
  recommendations,
  loading,
  defaultSelectedOption = { value: 'hotel-prices', label: 'Hotel Prices' }
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultSelectedOption)

  const optionChange = event => {
    setSelectedOption(event)
  }

  var recommendationsModified = []

  const { temperature } = useSelector(localPreferencesSelector)

  const convertedValue = (temperature, value, decimalPlaces = 1) => {
    const converted =
      temperature === temperatureUnits.F
        ? (9 / 5) * Number(value) + 32
        : Number(value).toFixed(decimalPlaces)
    return converted
  }

  const activeChart = useMemo(() => {
    if (loading) {
      return <ChartSkeleton />
    }
    switch (selectedOption.value) {
      case 'hotel-prices':
      case 'hostel-prices':
      case 'airbnb-prices':
      case 'temperature':
      case 'trip-days':
        recommendationsModified = recommendations.map(
          r =>
            r.climate &&
            r.climate.t_min &&
            r.climate.t_max && {
              ...r,
              climate: {
                ...r.climate,
                t_min: convertedValue(temperature, r.climate.t_min, 1),
                t_max: convertedValue(temperature, r.climate.t_max, 1)
              }
            }
        )

        return (
          <AnalyticsChart
            recommendations={recommendations}
            title={selectedOption.label}
            type={selectedOption.value}
            unit={temperature}
          />
        )
      case 'cost-of-living':
        return <CostOfLiving recommendations={recommendations} />
      case 'restrictions':
        return <Restrictions recommendations={recommendations} />
      default:
        return null
    }
  }, [recommendations, selectedOption, loading])

  return (
    <div className={styles.middleContainer}>
      {console.log('here reco:', recommendations)}
      <div className={styles.select}>
        <div className={styles.selectItem}>
          {!loading && recommendations && recommendations.length > 0 && (
            <Dropdown
              options={options}
              onSelect={optionChange}
              placeholder={selectedOption.label}
              isSearchable={false}
              defaultValue={[selectedOption]}
            />
          )}
        </div>
      </div>
      <div className={styles.lowerContainer}>{activeChart}</div>
    </div>
  )
}

export default Analytics
