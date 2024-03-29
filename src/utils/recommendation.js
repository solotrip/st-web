import _get from 'lodash/get'
import { DARK_IMG_PLACEHOLDER, LIGHT_IMG_PLACEHOLDER } from 'constants/urls'
import { getImagePath, getSourceSet, SUPPORTED_SIZES } from './image'

export const processRecommendation = (recommendation, passports = []) => {
  let visaText = ''
  let vaccinatedTestText = ''
  let vaccinatedQuarantineText = ''
  let unvaccinatedTestText = ''
  let unvaccinatedQuarantineText = ''
  let restaurantText = ''
  let attractionsText = ''
  let temperatureText = ''
  let minTemp = ''
  let maxTemp = ''
  let humidity = ''
  let rainyDays = ''
  let weatherText = ''
  let maskText = ''
  let barText = ''
  let publicTransportText = ''
  if (recommendation !== undefined) {
    const { country, climate = {} } = recommendation

    let approvedPassports = []

    //check visa status.
    const checkVisaFreeFor = passport => {
      if (country && country['visa_free_for'] && country['visa_free_for'].includes(passport)) {
        approvedPassports.push(passport)
      }
      return country['visa_free_for'].includes(passport)
    }

    const checkVisaOnArrivalFor = passport => {
      if (
        country &&
        country['visa_on_arrival_for'] &&
        country['visa_on_arrival_for'].includes(passport)
      ) {
        approvedPassports.push(passport)
      }
      return country['visa_on_arrival_for'].includes(passport)
    }
    if (passports.length > 0) {
      let isVisaFree = passports.some(checkVisaFreeFor)

      if (isVisaFree) {
        visaText = 'Visa free for you.'
      } else {
        let isVisaOnArrival = passports.some(checkVisaOnArrivalFor)
        if (isVisaOnArrival) {
          visaText = 'Visa on Arrival'
        } else {
          visaText = 'Visa required.'
        }
      }
    }
    //Restrictions
    let { restrictions = {} } = country

    //Vaccinated Test Required
    if (restrictions && restrictions['vaccinated_arrival_test_required']) {
      vaccinatedTestText = 'Test Required for vaccinated.'
    } else if (restrictions && !restrictions['vaccinated_arrival_test_required']) {
      vaccinatedTestText = 'Test not required for vaccinated.'
    } else {
      vaccinatedTestText = 'No information about test procedure for vaccinated people.'
    }
    //Unvaccinated Test Required
    if (restrictions && restrictions['arrival_test_required']) {
      unvaccinatedTestText = 'Test Required for unvaccinated.'
    } else if (restrictions && !restrictions['arrival_test_required']) {
      unvaccinatedTestText = 'Test not required for unvaccinated.'
    } else {
      unvaccinatedTestText = 'No information about test procedure for unvaccinated people.'
    }
    //Vaccinated Quarantine Required
    if (restrictions && restrictions['vaccinated_arrival_quarantine_required']) {
      vaccinatedQuarantineText = 'Quarantine Required for vaccinated.'
    } else if (restrictions && !restrictions['vaccinated_arrival_quarantine_required']) {
      vaccinatedQuarantineText = 'Quarantine not required for vaccinated.'
    } else {
      vaccinatedQuarantineText = 'No information about quarantine procedure for vaccinated people.'
    }
    //Unvaccinated Quarantine Required
    if (restrictions && restrictions['arrival_quarantine_required']) {
      unvaccinatedQuarantineText = 'Quarantine Required for unvaccinated.'
    } else if (restrictions && !restrictions['arrival_quarantine_required']) {
      unvaccinatedQuarantineText = 'Quarantine not required for unvaccinated.'
    } else {
      unvaccinatedQuarantineText =
        'No information about quarantine procedure for unvaccinated people.'
    }

    //restaurant status
    if (restrictions && restrictions['restaurant_status'] === 'OPEN') {
      restaurantText = 'Restaurants are open.'
    } else if (!restrictions['restaurant_status']) {
      restaurantText = 'No information about restaurant status.'
    } else if (restrictions && restrictions['restaurant_status'] === 'CLOSED') {
      restaurantText = 'Restaurants are closed.'
    } else if (restrictions && restrictions['restaurant_status'] === 'RESTRICTIONS') {
      restaurantText = 'Restaurants are restricted.'
    }

    if (restrictions && restrictions['Tourist Attractions'] === 'Open') {
      attractionsText = 'Attractions are open.'
    } else if (!restrictions['Tourist Attractions']) {
      attractionsText = 'No information about attraction status.'
    } else if (restrictions && restrictions['Tourist Attractions'] === 'Closed') {
      attractionsText = 'Attractions are closed.'
    } else if (restrictions && restrictions['Tourist Attractions'] === 'Partially Open') {
      attractionsText = 'Attractions are restricted.'
    }

    //Adding the temperature.
    if (climate.t_min && climate.t_max) {
      temperatureText = `min ${climate.t_min}°C, max ${climate.t_max}°C`
      minTemp = climate.t_min
      maxTemp = climate.t_max
    }

    //Adding the general weather.
    if (
      recommendation.climate.humidity &&
      recommendation.climate.rainy_days &&
      recommendation.climate.rainy_days !== 1
    ) {
      weatherText =
        `Rainy days: ${recommendation.climate.rainy_days} days/month, ` +
        `humidity: ${recommendation.climate.humidity}%`
    } else if (recommendation.climate.humidity && recommendation.climate.rainy_days) {
      weatherText =
        `Rainy days: ${recommendation.climate.rainy_days} day/month, ` +
        `humidity: ${recommendation.climate.humidity}%`
    }

    humidity = recommendation.climate.humidity
    rainyDays = recommendation.climate.rainy_days

    //Adding the mask status.
    if (restrictions['mask_status'] === 'REQUIRED') {
      maskText = 'Mask required.'
    } else if (restrictions['mask_status'] === null) {
      maskText = 'No information about face mask requirement.'
    } else if (restrictions['mask_status'] === 'NOT_REQUIRED') {
      maskText = 'Face mask not required.'
    } else if (restrictions['mask_status'] === 'RECOMMENDED') {
      maskText = 'Face mask  advised.'
    }

    //Adding the bar status.
    if (restrictions['bar_status'] === 'OPEN') {
      barText = 'Bars are open.'
    } else if (restrictions['bar_status'] === null) {
      barText = 'No information about Bars.'
    } else if (restrictions['bar_status'] === 'CLOSED') {
      barText = 'Bars are closed.'
    } else if (restrictions['bar_status'] === 'RESTRICTIONS') {
      barText = 'Bars are restricted.'
    }

    //Adding the public transport.
    if (restrictions['Public Transport'] === 'Operating') {
      publicTransportText = 'Public transportation is operational.'
    } else if (restrictions['Public Transport'] === null) {
      publicTransportText = 'No information about Public transportation.'
    } else if (restrictions['Public Transport'] === 'Partial Restrictions') {
      publicTransportText = 'Public transport is restricted.'
    }
  }
  return {
    visaText,
    vaccinatedTestText,
    vaccinatedQuarantineText,
    unvaccinatedTestText,
    unvaccinatedQuarantineText,
    restaurantText,
    attractionsText,
    temperatureText,
    minTemp,
    maxTemp,
    weatherText,
    humidity,
    rainyDays,
    maskText,
    barText,
    publicTransportText
  }
}

export const getEventImage = (event, isLightTheme, size = SUPPORTED_SIZES['1080']) => {
  const img = _get(event, 'images[0]')
  if (!img) {
    return isLightTheme ? LIGHT_IMG_PLACEHOLDER : DARK_IMG_PLACEHOLDER
  }
  return getImagePath(img, size)
}

export const getEventSourceSet = (event, isLightTheme, size = SUPPORTED_SIZES['1080']) => {
  const img = _get(event, 'images[0]')
  if (!img) {
    return isLightTheme ? LIGHT_IMG_PLACEHOLDER : DARK_IMG_PLACEHOLDER
  }
  // eslint-disable-next-line max-len
  return getSourceSet(img, [
    SUPPORTED_SIZES['720'],
    SUPPORTED_SIZES['1080'],
    SUPPORTED_SIZES['1920']
  ])
}

export const getPoiImage = (poi, isLightTheme) => {
  return _get(poi, 'poi_image_hash', isLightTheme ? LIGHT_IMG_PLACEHOLDER : DARK_IMG_PLACEHOLDER)
}
export const getDefaultImage = (poi, isLightTheme) => {
  return _get(poi, '', isLightTheme ? LIGHT_IMG_PLACEHOLDER : DARK_IMG_PLACEHOLDER)
}

export const reformatQuery = query => {
  const newQuery = { ...query }
  if (query.months) {
    newQuery.months = query.months.map(month => parseInt(month.split('-')[1]))
  }
  return newQuery
}
