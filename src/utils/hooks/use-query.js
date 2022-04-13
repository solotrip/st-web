import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'qs'

export function useQuery() {
  const { search } = useLocation()
  return useMemo(() => qs.parse(search.slice(1)), [search])
}
