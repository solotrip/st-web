import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DayPicker, { DateUtils } from 'react-day-picker'
import { useMediaQuery } from 'react-responsive'
import 'react-day-picker/lib/style.css'
import styles from './calendar.module.scss'


const Calendar = ({ numberOfMonths, onUpdate, data }) => {
  const [state, setState] = useState({ from: data.start, to: data.end })
  const screenIsXsToSm = useMediaQuery(
    {
      query: '(max-width: 767px)'
    },
    undefined,
    matching => {
      setXsToSm(matching)
    }
  )
  const [xsToSm, setXsToSm] = useState(screenIsXsToSm)

  const handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return
    }
    const range = DateUtils.addDayToRange(day, state)
    setState(range)
    onUpdate({ start: range.from, end: range.to })
  }

  const { from, to } = state
  const modifiers = { start: from, end: to }
  return (
    <>
      <div className={styles.wrapperPrompt}>
        {!from && !to && 'Please select the first day.'}
        {from && !to && 'Please select the last day.'}
        {from &&
        to &&
        `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
      </div>
      <div className={styles.wrapper}>
        <DayPicker
          className="Selectable"
          mode="range"
          numberOfMonths={xsToSm ? 1 : numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={handleDayClick}
          disabledDays={[
            {
              before: new Date()
            }
          ]}
        />
      </div>
    </>
  )
}

Calendar.defaultProps = {
  numberOfMonths: 2,
  data: {}
}

Calendar.propTypes = {
  numberOfMonths: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
  data: PropTypes.object
}

export default Calendar
