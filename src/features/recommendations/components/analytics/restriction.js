import React from 'react'
import _get from 'lodash/get'
import _flatten from 'lodash/flatten'
import {
  costOfLivingConfig,
  restrictionColors,
  restrictionConfig
} from './config'
import Table from 'components/table/table'
import styles from './chart.module.scss'
import _has from 'lodash/has'

const Restrictions = ({ recommendations }) => {
  const tableData = recommendations.map((recommendation, k) => {
    return Object.keys(_get(recommendation, 'country.restrictions', {}))
      .filter(key => _has(restrictionConfig, key))
      .map((key, i) => {
        const x = '#' + (k + 1) + ' ' + recommendation.name
        const { title, settings } = restrictionConfig[key] || {
          title: '',
          settings: {}
        }
        const restriction = _get(recommendation, 'country.restrictions', {})[key] || ''
        return {
          x: x,
          y: title,
          k,
          columnSettings: settings[restriction],
          rawValue: restriction,
          value: restriction
        }
      })
  })

  const valuesX = recommendations.map((recommendation, k) => ({
    category: '#' + (k + 1) + ' ' + recommendation.name
  }))

  return <div className={styles.container}>
    <Table
      data={_flatten(tableData)}
      valuesY={Object.values(restrictionConfig).map(v => ({ category: v.title }))}
      valuesX={valuesX}
      colors={restrictionColors}
      type="cost-of-living"
      showContent={false}
    />
  </div>

}


export default Restrictions
