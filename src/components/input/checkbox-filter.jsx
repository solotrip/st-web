import React from 'react'
import PropTypes from 'prop-types'
import styles from './checkbox-filter.module.scss'
import cn from 'classnames'
const CheckboxFilter = React.forwardRef(
  ({ label, name, onChange, className, icon, checked, bgImage, ...props }, ref) => {
    return (
      <label
        className={cn(styles.container, { [styles.checked]: checked })}
        style={
          !checked
            ? {
              background:
                  'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)),url(' + bgImage + ')'
            }
            : {
              background:
                  'linear-gradient(rgba(0, 0, 0, 0), rgba(60, 175, 235, 0.9)),url(' + bgImage + ')'
            }
        }
      >
        <span className={styles.labelContainer}>
          {icon && <span>{icon}</span>}
          <span>{label ? label : name}</span>
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
