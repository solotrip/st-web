import React, { useState } from 'react'

import { SettingsSection } from 'components'
import Select from 'react-select'
import styles from './customization.module.scss'

const CustomizationContainer = () => {
  const defaults = [
    { value: 'events-festivals', label: 'Event & Festivals' },
    { value: 'acommodation', label: 'Acommodation' },
    { value: 'flights', label: 'Flights' },
    { value: 'weather', label: 'Weather' },
    { value: 'visa-status', label: 'Visa Status' },
    { value: 'attractions', label: 'Attractions' }
  ]
  const options = [
    { value: 'events-festivals', label: 'Event & Festivals' },
    { value: 'acommodation', label: 'Acommodation' },
    { value: 'flights', label: 'Flights' },
    { value: 'weather', label: 'Weather' },
    { value: 'visa-status', label: 'Visa Status' },
    { value: 'attractions', label: 'Attractions' },
    { value: 'activities', label: 'Activities' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'covid', label: 'Covid' },
    { value: 'distance-to-sea', label: 'Distance to Sea' },
    { value: 'movies', label: 'Movies' },
    { value: 'cost-of-living', label: 'Cost of Living' }
  ]

  const [customized, setCustomized] = useState(defaults)
  const handleChange = value => {
    setCustomized(value)
  }

  return (
    <SettingsSection
      title="Customization"
      description="Select what you want to see on recommendations"
    >
      <Select
        options={options}
        value={customized}
        isMulti
        className={styles.select}
        classNamePrefix="rs"
        onChange={handleChange}
        placeholder="Click to customize."
      />
    </SettingsSection>
  )
}

export default CustomizationContainer
