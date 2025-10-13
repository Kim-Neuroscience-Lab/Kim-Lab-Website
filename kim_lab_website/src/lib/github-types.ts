export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  created_at: string
  license: {
    key: string
    name: string
    spdx_id: string
  } | null
  topics: string[]
  archived: boolean
  disabled: boolean
  private: boolean
}

export interface GitHubOrganization {
  id: number
  login: string
  name: string | null
  description: string | null
  html_url: string
  avatar_url: string
  blog: string | null
  location: string | null
  email: string | null
  public_repos: number
  followers: number
  following: number
}

export interface ProcessedRepository {
  name: string
  description: string
  language: string | null
  license: string | null
  stars: number
  forks: number
  url: string
  updated: string
  topics: string[]
  isPinned?: boolean
}



