import React from 'react'
import DetailCell from '../elements/cell/detailCell'
import DetailChart from '../elements/chart/detailChart'
import DetailTable from '../elements/table/detailTable'
import DetailMedia from '../elements/media/detailMedia'
import DetailTag from '../elements/tag/detailTag'
import DetailButton from '../elements/button/detailButton'
import DetailHighlight from '../elements/highlight/detailHighlight'
import DetailBreak from '../elements/break/detailBreak'
import SimilarCity from '../elements/similar-city/similarCity'

var ComponentClassified
const DetailClassifier = ({ objectKey, value, type, i, rowAt }) => {
  if ((type == 'score') | (type == 'cost')) {
    ComponentClassified = DetailCell
  }
  if (type == 'media') {
    ComponentClassified = DetailMedia
  }

  if (
    (type == 'line-chart-blue') |
    (type == 'line-chart-red') |
    (type == 'pie-chart') |
    (type == 'forest') |
    (type == 'radar')
  ) {
    ComponentClassified = DetailChart
  }

  if (type == 'table') {
    ComponentClassified = DetailTable
  }

  if (type == 'link') {
    ComponentClassified = DetailButton
  }

  if (type == 'activity') {
    ComponentClassified = DetailTag
  }

  if (type == 'highlight') {
    ComponentClassified = DetailHighlight
  }

  if (type == 'break') {
    ComponentClassified = DetailBreak
  }

  if (type == 'city') {
    ComponentClassified = SimilarCity
  }

  return (
    <ComponentClassified
      objectKey={objectKey}
      value={value}
      i={i}
      rowAt={rowAt}
      type={type}
      chartData={value.data ? value.data : [1]}
      chartName={objectKey}
      chartLabels={value.labels ? value.labels : ['1']}
    />
  )
}

export default DetailClassifier
