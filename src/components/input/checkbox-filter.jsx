import React from 'react'
import PropTypes from 'prop-types'
import styles from './checkbox-filter.module.scss'

const CheckboxFilter = React.forwardRef(
  ({ label, name, onChange, className, icon, checked, ...props }, ref) => {
    return (
      <label className={checked ? styles.containerChecked : styles.container}>
        <span className={styles.labelContainer}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <span className={styles.label}>{label ? label : name}</span>
        </span>
        <input {...props} type="checkbox" className={styles.input} onChange={onChange} ref={ref} />
      </label>
    )
  }
)

CheckboxFilter.defaultValues = {}

CheckboxFilter.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string
}

export default CheckboxFilter
