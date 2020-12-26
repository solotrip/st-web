import React from 'react'
import Layout from './layout'
import header from './header'
import Sidebar from './sidebar'
import DetailContent from './detailContent'

const CityDetails = () => {
  return (
    <>
      <Layout
        header={header}
        sidebar={Sidebar}
        content={DetailContent}
      ></Layout>
    </>
  )
}

export default CityDetails
