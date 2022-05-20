import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isBrowser } from 'react-device-detect'
import {
  clearTokens,
  initializeAuthentication,
  updateAccessToken,
  updateRefreshToken
} from 'utils/auth'
import { fetchProfile } from 'features/profile/slice'
import * as AuthApi from 'api/auth'
import { registerDevice } from 'utils/notification'
import { fetchTracked, trackSelector } from 'features/track/slice'
import { fetchWishlist, wishlistSelector } from 'features/wishlist/slice'
import { FirebaseAuthentication } from '@robingenz/capacitor-firebase-authentication'
import {
  fetchFilters,
  filtersSelector
} from 'features/recommendations/containers/filters/slice'
import _get from 'lodash/get'
import {
  fetchExchangeRates,
  exchangeRatesSelector
} from 'reducers/exchangeRatesSlice'

import { Mixpanel } from 'analytics/mixpanel'

const createCustomAsyncThunk = (type, payloadCreator, options) =>
  createAsyncThunk(
    type,
    async (params, thunkAPI) => {
      try {
        return await payloadCreator(params, thunkAPI)
      } catch (e) {
        if (_get(e, 'response.data')) {
          return thunkAPI.rejectWithValue(e.response.data)
        } else {
          throw e
        }
      }
    },
    options
  )

export const login = createCustomAsyncThunk(
  'auth/login',
  async ({ email, password, history }, { dispatch }) => {
    const { accessToken, refreshToken } = await AuthApi.login({
      email,
      password
    })
    await updateAccessToken(accessToken)
    await updateRefreshToken(refreshToken)
    dispatch(fetchProfile({ history }))

    Mixpanel.identify(email)
    Mixpanel.track('Successful login')
    Mixpanel.people.set({
      $email: email
    })

    history.replace('/browse')
  }
)

export const loginWithGoogle = createCustomAsyncThunk(
  'auth/login',
  async ({ history }, { dispatch }) => {
    await FirebaseAuthentication.signInWithGoogle()
    const { token } = await FirebaseAuthentication.getIdToken()
    const { accessToken, refreshToken } = await AuthApi.loginWithGoogle({
      token
    })
    await updateAccessToken(accessToken)
    await updateRefreshToken(refreshToken)
    dispatch(fetchProfile({ history }))
    history.replace('/browse')
  }
)

export const loginWithApple = createCustomAsyncThunk(
  'auth/login',
  async ({ history }, { dispatch }) => {
    await FirebaseAuthentication.signInWithApple()
    const { token } = await FirebaseAuthentication.getIdToken()
    const { accessToken, refreshToken } = await AuthApi.loginWithApple({
      token
    })
    await updateAccessToken(accessToken)
    await updateRefreshToken(refreshToken)
    dispatch(fetchProfile({ history }))
    history.replace('/browse')
  }
)

export const logout = createAsyncThunk(
  '' + 'auth/logout',
  async ({ history }, { dispatch }) => {
    await clearTokens()
    await FirebaseAuthentication.signOut()
    if (isBrowser) {
      history.push('/login')
    } else {
      history.replace('/')
      history.go(0)
    }
  }
)

export const createGuest = createAsyncThunk(
  'auth/createGuest',
  async ({ history }, { dispatch }) => {
    const { accessToken, refreshToken } = await AuthApi.createGuestUser()
    await updateAccessToken(accessToken)
    await updateRefreshToken(refreshToken)
    dispatch(fetchProfile({ history }))
  }
)

export const register = createCustomAsyncThunk(
  'auth/register',
  async (
    { name, username, email, password, history, redirectTo },
    { dispatch }
  ) => {
    const { accessToken, refreshToken } = await AuthApi.register({
      name,
      username,
      email,
      password
    })
    await updateAccessToken(accessToken)
    await updateRefreshToken(refreshToken)
    dispatch(fetchProfile({ history }))

    Mixpanel.identify(email)
    Mixpanel.track('Successful register')
    Mixpanel.people.set({
      $email: email
    })
    history.replace(redirectTo)
  }
)


/**
 * Creates guest user if user is not authenticated
 */
export const initialize = createAsyncThunk(
  'auth/init',
  async (
    { history } = false,
    { dispatch, getState, rejectWithValue }
  ) => {
    const {
      isAuthenticated,
      isGuest,
      username
    } = await initializeAuthentication()

    if (!filtersSelector(getState()).initialized) {
      dispatch(fetchFilters())
    }
    if (!exchangeRatesSelector(getState()).initialized) {
      dispatch(fetchExchangeRates())
    }

    if (!isAuthenticated) {
      dispatch(createGuest({ history }))
    } else {
      // Fetch profile only once to prevent unnecessary calls
      if (isAuthenticated) {
        try {
          if (getState().profile.data === null) {
            dispatch(fetchProfile({ history }))
          }
          if (!trackSelector(getState()).initialized) {
            dispatch(fetchTracked())
          }
          if (!wishlistSelector(getState()).initialized) {
            dispatch(fetchWishlist())
          }
        } catch (e) {
          dispatch(logout({ history }))
          return rejectWithValue({ isAuthenticated: false, isGuest: false })
        }
        await registerDevice(history)
      }

      return {
        isAuthenticated,
        isGuest,
        username
      }
    }
  }
)

const initialState = {
  error: null,
  loading: true,
  actionInProgress: false,
  isAuthenticated: false,
  isGuest: false,
  username: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset (state) {
      state = { ...initialState }
    }
  },
  extraReducers: {
    [initialize.pending]: state => {
      state.error = null
      if (!state.isAuthenticated) {
        state.loading = true
      }
    },
    [initialize.fulfilled]: (state, action) => {
      if (action.payload) {
        state.isAuthenticated = action.payload.isAuthenticated
        if (state.isAuthenticated) {
          state.username = action.payload.username
          state.isGuest = action.payload.isGuest
        }
        state.loading = false
      }
    },
    [initialize.error]: (state, action) => {
      state.isAuthenticated = false
      state.loading = true
      state.error = _get(action.error, 'data', JSON.stringify(action.error))
    },
    [createGuest.pending]: state => {
      state.error = null
      state.loading = true
      state.isAuthenticated = false
    },
    [createGuest.fulfilled]: state => {
      state.isAuthenticated = true
      state.username = 'Guest'
      state.isGuest = true
      state.loading = false
    },
    [createGuest.error]: (state, action) => {
      state.isAuthenticated = false
      state.loading = true
      state.error = _get(action.error, 'data', action.error.message)
    },
    [login.pending]: state => {
      state.error = null
      state.actionInProgress = true
    },
    [loginWithApple.pending]: state => {
      state.error = null
      state.actionInProgress = true
    },
    [loginWithGoogle.pending]: state => {
      state.error = null
      state.actionInProgress = true
    },
    [login.fulfilled]: state => {
      state.isAuthenticated = true
      state.isGuest = false
      state.actionInProgress = false
    },
    [loginWithApple.fulfilled]: state => {
      state.isAuthenticated = true
      state.isGuest = false
      state.actionInProgress = false
    },
    [loginWithGoogle.fulfilled]: state => {
      state.isAuthenticated = true
      state.isGuest = false
      state.actionInProgress = false
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload
      state.actionInProgress = false
    },
    [loginWithApple.rejected]: (state, action) => {
      state.error = action.payload
      state.actionInProgress = false
    },
    [loginWithGoogle.rejected]: (state, action) => {
      state.error = action.payload
      state.actionInProgress = false
    },
    [register.pending]: state => {
      state.error = null
      state.actionInProgress = true
    },
    [register.fulfilled]: state => {
      state.isAuthenticated = true
      state.isGuest = false
      state.actionInProgress = false
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload
      state.actionInProgress = false
    },
    [logout.fulfilled]: state => {
      state = { ...initialState, loading: false }
    }
  }
})

export const { reset } = authSlice.actions
export const authSelector = state => state.auth
export default authSlice.reducer
