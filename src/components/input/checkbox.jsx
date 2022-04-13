import React from 'react'
import PropTypes from 'prop-types'
import styles from './checkbox.module.scss'

const Checkbox = React.forwardRef(
  ({
    label,
    name,
    onChange,
    className,
    icon,
    ...props
  }, ref) => {
    return (
      <label className={styles.container}>
        <span className={styles.labelContainer}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <span className={styles.label}>{label? label : name}</span>
        </span>
        <input
          {...props}
          type="checkbox"
          className={styles.input}
          onChange={onChange}
          ref={ref}
        />
        <span className={styles.checkmark}/>
      </label>
    )
  }
)

Checkbox.defaultValues = {}

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string
}


export default Checkbox
