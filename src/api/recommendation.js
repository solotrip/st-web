import { axios } from '../utils/st-api-client'
import { SOLOTRIP_V1 } from '../constants/urls'

export async function getRecommendations (query) {
  const url = SOLOTRIP_V1('profile/recommendations')
  const response = await axios.get(url, {
    params: query
  })
  return response.data
}

export async function getWishlist () {
  const url = SOLOTRIP_V1('profile/wishlist')
  const response = await axios.get(url)
  return response.data
}

export async function addToWishlist (query) {
  const url = SOLOTRIP_V1('profile/wishlist')
  const response = await axios.post(url, null, { params: query })
  return response.data
}

export async function removeFromWishlist (wishlistId) {
  const url = SOLOTRIP_V1(`profile/wishlist/${wishlistId}`)
  const response = await axios.delete(url)
  return response.data
}

export async function trackQuery (recommendationId, name = '') {
  const url = SOLOTRIP_V1(`subscription/${recommendationId}`)
  const data = name === '' ? null : { name }
  const response = await axios.post(url, data)
  return response.data
}

export async function getTrackedQuery (recommendationId) {
  const url = SOLOTRIP_V1(`subscription/${recommendationId}`)
  const response = await axios.get(url)
  return response.data
}

export async function stopTrackingQuery (recommendationId) {
  const url = SOLOTRIP_V1(`subscription/${recommendationId}`)
  const response = await axios.delete(url)
  return response.data
}

export async function getTrackedQueries () {
  const url = SOLOTRIP_V1('subscription')
  const response = await axios.get(url)
  return response.data
}

export async function getHolidays (country) {
  const url = SOLOTRIP_V1(`holidays/country/${country}`)
  const response = await axios.get(url)
  return response.data
}
