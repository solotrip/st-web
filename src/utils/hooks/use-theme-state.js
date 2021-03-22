import createPersistedState from 'use-persisted-state'
const useThemeState = createPersistedState('theme')
export const DARK_CLASS = 'dark'
export const LIGHT_CLASS = 'light'
export const NO_PREF_CLASS = 'no-preference'
export default useThemeState
