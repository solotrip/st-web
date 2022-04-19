import React from 'react'
import { ReactComponent as Logo } from 'assets/images/logo.svg'
import styles from './chart.module.scss'
import ContentLoader from 'react-content-loader'

const ChartSkeleton = ({}) => {
  return (
    <div className={styles.content}>
      <ContentLoader
        speed={2}
        width={'100% - 20px'}
        height="calc(40vh)"
        backgroundColor="var(--color-card-bg)"
        foregroundColor="var(--color-highlight-bg)"
      >
        <rect x="5" y="160" rx="5" ry="5" width="calc(9%)" height="40" />
        <rect x="calc(9% + 10px)" y="145" rx="5" ry="5" width="calc(9% - 1px)" height="55" />
        <rect x="calc(19%  + 10px)" y="126" rx="5" ry="5" width="calc(9% - 1px)" height="74" />
        <rect x="calc(29%  + 10px)" y="80" rx="5" ry="5" width="calc(9% - 1px)" height="120" />
        <rect x="calc(39% + 10px)" y="142" rx="5" ry="5" width="calc(9% - 1px)" height="58" />
        <rect x="calc(49% + 10px)" y="160" rx="5" ry="5" width="calc(9% - 1px)" height="40" />
        <rect x="calc(59% + 10px)" y="145" rx="5" ry="5" width="calc(9% - 1px)" height="55" />
        <rect x="calc(69% + 10px)" y="126" rx="5" ry="5" width="calc(9% - 1px)" height="74" />
        <rect x="calc(79% + 10px)" y="80" rx="5" ry="5" width="calc(9% - 1px)" height="120" />
        <rect x="calc(89% + 10px)" y="142" rx="5" ry="5" width="calc(9% - 1px)" height="58" />
      </ContentLoader>
    </div>
  )
}

export default ChartSkeleton
