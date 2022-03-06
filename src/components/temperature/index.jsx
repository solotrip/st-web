import { useSelector } from 'react-redux'
import { localPreferencesSelector } from 'reducers/localPreferencesSlice'
import { temperatureUnits } from '../../constants/preferencesOptions'

const Temperature = ({ value, decimalPlaces = 1 }) => {

  const { temperature } = useSelector(localPreferencesSelector)
  const convertedValue = (temperature === temperatureUnits.F ?
    9 / 5 * value + 32 : value).toFixed(decimalPlaces)
  return `${convertedValue}${temperature}`
}

export default Temperature
