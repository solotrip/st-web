import { axios } from '../utils/st-api-client'
import { SOLOTRIP_V1 } from '../constants/urls'

export async function getNotifications() {
  const url = SOLOTRIP_V1('notifications')
  const response = await axios.get(url)
  return response.data
}

export async function registerDevice(deviceId) {
  const url = SOLOTRIP_V1('notification-devices')
  const response = await axios.post(url, { deviceId })
  return response.data
}

export async function removeDevice(deviceId) {
  const url = SOLOTRIP_V1('notification-devices')
  const response = await axios.delete(url, { deviceId })
  return response.data
}

