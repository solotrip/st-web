import React from 'react'
import styles from './footer.module.scss'
import { Button } from 'components'

const Footer = ({
  onClick,
  disabled,
  text,
  previousEnabled = false,
  previousOnClick,
  previousText
}) => {
  return (
    <div className={styles.container}>
      <div className={previousEnabled ? styles.content : styles.contentEnd}>
        {previousEnabled && (
          <Button className={styles.prev} text={previousText} onClick={previousOnClick} />
        )}
        <Button className={styles.next} onClick={onClick} disabled={disabled} text={text} />
      </div>
    </div>
  )
}

export default Footer
