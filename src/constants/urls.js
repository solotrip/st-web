/* eslint-disable max-len */
import { getImagePath } from '../utils/image'

export const SOLOTRIP_V1 = path => process.env.REACT_APP_SOLOTRIP_API_V1 + path
export const LIGHT_IMG_PLACEHOLDER = getImagePath('light-placeholder.webp')
export const DARK_IMG_PLACEHOLDER = getImagePath('dark-placeholder.webp')

export const SHORT_URL_BASE = process.env.REACT_APP_SHORT_URL || 'https://pul.fyi/'
