import React from 'react'
import { ReactComponent as Logo } from 'assets/images/logo.svg'
import styles from './svgmap.module.scss'
import ContentLoader from 'react-content-loader'

const MapSkeleton = ({}) => {
  return (
    <div className={styles.content2}>
      <ContentLoader
        speed={2}
        width={'100%'}
        height="calc(60vh)"
        backgroundColor="var(--color-card-bg)"
        foregroundColor="var(--color-highlight-bg)"
      >
        <rect x="10" y="0" rx="10" ry="10" width="calc(100% - 20px)" height="calc(50vh)" />
        <rect x="10" y="calc(52vh)" rx="16" ry="16" width="calc(50%)" height="38" />
      </ContentLoader>
    </div>
  )
}

export default MapSkeleton
