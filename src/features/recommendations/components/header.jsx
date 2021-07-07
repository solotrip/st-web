import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import styles from './header.module.scss'
import { MdSettings } from 'react-icons/md'
import { ReactComponent as PulfyIcon } from 'assets/pold.svg'
import { groupByMonths } from '../../../utils/date'

const Header = ({ availableDates, onSelect, activeDateIndex }) => {
  const {
    months: availableMonths,
    dates
  } = useMemo(() => groupByMonths(availableDates),
    [availableDates])
  const [activeMonth, setActiveMonth] = useState(
    dates[activeDateIndex].month
  )
  const handleActiveMonth = e => {
    const name = e.target.name
    setActiveMonth(name)
  }

  const handleActiveWeek = index => () => {
    onSelect(index)
  }

  return (
    <div className={styles.navbarFixed}>
      <div className={styles.container}>
        <Link to="/recommendations" className={styles.logoTextHolder}>
          <PulfyIcon className={styles.pulfyIconBar}/>
          <span className={styles.pulfyBar}>pulfy</span>
        </Link>
        <div className={styles.actions}>
          <div className={styles.monthSelector}>
            {availableMonths.map(month => (
              <button
                name={month}
                key={month}
                onClick={handleActiveMonth}
                className={cn(styles.month,
                  { [styles.activeMonth]: activeMonth === month })
                }
              >
                {month}
              </button>
            ))}
          </div>
          <div className={styles.weekSelector}>
            {dates.filter(d => d.month === activeMonth).map(d => (
              <button
                className={
                  cn(styles.week,
                    { [styles.activeWeek]: activeDateIndex === d.index })
                }
                onClick={handleActiveWeek(d.index)}
                key={d.index}
              >
                {d.startDay}{d.duration > 1 && ` - ${d.endDay}`}
              </button>
            ))}
          </div>
        </div>
        <Link
          className={cn(styles.interestButton, 'glow-on-hover')}
          to="/recommendations/preferences/4"
        >
          Preferences
        </Link>
        <Link
          className={styles.interestIconButton}
          to="/recommendations/preferences/4"
        >
          <MdSettings/>
        </Link>
      </div>
    </div>
  )
}

Header.propTypes = {
  availableDates: PropTypes.array,
  activeDateIndex: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default Header
