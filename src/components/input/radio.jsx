import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './radio.module.scss'

const Radio = React.forwardRef(
  ({
    name,
    onChange,
    options,
    value,
    className
  }) => {
    return (
      <div className={cn(styles.container, className)}>
        {options.map(option => (
          <input
            key={`radio-opt-label-${option.value}`}
            type="radio"
            readOnly
            checked={value === option.value}
            disabled={option.disabled}
          />
        ))}
        {options.map(option => (
          <button
            key={`radio-opt-label-${option.value}`}
            onClick={() => onChange(option.value)}
            data-value={option.label}
          >
            {option.label}
          </button>
        ))}
      </div>
    )
  }
)

Radio.defaultValues = {}

Radio.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  className: PropTypes.string
}


export default Radio
