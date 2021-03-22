import React from 'react'
import { CityCard } from 'components'

const imgTemp =
  'https://images.unsplash.com/photo-1536257104079-aa99c6460a5a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1420&q=80'

const SimilarCity = ({ value }) => {
  return (
    <CityCard image={imgTemp} name={value} id={value}/>
  )
}

export default SimilarCity
