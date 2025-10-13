import { useState, useEffect, useCallback } from 'react'
import { createORCIDService } from './orcid-service'
import type { Publication } from './orcid-types'

interface UseORCIDState {
  publications: Publication[]
  loading: boolean
  error: string | null
  lastFetched: Date | null
}

interface UseORCIDReturn extends UseORCIDState {
  refetch: () => Promise<void>
  clearError: () => void
}

/**
 * Custom hook to fetch and manage ORCID publication data
 */
export function useORCID(orcidId: string): UseORCIDReturn {
  const [state, setState] = useState<UseORCIDState>({
    publications: [],
    loading: false,
    error: null,
    lastFetched: null,
  })

  const fetchPublications = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const orcidService = createORCIDService(orcidId)
      const publications = await orcidService.fetchPublications()
      
      setState(prev => ({
        ...prev,
        publications,
        loading: false,
        error: null,
        lastFetched: new Date(),
      }))
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unknown error occurred while fetching publications'
      
      setState(prev => ({
        ...prev,
        publications: [],
        loading: false,
        error: errorMessage,
        lastFetched: null,
      }))
    }
  }, [orcidId])

  const refetch = useCallback(async () => {
    await fetchPublications()
  }, [fetchPublications])

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  // Initial fetch on mount and when orcidId changes
  useEffect(() => {
    if (orcidId) {
      fetchPublications()
    }
  }, [orcidId, fetchPublications])

  return {
    ...state,
    refetch,
    clearError,
  }
}

/**
 * Hook to get cached publications with optional auto-refresh
 */
export function useORCIDWithCache(
  orcidId: string, 
  options: {
    cacheTimeout?: number // in milliseconds, default 1 hour
    autoRefresh?: boolean // default false
  } = {}
): UseORCIDReturn {
  const { cacheTimeout = 60 * 60 * 1000, autoRefresh = false } = options
  const result = useORCID(orcidId)

  // Auto-refresh logic
  useEffect(() => {
    if (!autoRefresh || !result.lastFetched) return

    const timeSinceLastFetch = Date.now() - result.lastFetched.getTime()
    
    if (timeSinceLastFetch >= cacheTimeout) {
      result.refetch()
      return
    }

    // Set up timer for next refresh
    const timeUntilRefresh = cacheTimeout - timeSinceLastFetch
    const timer = setTimeout(() => {
      result.refetch()
    }, timeUntilRefresh)

    return () => clearTimeout(timer)
  }, [result.lastFetched, result.refetch, cacheTimeout, autoRefresh])

  return result
}

