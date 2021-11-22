import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './city-card.module.scss'
import { Link } from 'react-router-dom'
import { Image } from 'components'

const CityCard = ({ name, id, image, className }) => {
  return (
    <Link
      className={cn([styles.wrapper, className])}
      to={{ pathname: `/cities/${id}/overview` }}
    >
      <Image alt={`${name}`} className={styles.image} src={image} />
      <div className={styles.content}>
        <div className={styles.title}>{name}</div>
      </div>
    </Link>
  )
}

CityCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default CityCard
