import React, { useState, useEffect } from 'react'
import Carousel from './Carousel/Carousel'
import axios from 'axios'
import styles from './detailMedia.module.scss'

import { useTranslation } from 'react-i18next'

const SPLASHBASE_URL = 'http://www.splashbase.co/api/v1/images/latest'

const DetailMedia = ({ showTitle = 'true', showCarousels }) => {
  const [imgList, setImgList] = useState([])
  const { t, i18n } = useTranslation(['translation'])

  useEffect(() => {
    axios
      .get(SPLASHBASE_URL)
      .then(resp => {
        setImgList(resp.data.images)
      })
      .catch(err => {
        console.log('Unable to Fetch Image from splashbase', err)
      })
  }, [])

  return (
    showCarousels && (
      <div className={styles.wrapper}>
        {showTitle && (
          <div className={styles.titleHolder}>
            {' '}
            <h1 className={styles.titleNormal}>
              {t('translation:This is')}
            </h1>{' '}
            <h1 className={styles.titleHighlighted}>Oslo</h1>
          </div>
        )}

        {imgList.length === 0 && <div>Loading...</div>}
        {imgList.length > 0 && (
          <Carousel
            imgList={imgList}
            img_width={242500 / 727.5}
            img_height={(350 / 485) * (242500 / 727.5)}
            visibleImages={5}
            duration={300}
            radius={16}
          />
        )}
      </div>
    )
  )
}

export default DetailMedia
