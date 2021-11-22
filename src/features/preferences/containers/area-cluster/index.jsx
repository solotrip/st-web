import React from 'react'
import styles from './cluster.module.scss'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import areas from 'assets/data/area-clusters.json'

import { bucketlistSelector, toggleSelected } from './slice'
import { HorizontalScroll, Image } from 'components'


const AreaClusterContainer = () => {
  const { sids } = useSelector(bucketlistSelector)
  const dispatch = useDispatch()
  const handleSelect = sid => () => {
    dispatch(toggleSelected(sid))
  }

  const options = areas.map(area => (
  <div className={styles.slide} key={`area-bl-${area.sid}`}>
    <button
      onClick={handleSelect(area.sid)}
      className={cn(styles.card, {
        [styles.selected]: !!sids[area.sid]
      })
      }
    >
      <Image
        src={area.link}
        className={styles.image}
        alt={area.title}
      />
      <div className={styles.areaName}>{area.title}</div>
    </button>
  </div>
  ))

  return (
  <div className={styles.areaCluster}>
    <div className={styles.title}> Select some destinations you like.</div>
    <HorizontalScroll
      className={styles.slideHolder}
      settings={{
        dots: false,
        infinite: false,
        arrows: true,
        speed: 300,
        autoHeight: true,
        responsive: [
          {
            breakpoint: 10000,
            settings: {
              rows: 2,
              slidesToShow: 4,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 360,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }
        ]
      }}
      items={options}
    />

  </div>
  )
}

export default AreaClusterContainer
