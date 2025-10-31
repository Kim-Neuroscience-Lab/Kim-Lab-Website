import { useMemo } from 'react'
import { ExternalLink, Calendar, Users, RefreshCw, AlertTriangle } from 'lucide-react'
import { PageContainer, PageHeader, Section, Card, CardTitle, CardDescription, SectionTitle } from '../components/ui'
import { SECTION_DELAYS, getCardDelay } from '../lib/animations'
import { useORCIDWithCache } from '../lib/use-orcid'

const ORCID_ID = '0000-0002-8271-2209'

export function Publications() {
  const { publications, loading, error, refetch, clearError } = useORCIDWithCache(ORCID_ID, {
    cacheTimeout: 60 * 60 * 1000,
    autoRefresh: true,
  })

  const sortedPublications = useMemo(
    () =>
      [...publications].sort((a, b) => {
        const yearA = Number.parseInt(a.year, 10) || 0
        const yearB = Number.parseInt(b.year, 10) || 0
        return yearB - yearA
      }),
    [publications]
  )

  const handleRetry = async () => {
    clearError()
    await refetch()
  }

  return (
    <PageContainer>
      <PageHeader 
        title="Publications" 
        description="Recent research contributions to neuroscience and cortical circuit development"
      />

      {/* Publications List */}
      <Section delay={SECTION_DELAYS[0]} className="space-y-8">
        <SectionTitle centered={false}>Recent Publications</SectionTitle>

        {loading && (
          <div className="flex items-center space-x-3 text-secondary">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Fetching the latest publications from ORCID…</span>
          </div>
        )}

        {error && (
          <Card animated={false} className="border border-moebius-orange-300 bg-white/70">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start space-x-3 text-moebius-orange-600">
                <AlertTriangle className="h-5 w-5 mt-1" />
                <div>
                  <CardTitle className="text-moebius-orange-600">We couldn’t reach ORCID</CardTitle>
                  <CardDescription className="text-moebius-orange-600/80">
                    Live publication updates are temporarily unavailable. The list below shows the latest cached results.
                  </CardDescription>
                </div>
              </div>
              <button
                onClick={handleRetry}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-moebius-orange-400 text-moebius-orange-600 hover:text-moebius-orange-700 hover:bg-moebius-orange-50 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Retry</span>
              </button>
            </div>
          </Card>
        )}

        {!loading && !error && sortedPublications.length === 0 && (
          <Card animated={false} className="bg-white/70">
            <CardTitle>No publications found</CardTitle>
            <CardDescription>
              We couldn’t find any publications linked to this ORCID profile yet. Please check back soon.
            </CardDescription>
          </Card>
        )}

        {sortedPublications.map((publication, index) => (
          <Card
            key={`${publication.putCode}-${publication.title}`}
            delay={getCardDelay(SECTION_DELAYS[0], index)}
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:scale-[1.01] transition-transform"
          >
            <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle>
                    <span dangerouslySetInnerHTML={{ __html: publication.title }} />
                  </CardTitle>
                  {publication.url && (
                    <ExternalLink className="h-5 w-5 text-moebius-blue-400 flex-shrink-0 mt-1" />
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-secondary mb-3">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{publication.authors}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{publication.year}</span>
                  </div>
                  {publication.journal && (
                    <span className="font-medium text-moebius-blue-400">
                      {publication.journal}
                    </span>
                  )}
                  <span className="text-xs px-2 py-1 rounded-full bg-moebius-blue-400/85 text-white capitalize">
                    {publication.type.replace(/_/g, ' ')}
                  </span>
                </div>
                {publication.description && (
                  <CardDescription className="mb-4">
                    {publication.description}
                  </CardDescription>
                )}
                {publication.doi && (
                  <div className="text-sm text-secondary">
                    DOI: {publication.doi}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </Section>

    </PageContainer>
  )
}