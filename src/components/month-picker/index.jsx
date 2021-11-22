import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './month-picker.module.scss'
import { getMonthsStartingFromToday } from 'utils/date'
import { MdDateRange } from 'react-icons/md'
import { HorizontalScroll } from 'components'

const MonthPicker = ({ onSelect, selected }) => {
  const monthOptions = getMonthsStartingFromToday()
  // Convert them to string so that we can check equality with query string
    .map(m => ({
      ...m,
      value: `${m.value}`
    }))
  const selectedSet = useMemo(() => new Set(selected), [selected])
  const handleSelect = month => () => {
    if (selectedSet.has(month)) {
      selectedSet.delete(month)
    } else {
      selectedSet.add(month)
    }
    onSelect([...selectedSet])
  }

  const months = monthOptions.map(month => (
    <div key={`month-picker-m-${month.value}`}>
      <button
        className={cn(styles.month,
          { [styles.selected]: selectedSet.has(month.value) })}
        onClick={handleSelect(month.value)}
      >
        <MdDateRange className={styles.icon}/>
        {month.label}
      </button>
    </div>
  ))
  return (
    <div className={styles.monthPicker}>
      <HorizontalScroll items={months}/>
    </div>
  )
}

MonthPicker.defaultProps = {
  selected: []
}

MonthPicker.propTypes = {
  onSelect: PropTypes.func.isRequired,
  /**
   * Array of one based month indexes
   * e.g. [1, 2, 12]
   */
  selected: PropTypes.array
}

export default MonthPicker
