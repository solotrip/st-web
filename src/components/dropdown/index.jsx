import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
const DropDown = ({ options, value, onSelect, className }) => {

  return (
      <Select
        className='pulfy-select'
        value={options.find(o => o.value === value)}
        classNamePrefix="rs"
        options={options}
        onChange={onSelect}
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
