import React from 'react'
import PropTypes from 'prop-types'
import styles from './settings-section.module.scss'

const SettingsSection = ({ title, description, children }) => {
  return (
    <div className={styles.wrapper}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

SettingsSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node
}

export default SettingsSection
