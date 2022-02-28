export const processRecommendation = (recommendation, passports = []) => {
  let visaText = ''
  let visaSubText = ''
  let vaccinatedTestText = ''
  let vaccinatedQuarantineText = ''
  let unvaccinatedTestText = ''
  let unvaccinatedQuarantineText = ''
  let restaurantText = ''
  let attractionsText = ''
  let temperatureText = ''
  let minTemp = ''
  let maxTemp = ''
  let weatherText = ''
  let maskText = ''
  let barText = ''
  let publicTransportText = ''
  if (recommendation !== undefined) {
    const { country, climate = {} } = recommendation

    let approvedPassports = []

    //check visa status.
    const checkVisaFreeFor = passport => {
      if (
        country &&
        country['visa_free_for'] &&
        country['visa_free_for'].includes(passport.value)
      ) {
        approvedPassports.push(passport)
      }
      return country['visa_free_for'].includes(passport.value)
    }

    const checkVisaOnArrivalFor = passport => {
      if (
        country &&
        country['visa_on_arrival_for'] &&
        country['visa_on_arrival_for'].includes(passport.value)
      ) {
        approvedPassports.push(passport)
      }
      return country['visa_on_arrival_for'].includes(passport.value)
    }

    let isVisaFree = passports.some(checkVisaFreeFor)
    if (isVisaFree) {
      visaText = 'Visa free for you.'
      visaSubText = `Passport of ${approvedPassports[0].label}`
    } else {
      let isVisaOnArrival = passports.some(checkVisaOnArrivalFor)
      if (isVisaOnArrival) {
        visaText = 'Visa on Arrival'
        visaSubText = `Passport of ${approvedPassports[0].label}`
      } else {
        visaText = 'Visa required.'
        visaSubText = `Visa requirements of ${country.name}`
      }
    }
    //Restrictions
    let { restrictions = {} } = country

    //Vaccinated Test Required
    if (restrictions && restrictions['vaccinated_arrival_test_required']) {
      vaccinatedTestText = 'Test Required for vaccinated.'
    } else if (!restrictions['vaccinated_arrival_test_required']) {
      vaccinatedTestText =
        'No information about test procedure for vaccinated people.'
    } else {
      vaccinatedTestText = 'Test not required for vaccinated.'
    }
    //Unvaccinated Test Required
    if (restrictions && restrictions['arrival_test_required']) {
      unvaccinatedTestText = 'Test Required for unvaccinated.'
    } else if (!restrictions['arrival_test_required']) {
      unvaccinatedTestText =
        'No information about test procedure for unvaccinated people.'
    } else {
      unvaccinatedTestText = 'Test not required for unvaccinated.'
    }
    //Vaccinated Quarantine Required
    if (
      restrictions &&
      restrictions['vaccinated_arrival_quarantine_required']
    ) {
      vaccinatedQuarantineText = 'Quarantine Required for vaccinated.'
    } else if (!restrictions['vaccinated_arrival_quarantine_required']) {
      vaccinatedQuarantineText =
        'No information about quarantine procedure for vaccinated people.'
    } else {
      vaccinatedQuarantineText = 'Quarantine not required for vaccinated.'
    }
    //Unvaccinated Quarantine Required
    if (restrictions && restrictions['arrival_quarantine_required']) {
      unvaccinatedQuarantineText = 'Quarantine Required for unvaccinated.'
    } else if (!restrictions['arrival_quarantine_required']) {
      unvaccinatedQuarantineText =
        'No information about quarantine procedure for unvaccinated people.'
    } else {
      unvaccinatedQuarantineText = 'Quarantine not required for unvaccinated.'
    }

    //restaurant status
    if (restrictions && restrictions['restaurant_status'] === 'OPEN') {
      restaurantText = 'Restaurants are open.'
    } else if (!restrictions['restaurant_status']) {
      restaurantText = 'No information about restaurant status.'
    } else if (restrictions && restrictions['restaurant_status'] === 'CLOSED') {
      restaurantText = 'Restaurants are closed.'
    } else if (
      restrictions &&
      restrictions['restaurant_status'] === 'RESTRICTIONS'
    ) {
      restaurantText = 'Restaurants are restricted.'
    }

    if (restrictions && restrictions['Tourist Attractions'] === 'Open') {
      attractionsText = 'Attractions are open.'
    } else if (!restrictions['Tourist Attractions']) {
      attractionsText = 'No information about attraction status.'
    } else if (
      restrictions &&
      restrictions['Tourist Attractions'] === 'Closed'
    ) {
      attractionsText = 'Attractions are closed.'
    } else if (
      restrictions &&
      restrictions['Tourist Attractions'] === 'Partially Open'
    ) {
      attractionsText = 'Attractions are restricted.'
    }

    //Adding the temperature.
    if (climate.t_min && climate.t_max) {
      temperatureText = `min ${climate.t_min}°C, max ${climate.t_max}°C`
      minTemp = climate.t_min
      maxTemp = climate.t_max
    }

    //Adding the general weather.
    if (recommendation.climate.humidity && recommendation.climate.rainy_days) {
      weatherText = `Rainy days: ${recommendation.climate.rainy_days}, `+
        `humidity ${recommendation.climate.humidity}`
    }

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
    visaSubText,
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
    maskText,
    barText,
    publicTransportText
  }
}
