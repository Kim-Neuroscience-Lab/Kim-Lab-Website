import type { GitHubRepository, GitHubOrganization, ProcessedRepository } from './github-types'

const GITHUB_API_BASE = 'https://api.github.com'
const ORG_NAME = 'Kim-Neuroscience-Lab'

// GitHub API rate limit is 60 requests per hour for unauthenticated requests
// We could add a GitHub token here for higher limits if needed

export class GitHubService {
  private async fetchFromGitHub<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Kim-Lab-Website'
        }
      })
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`Failed to fetch from GitHub API: ${endpoint}`, error)
      throw error
    }
  }

  async getOrganization(): Promise<GitHubOrganization> {
    return this.fetchFromGitHub<GitHubOrganization>(`/orgs/${ORG_NAME}`)
  }

  async getRepositories(): Promise<GitHubRepository[]> {
    // Fetch all repositories for the organization
    const repos = await this.fetchFromGitHub<GitHubRepository[]>(
      `/orgs/${ORG_NAME}/repos?type=public&sort=updated&per_page=100`
    )
    
    // Filter out archived and disabled repositories
    return repos.filter(repo => !repo.archived && !repo.disabled)
  }

  async getProcessedRepositories(): Promise<ProcessedRepository[]> {
    const repositories = await this.getRepositories()
    
    return repositories.map(repo => ({
      name: repo.name,
      description: repo.description || 'No description available',
      language: repo.language,
      license: repo.license?.key?.toUpperCase() || null,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      updated: this.formatDate(repo.updated_at),
      topics: repo.topics || [],
      isPinned: this.isPinnedRepository(repo.name)
    }))
  }

  async getFeaturedRepositories(): Promise<ProcessedRepository[]> {
    const allRepos = await this.getProcessedRepositories()
    
    // GitHub doesn't provide pinned repos via REST API, so we'll identify them
    // based on the known pinned repositories from the organization page
    const pinnedRepoNames = ['mapseq_processing_kimlab', 'KimLabISI']
    
    const pinned = allRepos.filter(repo => 
      pinnedRepoNames.includes(repo.name)
    )
    
    // If we don't have enough pinned repos, add the most recently updated ones
    if (pinned.length < 2) {
      const remaining = allRepos
        .filter(repo => !pinnedRepoNames.includes(repo.name))
        .slice(0, 2 - pinned.length)
      
      return [...pinned, ...remaining]
    }
    
    return pinned
  }

  private isPinnedRepository(repoName: string): boolean {
    const pinnedRepos = ['mapseq_processing_kimlab', 'KimLabISI']
    return pinnedRepos.includes(repoName)
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      return 'yesterday'
    } else if (diffDays < 30) {
      return `${diffDays} days ago`
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `${months} month${months > 1 ? 's' : ''} ago`
    } else {
      const years = Math.floor(diffDays / 365)
      return `${years} year${years > 1 ? 's' : ''} ago`
    }
  }
}

export const githubService = new GitHubService()

// Fallback data in case GitHub API is unavailable
export const getFallbackRepositories = (): ProcessedRepository[] => [
  {
    name: "mapseq_processing_kimlab",
    description: "MAPseq processing code based on previous works and designed to be used with the CSHL python pipeline",
    language: "Python",
    license: null,
    stars: 0,
    forks: 0,
    url: "https://github.com/Kim-Neuroscience-Lab/mapseq_processing_kimlab",
    updated: "3 months ago",
    topics: [],
    isPinned: true
  },
  {
    name: "KimLabISI",
    description: "Intrinsic signal imaging analysis tools for neuroscience research",
    language: "Python",
    license: "MIT",
    stars: 0,
    forks: 0,
    url: "https://github.com/Kim-Neuroscience-Lab/KimLabISI",
    updated: "1 month ago",
    topics: [],
    isPinned: true
  }
]



