import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BlurhashCanvas } from 'react-blurhash'
import cn from 'classnames'
import styles from './image.module.scss'
import { getImagePath } from 'utils/image'

const Image = ({
  blurHash,
  height,
  width,
  alt,
  className,
  containerClassName,
  src,
  srcsetProvided = false,
  srcset,
  isRounded = true,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)
  const placeholder = blurHash ? (
    <BlurhashCanvas
      className={styles.placeholder}
      hash={blurHash}
      width={Math.floor(width / height * 100)}
      height={100}
      punch={1}
    />
  ) : (
    <div className={styles.placeholder} />
  )
  const handleLoad = () => {
    setLoaded(true)
  }

  const url = src && src.startsWith('http') ? src : getImagePath(src)
  return (
    <div className={cn([styles.container, className, { [styles.loaded]: loaded }])}>
      {(!loaded || !src) && placeholder}
      {src && srcsetProvided ? (
        <img
          className={cn(isRounded ? styles.imageRounded : styles.image, {
            [styles.notLoaded]: !loaded
          })}
          src={url}
          srcSet={srcset}
          style={!isRounded ? { width: width, height: height } : { width: '100%', height: '100%' }}
          alt={alt}
          {...props}
          onLoad={handleLoad}
        />
      ) : (
        <img
          className={cn(isRounded ? styles.imageRounded : styles.image, {
            [styles.notLoaded]: !loaded
          })}
          src={url}
          style={!isRounded ? { width: width, height: height } : { width: '100%', height: '100%' }}
          alt={alt}
          {...props}
          onLoad={handleLoad}
        />
      )}
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
