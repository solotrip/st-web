import { Geolocation } from '@capacitor/geolocation'
import { Capacitor } from '@capacitor/core'

export const getGeolocation = async (timeout = 5000) => {
  if (navigator && navigator.geolocation) {
    const options = {
      timeout
    }
    return new Promise(((resolve, reject) => {
      const onSuccess = ({ coords }) => resolve({
        latitude: coords.latitude,
        longitude: coords.longitude
      })
      const onError = err => reject(err)
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
    }))
  } else if (Capacitor.isPluginAvailable('Geolocation')) {

    let permissions = await Geolocation.checkPermissions()

    if (permissions.state !== 'granted') {
      permissions = await Geolocation.requestPermissions(['coarseLocation'])
      if (permissions.state !== 'granted') {
        throw new Error('Permission denied')
      }
    }
    const options = {
      timeout
    }
    const { coords } = await Geolocation.getCurrentPosition(options)

    return {
      latitude: coords.latitude,
      longitude: coords.longitude
    }
  }
  throw new Error('Geolocation is not supported')
}
