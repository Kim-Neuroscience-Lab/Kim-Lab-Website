import { useState, useEffect } from 'react'
import type { ProcessedRepository } from './github-types'
import { githubService, getFallbackRepositories } from './github-service'

interface UseGitHubState {
  repositories: ProcessedRepository[]
  featuredRepositories: ProcessedRepository[]
  loading: boolean
  error: string | null
}

export function useGitHub(): UseGitHubState {
  const [state, setState] = useState<UseGitHubState>({
    repositories: [],
    featuredRepositories: [],
    loading: true,
    error: null
  })

  useEffect(() => {
    let isMounted = true

    const fetchRepositories = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }))
        
        const [allRepos, featuredRepos] = await Promise.all([
          githubService.getProcessedRepositories(),
          githubService.getFeaturedRepositories()
        ])
        
        if (isMounted) {
          setState({
            repositories: allRepos,
            featuredRepositories: featuredRepos,
            loading: false,
            error: null
          })
        }
      } catch (error) {
        console.error('Failed to fetch GitHub data:', error)
        
        if (isMounted) {
          // Use fallback data if API fails
          const fallbackRepos = getFallbackRepositories()
          const fallbackFeatured = fallbackRepos.filter(repo => repo.isPinned)
          
          setState({
            repositories: fallbackRepos,
            featuredRepositories: fallbackFeatured,
            loading: false,
            error: 'Unable to fetch live data from GitHub. Showing cached results.'
          })
        }
      }
    }

    fetchRepositories()

    return () => {
      isMounted = false
    }
  }, [])

  return state
}



