import type { ORCIDWorksResponse, ORCIDWorkDetail, Publication } from './orcid-types'

const ORCID_BASE_URL = 'https://pub.orcid.org/v3.0'

export class ORCIDService {
  private orcidId: string

  constructor(orcidId: string) {
    this.orcidId = orcidId
  }

  /**
   * Fetch the list of works from ORCID
   */
  async fetchWorks(): Promise<ORCIDWorksResponse> {
    try {
      const response = await fetch(`${ORCID_BASE_URL}/${this.orcidId}/works`, {
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors'
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch ORCID works: ${response.status} ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      // Handle CORS errors by throwing a specific error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('CORS_ERROR')
      }
      throw error
    }
  }

  /**
   * Fetch detailed information for a specific work
   */
  async fetchWorkDetail(putCode: number): Promise<ORCIDWorkDetail> {
    try {
      const response = await fetch(`${ORCID_BASE_URL}/${this.orcidId}/work/${putCode}`, {
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors'
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch work detail: ${response.status} ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      // Handle CORS errors by throwing a specific error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('CORS_ERROR')
      }
      throw error
    }
  }

  /**
   * Fetch all publications with full details
   */
  async fetchPublications(): Promise<Publication[]> {
    try {
      const works = await this.fetchWorks()
      
      // Extract put codes from all works
      const putCodes: number[] = []
      works.group.forEach(group => {
        group['work-summary'].forEach(summary => {
          putCodes.push(summary['put-code'])
        })
      })

      // Fetch detailed information for each work (limit to prevent too many requests)
      const maxPublications = 20 // Reasonable limit
      const limitedPutCodes = putCodes.slice(0, maxPublications)
      
      const workDetailsPromises = limitedPutCodes.map(putCode => 
        this.fetchWorkDetail(putCode).catch(error => {
          console.warn(`Failed to fetch work detail for put-code ${putCode}:`, error)
          return null
        })
      )

      const workDetails = (await Promise.all(workDetailsPromises))
        .filter((detail): detail is ORCIDWorkDetail => detail !== null)

      // Transform to our Publication format
      return workDetails.map(detail => this.transformToPublication(detail))
        .sort((a, b) => parseInt(b.year) - parseInt(a.year)) // Sort by year, newest first
    } catch (error) {
      console.error('Error fetching publications from ORCID:', error)
      
      // If it's a CORS error, provide fallback data based on actual ORCID profile
      if (error instanceof Error && error.message === 'CORS_ERROR') {
        console.info('Using fallback publication data due to CORS restrictions')
        return this.getFallbackPublications()
      }
      
      throw error
    }
  }

  /**
   * Fallback publications based on actual ORCID data
   */
  private getFallbackPublications(): Publication[] {
    return [
      {
        title: "Bell Jar: A Semiautomated Registration and Cell Counting Tool for Mouse Neurohistology Analysis",
        authors: "Kim, E., et al.",
        journal: "eNeuro",
        year: "2025",
        doi: "10.1523/ENEURO.0036-23.2025",
        url: "https://doi.org/10.1523/ENEURO.0036-23.2025",
        description: "A semi-automated tool for registration and cell counting in mouse neurohistology analysis, streamlining neuroscience research workflows.",
        type: "journal-article",
        putCode: 177421581
      },
      {
        title: "Bell Jar: A Semi-Automated Registration and Cell Counting Tool for Mouse Neurohistology Analysis",
        authors: "Kim, E., et al.",
        journal: "bioRxiv",
        year: "2022",
        doi: "10.1101/2022.11.09.515722",
        url: "https://doi.org/10.1101/2022.11.09.515722",
        description: "Preprint version of the Bell Jar tool, providing automated solutions for neuroscience image analysis and cell counting.",
        type: "preprint",
        putCode: 138401604
      }
    ].sort((a, b) => parseInt(b.year) - parseInt(a.year))
  }

  /**
   * Transform ORCID work detail to our Publication format
   */
  private transformToPublication(detail: ORCIDWorkDetail): Publication {
    const title = detail.title?.title?.value || 'Untitled'
    
    // Extract authors from contributors
    const authors = this.extractAuthors(detail)
    
    // Extract journal from citation or external IDs
    const journal = this.extractJournal(detail)
    
    // Extract publication year
    const year = detail['publication-date']?.year?.value || 'Unknown'
    
    // Extract DOI
    const doi = this.extractDOI(detail)
    
    // Extract URL
    const url = detail.url?.value || (doi ? `https://doi.org/${doi}` : undefined)
    
    // Extract description from citation or short description
    const description = detail['short-description'] || this.extractDescriptionFromCitation(detail)
    
    return {
      title,
      authors,
      journal,
      year,
      doi,
      url,
      description,
      type: detail.type,
      putCode: detail['put-code']
    }
  }

  /**
   * Extract authors from contributors
   */
  private extractAuthors(detail: ORCIDWorkDetail): string {
    if (!detail.contributors?.contributor) {
      return 'Unknown'
    }

    const authorNames = detail.contributors.contributor
      .filter(contributor => contributor['credit-name']?.value)
      .map(contributor => contributor['credit-name']!.value)
    
    if (authorNames.length === 0) {
      return 'Unknown'
    }
    
    if (authorNames.length === 1) {
      return authorNames[0]
    }
    
    if (authorNames.length <= 3) {
      return authorNames.join(', ')
    }
    
    // For more than 3 authors, show first author + et al.
    return `${authorNames[0]}, et al.`
  }

  /**
   * Extract journal name from external IDs or citation
   */
  private extractJournal(detail: ORCIDWorkDetail): string | undefined {
    // Try to extract from citation first
    if (detail.citation?.['citation-value']) {
      const citation = detail.citation['citation-value']
      // Basic pattern matching for journal names in citations
      const journalMatch = citation.match(/(?:In:|Published in:)?\s*([A-Z][^,.\n]+(?:\s+[A-Z][^,.\n]*)*)/i)
      if (journalMatch && journalMatch[1]) {
        return journalMatch[1].trim()
      }
    }

    // Look for journal identifier in external IDs
    const journalId = detail['external-ids']['external-id'].find(
      id => id['external-id-type'].toLowerCase().includes('issn') || 
           id['external-id-type'].toLowerCase().includes('journal')
    )
    
    return journalId ? undefined : undefined // We'd need a journal lookup service for this
  }

  /**
   * Extract DOI from external IDs
   */
  private extractDOI(detail: ORCIDWorkDetail): string | undefined {
    const doiId = detail['external-ids']['external-id'].find(
      id => id['external-id-type'].toLowerCase() === 'doi'
    )
    
    return doiId ? doiId['external-id-value'] : undefined
  }

  /**
   * Extract description from citation
   */
  private extractDescriptionFromCitation(detail: ORCIDWorkDetail): string | undefined {
    if (!detail.citation?.['citation-value']) {
      return undefined
    }
    
    const citation = detail.citation['citation-value']
    
    // Extract abstract or summary from citation if available
    const abstractMatch = citation.match(/(?:Abstract|Summary):\s*([^.]+(?:\.[^.]+)*)/i)
    if (abstractMatch && abstractMatch[1]) {
      return abstractMatch[1].trim()
    }
    
    // If no abstract, return a truncated version of the citation
    if (citation.length > 200) {
      return citation.substring(0, 200) + '...'
    }
    
    return citation
  }
}

/**
 * Factory function to create ORCID service instance
 */
export const createORCIDService = (orcidId: string) => new ORCIDService(orcidId)
