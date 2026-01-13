'use client'

import { parseAsString, useQueryState } from 'nuqs'

export function useHelpFilters() {
  const [search, setSearch] = useQueryState('q', parseAsString)

  const clearSearch = () => {
    setSearch(null)
  }

  return {
    search,
    setSearch,
    clearSearch,
  }
}
