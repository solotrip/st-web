import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './range.module.scss'

// TODO: Implement custom range input
const Range = React.forwardRef(
  ({
    name,
    icon,
    onChange,
    className,
    ...props
  }, ref) => {
    return (
      <label className={styles.container}>
        {icon && <span>{icon}</span>}
        <span>{name}</span>
        <input
          className={cn(styles.input)}
          onChange={onChange}
          type='range'
          ref={ref}
          {...props}
        />
        <span>{name}</span>
      </label>
    )
  }
)

Range.defaultValues = {}

Range.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string
}


export default Range
