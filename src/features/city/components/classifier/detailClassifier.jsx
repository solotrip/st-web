import React from 'react'
import DetailCell from '../elements/cell/detailCell'
import DetailChart from '../elements/chart/detailChart'
import DetailTable from '../elements/table/detailTable'
import DetailMedia from '../elements/media/detailMedia'
import DetailTag from '../elements/tag/detailTag'
import DetailButton from '../elements/button/detailButton'
import DetailHighlight from '../elements/highlight/detailHighlight'
import SimilarCity from '../elements/similar-city/similarCity'

const getComponent = (type) => {
  switch (type) {
  case 'score':
  case 'cost':
    return DetailCell
  case 'media':
    return DetailMedia
  case 'line-chart-blue':
  case 'line-chart-red':
  case 'pie-chart':
  case 'forest':
  case 'radar':
    return DetailChart
  case 'table':
    return DetailTable
  case 'link':
    return DetailButton
  case 'activity':
    return DetailTag
  case 'highlights':
    return DetailHighlight
  case 'city':
    return SimilarCity
  }
}

const DetailClassifier = ({ type, ...rest }) => {
  const DetailComponent = getComponent(type)
  return (
    <DetailComponent {...rest} />
  )
}

export default DetailClassifier
