import React, { useCallback, useState } from 'react'
import { SheetWrapper } from 'components'
import { useQuery } from 'utils/hooks/use-query'
import { formatAsDate } from 'utils/date'
import DateSelector from '../../components/date-selector'
import { datesSelector } from './slice'
import { useHistory } from 'react-router-dom'
import qs from 'qs'
import { DATE_QUERY_TYPE } from 'constants/index'
import { useSelector } from 'react-redux'
import SettingsSection from 'components/settings-section'

const DateSelectorContainer = () => {
  const query = useQuery()
  const history = useHistory()
  const isFlexibleQuery = query && query.months && query.months.length > 0
  const [data, setData] = useState({
    ...query,
    type: isFlexibleQuery ? DATE_QUERY_TYPE.flexible : DATE_QUERY_TYPE.calendar
  })
  const { recentMonths, recentDateRanges } = useSelector(datesSelector)
  const onUpdate = useCallback(
    payload => {
      setData(prevData => ({ ...prevData, ...payload }))
    },
    [setData]
  )
  const onSubmit = () => {
    const { months, duration, weekendOnly, start, end, ...rest } = data
    const payload =
      data.type === DATE_QUERY_TYPE.flexible
        ? {
          months,
          duration,
          weekendOnly,
          ...rest
        }
        : {
          start: formatAsDate(start),
          end: formatAsDate(end),
          ...rest
        }
    if (!weekendOnly && DATE_QUERY_TYPE.flexible) {
      delete payload.weekendOnly
    }
    if (!duration && DATE_QUERY_TYPE.flexible) {
      delete payload.duration
    }
    delete payload.type
    history.push({
      pathname: '/recommendations/passport',
      search: qs.stringify(payload)
    })
  }

  const isEnabled = () => {
    const { months, duration, start, end, weekendOnly, type } = data
    if (type === DATE_QUERY_TYPE.flexible) {
      return months && months.length > 0 && (!!duration || !!weekendOnly)
    }
    return !!start && !!end
  }
  return (
    // TODO: Add holidays loader
    <SheetWrapper snapPoints={[700]}>
      <SheetWrapper.Content>
        <SettingsSection
          title="Dates"
          // eslint-disable-next-line max-len
          description="Select the dates you want to travel or choose one of the flexible week, weekend and whole month options."
        >
          <DateSelector
            query={query}
            onUpdate={onUpdate}
            data={data}
            recentDateRanges={recentDateRanges}
            recentMonths={recentMonths}
          />
        </SettingsSection>
      </SheetWrapper.Content>
      {data.type !== DATE_QUERY_TYPE.recentQueries && (
        <SheetWrapper.Footer onClick={onSubmit} text="Search" disabled={!isEnabled()} />
      )}
    </SheetWrapper>
  )
}

export default DateSelectorContainer
