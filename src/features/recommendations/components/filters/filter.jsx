import React from 'react'
import PropTypes from 'prop-types'
import _get from 'lodash/get'
import { RangeInput, CheckboxFilter } from 'components'
import styles from './filter.module.scss'

import activityImages from '../recommendation-details/activity-images.json'
import { getImagePath, SUPPORTED_SIZES } from 'utils/image'

const Filter = ({ filter, value, updateFilter }) => {
  const allowedVariables = _get(filter, 'allowedVariables', []).filter(v => !v.key.startsWith('$'))
  const rangeFields = allowedVariables.filter(a => ['lt', 'gt', 'gte', 'lte'].includes(a.key))
  const isCheckbox = () => allowedVariables.length === 0
  const isRange = () => rangeFields.length > 0
  let image = ''
  if (filter && filter.category && filter.name && filter.category === 'Activities') {
    const act = activityImages[filter.name]
    if (act && act.image_hash) {
      image = getImagePath(`${act.image_hash}`, SUPPORTED_SIZES['720'], 'activities/' )
    }
  }
  return (
    <div key={filter.uuid} className={styles.container}>
      {isCheckbox() && (
        <CheckboxFilter
          name={filter.name}
          icon={filter.icon}
          checked={value || false}
          onChange={e => updateFilter(filter.uuid, e.target.checked)}
          bgImage={image}
        />
      )}
      {isRange() && <RangeInput name={filter.name} icon={filter.icon} />}
    </div>
  )
}

Filter.propTypes = {
  filter: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string
  })
}

export default Filter
