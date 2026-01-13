'use client'

import { parseAsString, useQueryState } from 'nuqs'

export function useBlogFilters() {
  const [category, setCategory] = useQueryState('category', parseAsString)
  const [search, setSearch] = useQueryState('q', parseAsString)

  const clearFilters = () => {
    setCategory(null)
    setSearch(null)
  }

  return {
    category,
    setCategory,
    search,
    setSearch,
    clearFilters,
  }
}
