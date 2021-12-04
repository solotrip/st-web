import axios from 'axios'
import { refresh } from '../api/auth'
import jwt from 'jsonwebtoken'
import { Storage } from '@capacitor/storage'

let refreshPromise
let refreshCancelSource
let token

/**
 * Refreshes the access token if user has logged in
 * If the refresh token has expired it clears all tokens
 * @return {Promise<boolean>} Is user logged in
 */
export const initializeAuthentication = async () => {
  if (await hasLoggedIn()) {
    if (await _isRefreshTokenExpired()) {
      await clearTokens()
    } else {
      try {
        if(await _isAccessTokenExpired()) {
          await refreshTokenAsync()

        }
        return {
          isAuthenticated: true,
          isGuest: await getIsGuest(),
          username: await getUsername()
        }
      } catch (e) {
        await clearTokens()
      }
    }
  }
  return { isAuthenticated: false }
}

export const hasLoggedIn = async () => {
  return  (await getAccessToken()) && (await _getRefreshToken())
}

export const getUsername = async () => {
  const decodedToken = jwt.decode(await getAccessToken())
  return decodedToken.username
}

export const getIsGuest = async () => {
  const decodedToken = jwt.decode(await getAccessToken())
  return decodedToken.isGuest
}

const _isTokenExpired = token => {
  const decodedToken = jwt.decode(token, { complete: true })
  const dateNow = new Date()
  return decodedToken.payload.exp < Math.floor(dateNow.getTime() / 1000) + 60
}

const _isAccessTokenExpired = async () => {
  return _isTokenExpired(await getAccessToken())
}

const _isRefreshTokenExpired = async () => {
  return _isTokenExpired(await _getRefreshToken())
}

export const areTokensValid = async () => {
  const refreshToken = await _getRefreshToken()
  const accessToken =  await getAccessToken()
  return accessToken && refreshToken
    && !_isTokenExpired(refreshToken)
    && !_isTokenExpired(accessToken)
}

const _getRefreshToken = async () => {
  const { value } = await Storage.get({ key:'refreshToken' })
  return value
}

export const getValidAccessToken = async () => {
  let token = await getAccessToken()
  if (token && _isTokenExpired(token)) {
    await refreshTokenAsync()
    token = await getAccessToken()
  }
  return token
}

/**
 * Get the access token. It refreshes the access token if it is expired
 * @return {string} valid access token
 */
const getAccessToken = async () => {
  if (!token) {
    const { value } = await Storage.get({ key:'accessToken' })
    token = value
  }
  return token
}

export const updateAccessToken = async newToken => {
  token = newToken
  await Storage.set({ key:'accessToken', value:newToken })
}

export const updateRefreshToken = async newToken => {
  await Storage.set({ key:'refreshToken',  value:newToken })
}

export const clearTokens  =async () => {
  token = null
  if (refreshPromise) {
    refreshCancelSource.cancel()
    refreshPromise = null
  }
  await Storage.remove({ key:'accessToken' })
  await Storage.remove({ key:'refreshToken' })
}


export const refreshTokenAsync = async () => {
  if (refreshPromise) {
    return refreshPromise
  }
  const refreshToken = await _getRefreshToken()
  refreshCancelSource = axios.CancelToken.source()
  try {
    const { accessToken } = await refresh({
      refreshToken,
      cancelToken: refreshCancelSource.token
    })
    refreshCancelSource = null
    await updateAccessToken(accessToken)
  } catch (e) {
    // If it is not cancelled bubble the error up
    // If it is cancelled that means we are already handling some error
    if (!axios.isCancel(e)) {
      throw e
    }
  }
}

