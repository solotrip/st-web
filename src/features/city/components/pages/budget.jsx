import React from 'react'

import header from '../header/header'
import Sidebar from '../sidebar/sidebar'
import DetailContent from '../content/detailContent'
import PageLayout from '../layout/page-layout'

import { useTranslation, Trans } from 'react-i18next'

import detailFetcher, { detailPartitioner } from '../detailFetcher'

const BudgetDetails = () => {
  const { t, i18n } = useTranslation(['translation'])

  //indexes of sections to include in budget page.
  let indexes = [4]
  let page = 'budget'

  var fetchedPage = detailPartitioner(indexes)

  return (
    <>
      <PageLayout
        header={header}
        sidebar={Sidebar}
        content={DetailContent}
        fetchedContent={fetchedPage}
        page={page}
        city='eskisehir'
      ></PageLayout>
      {(page = null)}
      {(indexes = null)}
      {(fetchedPage = null)}
    </>
  )
}

export default BudgetDetails
