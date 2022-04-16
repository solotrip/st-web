import React, { useCallback, useMemo, useState } from 'react'
import { SheetWrapper } from 'components'
import { useSelector } from 'react-redux'

import { recommendationsSelector } from '../../slice'
import qs from 'qs'
import { useQuery } from 'utils/hooks/use-query'
import { useHistory } from 'react-router-dom'

import styles from './share.module.scss'

const ShareContainer = () => {
  const {
    loadingRecommendations,
    recommendations: recommendationsObject,
    activeRecommendationId
  } = useSelector(recommendationsSelector)

  const query = useQuery()
  const history = useHistory()

  const onSubmit = () => {
    history.push({
      pathname: '/recommendations',
      search: qs.stringify(query)
    })
  }
  const onBack = () => {
    history.goBack()
  }
  function redirect() {
    history.push({
      pathname: '/browse'
    })
  }

  return (
    <div className={styles.what}>
      <SheetWrapper disableDrag={true} closable={false}>
        <SheetWrapper.Content>{' some content'}</SheetWrapper.Content>
        <SheetWrapper.Footer onClick={onBack} text="Close" disabled={false} />
      </SheetWrapper>
    </div>
  )
}

export default ShareContainer
