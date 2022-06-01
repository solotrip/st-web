import { useSelector } from 'react-redux'
import { localPreferencesSelector } from 'reducers/localPreferencesSlice'
import { exchangeRatesSelector } from 'reducers/exchangeRatesSlice'

const Currency = ({ value, decimalPlaces = 0 }) => {
  const { currency } = useSelector(localPreferencesSelector)
  const { exchangeRates, loading } = useSelector(exchangeRatesSelector)
  return loading
    ? '...'
    : value === 0
      ? `0 ${currency}`
      : exchangeRates[currency] && value
        ? `${(exchangeRates[currency] * value).toFixed(decimalPlaces)} ${currency}`
        : ' '
}

export default Currency
