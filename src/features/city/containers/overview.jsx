import React from 'react'
import { useParams } from 'react-router-dom'
import Page from '../components/page'
import data from '../mock-data'


const pageToDataMap = {
  'overview': [data[0], data[1]],
  'budget': [data[4]],
  'culture': [data[8]],
  'flights': [data[5]],
  'scores': [data[3]],
  'transportation': [data[9]],
  'visa-status': [data[6]],
  'weather-and-nature': [data[7]],
  'activities': [data[2]]
}

const OverviewContainer = () => {
  let { sid } = useParams()
  return (
    <Page
      sections={Object.keys(pageToDataMap)}
      data={[data[0], data[1]]}
      city={sid}
    />
  )
}

export default OverviewContainer
