import { useSelector } from 'react-redux'
import { localPreferencesSelector } from 'reducers/localPreferencesSlice'
import { lengthUnits } from '../../constants/preferencesOptions'

const Distance = ({ value, decimalPlaces = 1 }) => {

  const { distance } = useSelector(localPreferencesSelector)
  const convertedValue = (distance === lengthUnits.MILES ?
    value /  1.609 : value).toFixed(decimalPlaces)
  return `${convertedValue} ${distance}`
}

export default Distance
