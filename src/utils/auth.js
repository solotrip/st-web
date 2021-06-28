import axios from 'axios'
import { refresh } from '../api/auth'
import jwt from 'jsonwebtoken'

let refreshPromise
let refreshCancelSource
let token

/**
 * Refreshes the access token if user has logged in
 * If the refresh token has expired it clears all tokens
 * @return {Promise<boolean>} Is user logged in
 */
export const initializeAuthentication = async () => {
  if (hasLoggedIn()) {
    if (_isRefreshTokenExpired()) {
      clearTokens()
    } else {
      try {
        if(_isAccessTokenExpired()) {
          await refreshTokenAsync()

        }
        return {
          isAuthenticated: true,
          isGuest: getIsGuest(),
          username: getUsername()
        }
      } catch (e) {
        clearTokens()
      }
    }
  }
  return { isAuthenticated: false }
}

export const hasLoggedIn = () => {
  return getAccessToken() && _getRefreshToken()
}

export const getUsername = () => {
  const decodedToken = jwt.decode(getAccessToken())
  return decodedToken.username
}

export const getIsGuest = () => {
  const decodedToken = jwt.decode(getAccessToken())
  return decodedToken.isGuest
}

const _isTokenExpired = token => {
  const decodedToken = jwt.decode(token, { complete: true })
  const dateNow = new Date()
  return decodedToken.payload.exp < Math.floor(dateNow.getTime() / 1000) + 60
}

const _isAccessTokenExpired = () => {
  return _isTokenExpired(getAccessToken())
}

const _isRefreshTokenExpired = () => {
  return _isTokenExpired(_getRefreshToken())
}

export const areTokensValid = () => {
  const refreshToken = _getRefreshToken()
  const accessToken = getAccessToken()
  return accessToken && refreshToken
    && !_isTokenExpired(refreshToken)
    && !_isTokenExpired(accessToken)
}

const _getRefreshToken = () => {
  return localStorage.getItem('refreshToken')
}

export const getValidAccessToken = async () => {
  let token = getAccessToken()
  if (token && _isTokenExpired(token)) {
    await refreshTokenAsync()
    token = getAccessToken()
  }
  return token
}

/**
 * Get the access token. It refreshes the access token if it is expired
 * @return {string} valid access token
 */
const getAccessToken = () => {
  if (!token) {
    token = localStorage.getItem('accessToken')
  }
  return token
}

export const updateAccessToken = newToken => {
  token = newToken
  localStorage.setItem('accessToken', newToken)
}

export const updateRefreshToken = newToken => {
  localStorage.setItem('refreshToken', newToken)
}

export const clearTokens = () => {
  token = null
  if (refreshPromise) {
    refreshCancelSource.cancel()
    refreshPromise = null
  }
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}


export const refreshTokenAsync = async () => {
  if (refreshPromise) {
    return refreshPromise
  }
  const refreshToken = _getRefreshToken()
  refreshCancelSource = axios.CancelToken.source()
  try {
    const { accessToken } = await refresh({
      refreshToken,
      cancelToken: refreshCancelSource.token
    })
    refreshCancelSource = null
    updateAccessToken(accessToken)
  } catch (e) {
    // If it is not cancelled bubble the error up
    // If it is cancelled that means we are already handling some error
    if (!axios.isCancel(e)) {
      throw e
    }
  }
}

