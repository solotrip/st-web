import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import useThemeState, {
  DARK_CLASS,
  LIGHT_CLASS,
  NO_PREF_CLASS
} from 'utils/hooks/use-theme-state'


const ThemeSwitch = () => {
  const [appTheme, setAppTheme] = useThemeState()
  const systemPrefersDark = useMediaQuery(
    {
      query: '(prefers-color-scheme: dark)'
    },
    undefined,
    prefersDark => {
      setIsDark(prefersDark)
    }
  )
  const [isDark, setIsDark] = useState(
    systemPrefersDark
  )

  const isItDarkNow = (appTheme === DARK_CLASS)
    || (appTheme === NO_PREF_CLASS && isDark)

  const toggleTheme = () => {
    const theme = isItDarkNow ? LIGHT_CLASS : DARK_CLASS
    // Save the theme preference only if it differs from system preference
    if ((isDark && theme === DARK_CLASS) || (!isDark && theme === LIGHT_CLASS)) {
      setAppTheme(NO_PREF_CLASS)
    } else {
      setAppTheme(theme)
    }
  }


  return (
    <button
      onClick={toggleTheme}>
      {isItDarkNow ? '🔆' : '🌙'} Switch
      to {isItDarkNow ? 'Light' : 'Dark'} Theme
    </button>
  )
}

ThemeSwitch.propTypes = {}

export default ThemeSwitch
