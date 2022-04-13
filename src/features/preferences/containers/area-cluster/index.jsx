import React from 'react'
import styles from './cluster.module.scss'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import areas from 'assets/data/area-clusters.json'
import { bucketlistSelector, toggleSelected } from './slice'
import { HorizontalList, Image } from 'components'


const AreaClusterContainer = () => {
  const { sids } = useSelector(bucketlistSelector)
  const dispatch = useDispatch()
  const handleSelect = sid => () => {
    dispatch(toggleSelected(sid))
  }

  const options = areas.slice(0, areas.length / 2).map((area, index) => {
    const secondArea = areas[areas.length / 2 + index]
    return (
        <div name={area.sid}>
          <div  className={styles.slide}
               key={`area-bl-${area.sid}`}
          >
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
          <div name={secondArea.sid} className={styles.slide}
               key={`area-bl-${secondArea.sid}`}
          >
            <button
              onClick={handleSelect(secondArea.sid)}
              className={cn(styles.card, {
                [styles.selected]: !!sids[secondArea.sid]
              })
              }
            >
              <Image
                src={secondArea.link}
                className={styles.image}
                alt={secondArea.title}
              />
              <div className={styles.areaName}>{secondArea.title}</div>
            </button>
          </div>
        </div>
    )
  }
  )

  return (
    <div className={styles.areaCluster}>
      <div className={styles.title}> Select some destinations you like.</div>
      <HorizontalList
        itemClassName={styles.slideWrapper}
        items={options}
      />
    </div>
  )
}

export default AreaClusterContainer
