/* eslint-disable */
import React, { useState, useEffect } from 'react'

const ThemeChanger = () => {
  const [themeState, setThemeState] = useState(true)

  var element = document.getElementsByClassName(
    'sidebar_whiteItemBackground__1toqw'
  )

  var text = document.getElementsByClassName('sidebar_selectedItem__2vdyr')

  var back = document.getElementsByClassName('sidebar_toc__wdCC_')

  var cell = document.getElementsByClassName('detailCell_cell__LNP8P')

  var navbar = document.getElementsByClassName('header_header__2Wfjy')

  const handleChange = () => {
    if (themeState) {
      localStorage.setItem('Theme', 'dark')
      document
        .querySelector('#root > div > div.main')
        .classList.add('dark-mode')

      for (var i = 0; i < element.length; i++) {
        element[i].classList.add('dark-mode')
      }
      for (var j = 0; j < text.length; j++) {
        text[j].classList.add('dark-mode')
      }

      back[0].classList.add('dark-mode')

      navbar[0].classList.add('dark-mode')

      for (var t = 0; t < cell.length; t++) {
        cell[t].classList.add('dark-mode')
      }
      setThemeState(!themeState)
    } else {
      localStorage.setItem('Theme', 'light')
      document
        .querySelector('#root > div > div.main')
        .classList.remove('dark-mode')

      for (var i = 0; i < element.length; i++) {
        element[i].classList.remove('dark-mode')
      }
      for (var j = 0; j < text.length; j++) {
        text[j].classList.remove('dark-mode')
      }

      back[0].classList.remove('dark-mode')
      navbar[0].classList.remove('dark-mode')
      for (var t = 0; t < cell.length; t++) {
        cell[t].classList.remove('dark-mode')
      }

      setThemeState(!themeState)
    }
  }
  useEffect(() => {
    const getTheme = localStorage.getItem('Theme')
    var darks = []
    var lights = []

    if (getTheme === 'dark') {
      for (var t = 0; t < cell.length; t++) {
        darks.push(cell[t].classList.add('dark-mode'))
      }
      for (var j = 0; j < text.length; j++) {
        darks.push(text[j].classList.add('dark-mode'))
      }
      for (var i = 0; i < element.length; i++) {
        darks.push(element[i].classList.remove('dark-mode'))
      }
      return [
        document
          .querySelector('#root > div > div.main')
          .classList.add('dark-mode'),
        back[0].classList.add('dark-mode'),
        navbar[0].classList.add('dark-mode'),
        element[0].classList.add('dark-mode'),
        element[1].classList.add('dark-mode'),
        element[2].classList.add('dark-mode'),
        element[3].classList.add('dark-mode'),
        element[4].classList.add('dark-mode'),
        element[5].classList.add('dark-mode'),
        element[6].classList.add('dark-mode'),
        element[7].classList.add('dark-mode'),
        element[8].classList.add('dark-mode'),
        element[9].classList.add('dark-mode'),
        cell[0].classList.add('dark-mode'),
        darks
      ]
    } else if (getTheme === 'light') {
      return [
        document
          .querySelector('#root > div > div.main')
          .classList.remove('dark-mode'),
        back[0].classList.remove('dark-mode'),
        navbar[0].classList.remove('dark-mode'),
        element[0].classList.remove('dark-mode'),
        element[1].classList.remove('dark-mode'),
        element[2].classList.remove('dark-mode'),
        element[3].classList.remove('dark-mode'),
        element[4].classList.remove('dark-mode'),
        element[5].classList.remove('dark-mode'),
        element[6].classList.remove('dark-mode'),
        element[7].classList.remove('dark-mode'),
        element[8].classList.remove('dark-mode'),
        element[9].classList.remove('dark-mode'),
        cell[0].classList.remove('dark-mode')
      ]
    }
  }, [handleChange, themeState])
  return (
    <div>
      <button onClick={handleChange}>
        {themeState ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  )
}

export default ThemeChanger
