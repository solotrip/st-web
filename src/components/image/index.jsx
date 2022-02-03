import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BlurhashCanvas } from 'react-blurhash'
import cn from 'classnames'
import styles from './image.module.scss'

const Image = ({
  blurHash,
  height,
  width,
  alt,
  className,
  containerClassName,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)
  const placeholder = blurHash ? <BlurhashCanvas
      className={cn([styles.placeholder, className])}
      hash={blurHash}
      width={Math.floor(width / height * 100)}
      height={100}
      punch={1}
  /> :
    <div className={cn([styles.placeholder, className])}/>
  const handleLoad = () => {
    setLoaded(true)
  }
  return (
    <div
      className={cn([
        styles.container,
        containerClassName,
        { [styles.loaded]: loaded }
      ])}
    >
      {!loaded &&
      <div className={styles.placeholderContainer}>{placeholder}</div>}
      <div className={styles.imageContainer}>
        <img
          className={cn(styles.image, className,
            { [styles.notLoaded]: !loaded })}
          alt={alt} {...props}
          onLoad={handleLoad}
        />
      </div>
    </div>
  )
}

Image.defaultProps = {}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  blurHash: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string
}

export default Image
