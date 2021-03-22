import React from 'react'

import Header from '../header/header'
import Sidebar from '../sidebar/sidebar'
import DetailContent from '../content/detailContent'
import { Layout } from 'components'

const Page = ({ city, data, sections }) => {

  return (
    <Layout
      header={<Header/>}
      sidebar={<Sidebar city={city} items={sections}/>}
    >
      <DetailContent details={data}/>
    </Layout>
  )
}

export default Page
