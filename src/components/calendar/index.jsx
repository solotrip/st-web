import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import DayPicker, { DateUtils } from 'react-day-picker'
import { useMediaQuery } from 'react-responsive'
import 'react-day-picker/lib/style.css'
import styles from './calendar.module.scss'
import { formatAsMonthDay, oneMonthLater } from 'utils/date'


const Calendar = ({ numberOfMonths, onUpdate, data }) => {
  const [state, setState] = useState({
    from: data.start && new Date(data.start), to: data.end && new Date(data.end)
  })
  useEffect(() => {
    setState({
      from: data.start && new Date(data.start),
      to: data.end && new Date(data.end)
    })
  }, [data.start, data.end])
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
  const { from, to } = state

  const handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return
    }
    const currentState = state.to ? {} : state
    const range = DateUtils.addDayToRange(day, currentState)
    setState(range)
    onUpdate({ start: range.from, end: range.to })
  }
  const modifiers = { start: from, end: to }
  const disabledDays = [{
    before: new Date()
  }]
  if (state.from) {
    disabledDays.push({
      after: oneMonthLater(state.from)
    })
  }
  return (
    <>
      <div className={styles.wrapperPrompt}>
        {!from && !to && 'When do you want to travel?'}
        {from && !to && `From ${formatAsMonthDay(from)} to ...`}
        {from &&
        to && (
          <>
            From&nbsp;<b>{formatAsMonthDay(from)}&nbsp;</b>to
            <b>&nbsp;{formatAsMonthDay(to)}</b>
          </>)}
      </div>
      <div className={styles.wrapper}>
        <DayPicker
          className="Selectable"
          mode="range"
          numberOfMonths={xsToSm ? 1 : numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={handleDayClick}
          disabledDays={disabledDays}
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
