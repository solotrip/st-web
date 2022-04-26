import React from 'react'
import {
  costOfLivingColors,
  costOfLivingConfig
} from './config'
import Table from 'components/table/table'
import _flatten from 'lodash/flatten'
import _has from 'lodash/has'
import styles from './chart.module.scss'

const CostOfLiving = ({ recommendations }) => {
  const tableData = recommendations.map((recommendation, k) => {

    return Object.keys(recommendation['cost_of_living_labels'] || {})
      .filter(key => _has(costOfLivingConfig, key))
      .map(key => {
        const x = '#' + (k + 1) + ' ' + recommendation.name
        const { title, settings } = costOfLivingConfig[key] || { title: '', settings: {} }
        const cost = recommendation['cost_of_living_labels'][key]
        return {
          x: x,
          y: title,
          k,
          columnSettings: settings[cost],
          rawValue: cost,
          value: cost && cost.replace(/\s*-\s*/, '\n').replace(/\s*\+/, '+')
        }
      })
  })

  const valuesX = recommendations.map((recommendation, k) => ({
    category: '#' + (k + 1) + ' ' + recommendation.name
  }))

  return<div className={styles.container}> <Table
    data={_flatten(tableData)}
    valuesY={Object.values(costOfLivingConfig).map(v => ({ category: v.title }))}
    valuesX={valuesX}
    colors={costOfLivingColors}
    type="cost-of-living"
    showContent={true}
  /></div>

}


export default CostOfLiving
