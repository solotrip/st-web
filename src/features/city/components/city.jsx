import React from 'react'
import Layout from './layout'
import header from './header'
import Sidebar from './sidebar'
import DetailContent from './detailContent'

import { useTranslation, Trans } from 'react-i18next'

const CityDetails = () => {
  const { t, i18n } = useTranslation(['translation'])

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
