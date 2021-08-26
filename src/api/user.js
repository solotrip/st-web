import { axios } from '../utils/st-api-client'
import { SOLOTRIP_V1 } from '../constants/urls'

export async function getProfile() {
  const url = SOLOTRIP_V1('profile')
  const response = await axios.get(url)
  return response.data
}

export async function updateProfile(data) {
  const url = SOLOTRIP_V1('profile')
  const response = await axios.patch(url, data)
  return response.data
}


export async function getInterests() {
  const url = SOLOTRIP_V1('profile/interests')
  const response = await axios.get(url)
  return response.data
}

export async function updateInterests(data) {
  const url = SOLOTRIP_V1('profile/interests')
  const response = await axios.patch(url, data)
  return response.data
}

export async function updateLocation({ lat, lon }) {
  const url = SOLOTRIP_V1('profile/location')
  const response = await axios.put(url, { lat, lon })
  return response.data
}

export async function getAvailableDates() {
  const url = SOLOTRIP_V1('profile/available-dates')
  const response = await axios.get(url)
  return response.data
}

export async function getRecommendations({ start, end }) {
  const url = SOLOTRIP_V1('profile/recommendations')
  const response = await axios.get(url, { params: { start, end } })
  return response.data
}

export async function updateAvailableDates(
  selectedAvailableDates = [],
  excludeWeekends = false,
  excludePublicHolidays = false
) {
  const url = SOLOTRIP_V1('profile/available-dates')
  const response = await axios.patch(url, {
    selectedAvailableDates,
    availableDatePrefs: {
      excludeWeekends,
      excludePublicHolidays
    }
  })
  return response.data
}
