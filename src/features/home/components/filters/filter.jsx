import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Checkbox, RangeInput } from 'components'
import styles from './filter.module.scss'

const Filter = ({ filter, value, updateFilter }) => {
  const allowedVariables = _.get(filter,
    'allowedVariables', []).filter(v => !v.key.startsWith('$'))
  const rangeFields = allowedVariables.filter(a => [
    'lt', 'gt', 'gte', 'lte'
  ].includes(a.key))
  const isCheckbox = () => allowedVariables.length === 0
  const isRange = () => rangeFields.length > 0
  return (
    <div key={filter.uuid} className={styles.container}>
      {
        isCheckbox() &&
        <Checkbox
          name={filter.name}
          icon={filter.icon}
          checked={value || false}
          onChange={e => updateFilter(filter.uuid, e.target.checked)}
        />
      }
      {
        isRange() && (
          <RangeInput
            name={filter.name}
            icon={filter.icon}
          />
        )
      }
    </div>
  )
}

Filter.propTypes = {
  filter: PropTypes.shape({
    name: PropTypes.string, icon: PropTypes.string
  })
}

export default Filter
