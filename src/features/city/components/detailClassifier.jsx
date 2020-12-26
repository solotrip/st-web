import React from 'react'
import DetailCell from './elements/detailCell'
import DetailChart from './elements/detailChart'
import DetailTable from './elements/detailTable'
import DetailMedia from './elements/detailMedia'
import DetailTag from './elements/detailTag'
import DetailButton from './elements/detailButton'

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
