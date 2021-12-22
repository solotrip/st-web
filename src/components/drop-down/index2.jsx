import React, { useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

import {
  updateProfileState,
  profileSelector
} from '../../features/profile/slice'
import { useDispatch, useSelector } from 'react-redux'

const DropDownTemperature = ({ data: options, defaultVal }) => {
  const { data } = useSelector(profileSelector)
  const dispatch = useDispatch()
  const [currentValue, setCurrentValue] = useState(defaultVal)

  const handleSelect = (value, label) => {
    setCurrentValue({ value: value, label: label })
    dispatch(updateProfileState({ ...data, temperature: value }))
  }

  return (
    <div>
      <Select
        value={currentValue}
        options={options}
        onChange={e => handleSelect(e.value, e.label)}
      />
    </div>
  )
}

DropDownTemperature.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string
}

export default DropDownTemperature
