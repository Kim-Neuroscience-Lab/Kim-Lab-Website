export interface ORCIDWorkSummary {
  'put-code': number
  'created-date': {
    value: number
  }
  'last-modified-date': {
    value: number
  }
  source: {
    'source-orcid'?: {
      uri: string
      path: string
      host: string
    }
    'source-client-id'?: {
      uri: string
      path: string
      host: string
    }
    'source-name': {
      value: string
    }
  }
  title: {
    title?: {
      value: string
    }
    subtitle?: {
      value: string
    }
    'translated-title'?: {
      value: string
      'language-code': string
    }
  }
  'external-ids': {
    'external-id': Array<{
      'external-id-type': string
      'external-id-value': string
      'external-id-url'?: {
        value: string
      }
      'external-id-relationship': string
    }>
  }
  type: string
  'publication-date'?: {
    year?: {
      value: string
    }
    month?: {
      value: string
    }
    day?: {
      value: string
    }
  }
  visibility: string
  path: string
  'display-index': string
}

export interface ORCIDWorksResponse {
  'last-modified-date': {
    value: number
  }
  group: Array<{
    'last-modified-date': {
      value: number
    }
    'external-ids': {
      'external-id': Array<{
        'external-id-type': string
        'external-id-value': string
        'external-id-url'?: {
          value: string
        }
        'external-id-relationship': string
      }>
    }
    'work-summary': ORCIDWorkSummary[]
  }>
  path: string
}

export interface ORCIDWorkDetail {
  'put-code': number
  'created-date': {
    value: number
  }
  'last-modified-date': {
    value: number
  }
  source: {
    'source-orcid'?: {
      uri: string
      path: string
      host: string
    }
    'source-client-id'?: {
      uri: string
      path: string
      host: string
    }
    'source-name': {
      value: string
    }
  }
  title: {
    title?: {
      value: string
    }
    subtitle?: {
      value: string
    }
    'translated-title'?: {
      value: string
      'language-code': string
    }
  }
  'short-description'?: string
  citation?: {
    'citation-type': string
    'citation-value': string
  }
  type: string
  'publication-date'?: {
    year?: {
      value: string
    }
    month?: {
      value: string
    }
    day?: {
      value: string
    }
  }
  'external-ids': {
    'external-id': Array<{
      'external-id-type': string
      'external-id-value': string
      'external-id-url'?: {
        value: string
      }
      'external-id-relationship': string
    }>
  }
  url?: {
    value: string
  }
  contributors?: {
    contributor: Array<{
      'contributor-orcid'?: {
        uri: string
        path: string
        host: string
      }
      'credit-name'?: {
        value: string
      }
      'contributor-email'?: {
        value: string
      }
      'contributor-attributes': {
        'contributor-sequence': string
        'contributor-role': string
      }
    }>
  }
  'language-code'?: string
  country?: {
    value: string
  }
  visibility: string
  path: string
  'display-index': string
}

export interface Publication {
  title: string
  authors: string
  journal?: string
  year: string
  doi?: string
  url?: string
  description?: string
  type: string
  putCode: number
}

