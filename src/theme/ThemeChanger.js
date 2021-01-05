/* eslint-disable */
import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import styles from './ThemeChanger.module.scss'
import DetailContent from '../features/city/components/detailContent'

const ThemeChanger = ({ page }) => {
  const [themeState, setThemeState] = useState(true)
  const { t, i18n } = useTranslation(['translation'])

  var element = document.getElementsByClassName(
    'sidebar_whiteItemBackground__1toqw'
  )

  if (page == 'city') {
    var text = document.getElementsByClassName('sidebar_selectedItem__2vdyr')

    var back = document.getElementsByClassName('sidebar_toc__wdCC_')

    var cell = document.getElementsByClassName('detailCell_cell__LNP8P')

    var navbar = document.getElementsByClassName('header_header__2Wfjy')

    var tag = document.getElementsByClassName('detailTag_wrapper__x81PX')

    var cityTabBar = document.getElementsByClassName('layout_tabBar__OFXLm')

    var cityPageBackground = document.getElementsByClassName(
      'layout_layout__1idy2'
    )

    var cityShrink = document.getElementsByClassName('header_shrink__3E5NY')
  } else if (page == 'login') {
    var loginLayout = document.getElementsByClassName(
      'alternative-login-page_layout__2yPTZ'
    )

    var loginBox = document.getElementsByClassName(
      'alternative-login-page_loginBox__3b02I'
    )

    var loginBoxHeader = document.getElementsByClassName(
      'alternative-login-page_heading__1kMeK'
    )

    var loginBoxLink = document.getElementsByClassName(
      'alternative-login-page_link__1bbEr'
    )

    var loginRememberMe = document.getElementsByClassName(
      'checkbox_labelContainer__1D4fu'
    )
  } else if (page == 'signup') {
    var signupLayout = document.getElementsByClassName(
      'alternative-signup-page_layout__VyK1H'
    )

    var signupBox = document.getElementsByClassName(
      'alternative-signup-page_loginBox__1Fqug'
    )

    var signupBoxHeader = document.getElementsByClassName(
      'alternative-signup-page_heading__2WBiY'
    )

    var signupBoxLink = document.getElementsByClassName(
      'alternative-signup-page_link__2pWML'
    )

    var signupTermsOfUse = document.getElementsByClassName(
      'checkbox_labelContainer__1D4fu'
    )
  }

  var mainPageBackground = document.getElementsByClassName(
    'layout_layout__3zzgH'
  )
  var tabBar = document.getElementsByClassName('layout_tabBar__1e2w0')
  var shrink = document.getElementsByClassName('header_shrink__2mEqi')
  var search = document.getElementsByClassName('search-page_search__1_xkO')
  var toctitle = document.getElementsByClassName('accordion_name__aJvu_')

  const handleChange = () => {
    if (themeState) {
      if (page == 'city') {
        document
          .querySelector('#root > div > div.main')
          .classList.add('dark-mode')

        for (var i = 0; i < element.length; i++) {
          element[i].classList.add('dark-mode')
        }
        for (var j = 0; j < text.length; j++) {
          text[j].classList.add('dark-mode')
        }

        for (var z = 0; z < tag.length; z++) {
          tag[z].classList.add('dark-mode')
        }

        back[0].classList.add('dark-mode')

        navbar[0].classList.add('dark-mode')

        cityPageBackground[0].classList.add('dark-mode')

        cityShrink[0] && cityShrink[0].classList.add('dark-mode')

        cityTabBar[0].classList.add('dark-mode')

        for (var t = 0; t < cell.length; t++) {
          cell[t].classList.add('dark-mode')
        }
      } else if (page == 'login') {
        loginLayout && loginLayout[0].classList.add('dark-mode')
        loginBox && loginBox[0].classList.add('dark-mode')
        loginBoxHeader && loginBoxHeader[0].classList.add('dark-mode')
        loginBoxLink && loginBoxLink[0].classList.add('dark-mode')
        loginRememberMe && loginRememberMe[0].classList.add('dark-mode')
      } else if (page == 'signup') {
        signupLayout && signupLayout[0].classList.add('dark-mode')
        signupBox && signupBox[0].classList.add('dark-mode')
        signupBoxHeader && signupBoxHeader[0].classList.add('dark-mode')
        signupBoxLink && signupBoxLink[0].classList.add('dark-mode')
        signupTermsOfUse && signupTermsOfUse[0].classList.add('dark-mode')
      } else {
        mainPageBackground[0].classList.add('dark-mode')
        tabBar[0].classList.add('dark-mode')
        shrink[0] && shrink[0].classList.add('dark-mode')
        search[0] && search[0].classList.add('dark-mode')
        for (var x = 0; x < toctitle.length; x++) {
          toctitle[x].classList.add('dark-mode')
        }
      }

      setThemeState(!themeState)
      localStorage.setItem('Theme', 'dark')
    } else {
      if (page == 'city') {
        document
          .querySelector('#root > div > div.main')
          .classList.remove('dark-mode')

        for (var i = 0; i < element.length; i++) {
          element[i].classList.remove('dark-mode')
        }
        for (var j = 0; j < text.length; j++) {
          text[j].classList.remove('dark-mode')
        }

        for (var z = 0; z < tag.length; z++) {
          tag[z].classList.remove('dark-mode')
        }

        back[0].classList.remove('dark-mode')
        navbar[0].classList.remove('dark-mode')

        cityPageBackground[0].classList.remove('dark-mode')

        cityShrink[0] && cityShrink[0].classList.remove('dark-mode')

        cityTabBar[0].classList.remove('dark-mode')

        for (var t = 0; t < cell.length; t++) {
          cell[t].classList.remove('dark-mode')
        }
      } else if (page == 'login') {
        loginLayout && loginLayout[0].classList.remove('dark-mode')
        loginBox && loginBox[0].classList.remove('dark-mode')
        loginBoxHeader && loginBoxHeader[0].classList.remove('dark-mode')
        loginBoxLink && loginBoxLink[0].classList.remove('dark-mode')
        loginRememberMe && loginRememberMe[0].classList.remove('dark-mode')
      } else if (page == 'signup') {
        signupLayout && signupLayout[0].classList.remove('dark-mode')
        signupBox && signupBox[0].classList.remove('dark-mode')
        signupBoxHeader && signupBoxHeader[0].classList.remove('dark-mode')
        signupBoxLink && signupBoxLink[0].classList.remove('dark-mode')
        signupTermsOfUse && signupTermsOfUse[0].classList.remove('dark-mode')
      } else {
        mainPageBackground[0].classList.remove('dark-mode')
        tabBar[0].classList.remove('dark-mode')
        shrink[0] && shrink[0].classList.remove('dark-mode')
        search[0] && search[0].classList.remove('dark-mode')
        for (var x = 0; x < toctitle.length; x++) {
          toctitle[x].classList.remove('dark-mode')
        }
      }

      setThemeState(!themeState)
      localStorage.setItem('Theme', 'light')
    }
  }
  useEffect(() => {
    const getTheme = localStorage.getItem('Theme')
    var darks = []
    var lights = []
    if (page == 'city') {
      if (getTheme === 'dark') {
        for (var t = 0; t < cell.length; t++) {
          darks.push(cell[t].classList.add('dark-mode'))
        }
        for (var j = 0; j < text.length; j++) {
          darks.push(text[j].classList.add('dark-mode'))
        }
        for (var i = 0; i < element.length; i++) {
          darks.push(element[i].classList.add('dark-mode'))
        }
        for (var z = 0; z < tag.length; z++) {
          darks.push(tag[z].classList.add('dark-mode'))
        }
        return [
          document.querySelector('#root > div > div.main') &&
            document
              .querySelector('#root > div > div.main')
              .classList.add('dark-mode'),
          back[0] && back[0].classList.add('dark-mode'),
          navbar[0] && navbar[0].classList.add('dark-mode'),
          cityPageBackground[0] &&
            cityPageBackground[0].classList.add('dark-mode'),
          cityShrink[0] && cityShrink[0].classList.add('dark-mode'),
          cityTabBar && cityTabBar[0].classList.add('dark-mode'),
          element[0] && element[0].classList.add('dark-mode'),
          element[1] && element[1].classList.add('dark-mode'),
          element[2] && element[2].classList.add('dark-mode'),
          element[3] && element[3].classList.add('dark-mode'),
          element[4] && element[4].classList.add('dark-mode'),
          element[5] && element[5].classList.add('dark-mode'),
          element[6] && element[6].classList.add('dark-mode'),
          element[7] && element[7].classList.add('dark-mode'),
          element[8] && element[8].classList.add('dark-mode'),
          element[9] && element[9].classList.add('dark-mode'),
          cell[0] && cell[0].classList.add('dark-mode'),
          darks && darks,
          setThemeState(false)
        ]
      } else if (getTheme === 'light') {
        return [
          document.querySelector('#root > div > div.main') &&
            document
              .querySelector('#root > div > div.main')
              .classList.remove('dark-mode'),
          back[0] && back[0].classList.remove('dark-mode'),
          navbar[0] && navbar[0].classList.remove('dark-mode'),
          cityPageBackground[0] &&
            cityPageBackground[0].classList.remove('dark-mode'),
          cityShrink[0] && cityShrink[0].classList.remove('dark-mode'),
          cityTabBar && cityTabBar[0].classList.remove('dark-mode'),
          element[0] && element[0].classList.remove('dark-mode'),
          element[1] && element[1].classList.remove('dark-mode'),
          element[2] && element[2].classList.remove('dark-mode'),
          element[3] && element[3].classList.remove('dark-mode'),
          element[4] && element[4].classList.remove('dark-mode'),
          element[5] && element[5].classList.remove('dark-mode'),
          element[6] && element[6].classList.remove('dark-mode'),
          element[7] && element[7].classList.remove('dark-mode'),
          element[8] && element[8].classList.remove('dark-mode'),
          element[9] && element[9].classList.remove('dark-mode'),
          cell[0] && cell[0].classList.remove('dark-mode'),
          setThemeState(true)
        ]
      }
    } else if (page == 'login') {
      if (getTheme === 'dark') {
        return [
          loginLayout && loginLayout[0].classList.add('dark-mode'),
          loginBox && loginBox[0].classList.add('dark-mode'),
          loginBoxHeader[0] && loginBoxHeader[0].classList.add('dark-mode'),
          loginBoxLink[0] && loginBoxLink[0].classList.add('dark-mode'),
          loginRememberMe[0] && loginRememberMe[0].classList.add('dark-mode'),
          setThemeState(false)
        ]
      } else if (getTheme == 'light') {
        return [
          loginLayout && loginLayout[0].classList.remove('dark-mode'),
          loginBox && loginBox[0].classList.remove('dark-mode'),
          loginBoxHeader[0] && loginBoxHeader[0].classList.remove('dark-mode'),
          loginBoxLink[0] && loginBoxLink[0].classList.remove('dark-mode'),
          loginRememberMe[0] &&
            loginRememberMe[0].classList.remove('dark-mode'),
          setThemeState(true)
        ]
      }
    } else if (page == 'signup') {
      if (getTheme === 'dark') {
        return [
          signupLayout && signupLayout[0].classList.add('dark-mode'),
          signupBox && signupBox[0].classList.add('dark-mode'),
          signupBoxHeader[0] && signupBoxHeader[0].classList.add('dark-mode'),
          signupBoxLink[0] && signupBoxLink[0].classList.add('dark-mode'),
          signupTermsOfUse[0] && signupTermsOfUse[0].classList.add('dark-mode'),
          setThemeState(false)
        ]
      } else if (getTheme == 'light') {
        return [
          signupLayout && signupLayout[0].classList.remove('dark-mode'),
          signupBox && signupBox[0].classList.remove('dark-mode'),
          signupBoxHeader[0] &&
            signupBoxHeader[0].classList.remove('dark-mode'),
          signupBoxLink[0] && signupBoxLink[0].classList.remove('dark-mode'),
          signupTermsOfUse[0] &&
            signupTermsOfUse[0].classList.remove('dark-mode'),
          setThemeState(true)
        ]
      }
    } else {
      if (getTheme === 'dark') {
        for (var x = 0; x < toctitle.length; x++) {
          lights.push(toctitle[x].classList.add('dark-mode'))
        }
        return [
          mainPageBackground[0].classList.add('dark-mode'),
          tabBar[0].classList.add('dark-mode'),
          shrink[0] && shrink[0].classList.add('dark-mode'),
          search[0] && search[0].classList.add('dark-mode'),
          toctitle[0] && toctitle[0].classList.add('dark-mode'),
          setThemeState(false),
          lights && lights
        ]
      } else if (getTheme == 'light') {
        return [
          mainPageBackground[0].classList.remove('dark-mode'),
          tabBar[0].classList.remove('dark-mode'),
          shrink[0] && shrink[0].classList.remove('dark-mode'),
          search[0] && search[0].classList.remove('dark-mode'),
          toctitle[0] && toctitle[0].classList.remove('dark-mode'),
          setThemeState(true)
        ]
      }
    }
  }, [handleChange, themeState])
  return (
    <div>
      <button onClick={handleChange} className={styles.switch}>
        {themeState ? (
          <div className={styles.lightMode}>{t('translation:Light Mode')}</div>
        ) : (
          <div className={styles.darkMode}>{t('translation:Dark Mode')}</div>
        )}
      </button>
    </div>
  )
}

export default ThemeChanger
