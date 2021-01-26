import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './Tooltip.module.scss'

const Tooltip = props => {
  let timeout
  const [active, setActive] = useState(false)

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, props.delay)
  }

  const hideTip = () => {
    clearTimeout(timeout)
    setActive(false)
  }

  return (
    <div
      className={styles.wrapper}
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {active && (
        <div className={cn(styles.tip)}>
          {props.content}
        </div>
      )}
    </div>
  )
}
Tooltip.defaultProps = {
  direction: 'top',
  delay: 0
}

Tooltip.propTypes = {
  direction: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
  delay: PropTypes.number,
  content: PropTypes.string,
  children: PropTypes.node
}

export default Tooltip
