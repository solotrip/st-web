export const getGeolocation = async (timeout = 5000) => {
  if (!navigator || !navigator.geolocation) {
    throw new Error('Geolocation is not supported')
  }
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
}
