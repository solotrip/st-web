import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
const DropDown = ({ options, value, onSelect, className, placeholder = null }) => {
  return (
    <Select
      className="pulfy-select"
      value={options.find(o => o.value === value)}
      classNamePrefix="rs"
      options={options}
      onChange={onSelect}
      placeholder={placeholder}
    />
  )
}

DropDown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.any,
  onSelect: PropTypes.func,
  className: PropTypes.string
}

export default DropDown
