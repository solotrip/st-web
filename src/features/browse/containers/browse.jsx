import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../recommendations/components/header'
import Content from '../components/content'
import {
  activities,
  attractions,
  costs,
  destinations,
  events,
  featured,
  languages,
  regions,
  restrictions,
  seasons,
  visas,
  weather
} from 'constants/browse'

const BrowseContainer = () => {

  return (
    <>
      <div className="flex-col">
        <Link to={'/recommendations'}>
          <Header backIsVisible={false} trackIsVisible={false}/>
        </Link>

        <Content
          events={events}
          restrictions={restrictions}
          visas={visas}
          activities={activities}
          weather={weather}
          featured={featured}
          attractions={attractions}
          seasons={seasons}
          regions={regions}
          costs={costs}
          languages={languages}
          destinations={destinations}
        />
      </div>
    </>
  )
}

export default BrowseContainer
