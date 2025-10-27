import { Code2, Github, Star, GitFork, Calendar, AlertCircle } from 'lucide-react'
import { PageContainer, PageHeader, Section, Card, CardTitle, CardDescription, SectionTitle, Button } from '../components/ui'
import { useGitHub } from '../lib/use-github'
import { SECTION_DELAYS, getCardDelay } from '../lib/animations'

export function Code() {
  const { repositories, featuredRepositories, loading, error } = useGitHub()

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      'Python': 'bg-blue-500',
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-600',
      'MATLAB': 'bg-orange-500',
      'R': 'bg-purple-500',
      'Roff': 'bg-gray-500'
    }
    return colors[language] || 'bg-gray-400'
  }

  return (
    <PageContainer>
      <PageHeader 
        title="Code & Resources" 
        description="Open-source tools and resources for neural circuit research"
      />

      {/* Error State */}
      {error && (
        <Section delay={SECTION_DELAYS[0]} className="mb-8">
          <Card className="border-amber-200 bg-amber-50/50 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <p className="text-amber-700 text-sm">{error}</p>
            </div>
          </Card>
        </Section>
      )}

      {/* Featured Repositories */}
      <Section delay={SECTION_DELAYS[0]} className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <SectionTitle centered={false}>Featured</SectionTitle>
          <Button variant="secondary" href="https://github.com/Kim-Neuroscience-Lab">
            <Github className="h-4 w-4 mr-2" />
            View Organization
          </Button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <Card key={i} animated={false}>
                <div className="animate-pulse">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                    <div className="h-3 bg-gray-300 rounded w-12"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredRepositories.map((repo, index) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Card delay={getCardDelay(SECTION_DELAYS[0], index)} className="hover:scale-[1.02] transition-transform duration-300 ease-out">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Code2 className="h-6 w-6 text-moebius-blue-400" />
                    <div>
                      <CardTitle className="text-lg text-moebius-blue-400 hover:text-moebius-blue-300 transition-colors duration-200 ease-out">
                        {repo.name}
                      </CardTitle>
                    </div>
                  </div>
                </div>
                <CardDescription className="mb-4">
                  {repo.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-secondary">
                    {repo.language && (
                      <div className="flex items-center space-x-1">
                        <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="h-3 w-3" />
                      <span>{repo.forks}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted">
                    <Calendar className="h-3 w-3" />
                    <span>Updated {repo.updated}</span>
                  </div>
                </div>
              </Card>
            </a>
            ))}
          </div>
        )}
      </Section>

      {/* All Repositories */}
      <Section delay={SECTION_DELAYS[1]}>
        <SectionTitle>Repositories</SectionTitle>
        
        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} animated={false}>
                <div className="animate-pulse">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                    <div className="h-5 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-12"></div>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                    <div className="h-3 bg-gray-300 rounded w-12"></div>
                    <div className="h-3 bg-gray-300 rounded w-20"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {repositories.map((repo, index) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Card delay={getCardDelay(SECTION_DELAYS[1], index)} className="hover:scale-[1.01] transition-transform duration-300 ease-out">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Code2 className="h-5 w-5 text-moebius-blue-400" />
                      <CardTitle className="text-base text-moebius-blue-400 hover:text-moebius-blue-300 transition-colors duration-200 ease-out">
                        {repo.name}
                      </CardTitle>
                      {repo.license && (
                        <span className="text-xs px-2 py-1 bg-moebius-blue-400/85 text-white rounded">
                          {repo.license}
                        </span>
                      )}
                    </div>
                    <CardDescription size="sm" className="mb-3">
                      {repo.description}
                    </CardDescription>
                    <div className="flex items-center space-x-6 text-sm text-secondary">
                      {repo.language && (
                        <div className="flex items-center space-x-1">
                          <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                          <span>{repo.language}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="h-3 w-3" />
                        <span>{repo.forks}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted">
                        <Calendar className="h-3 w-3" />
                        <span>Updated {repo.updated}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </a>
            ))}
          </div>
        )}
      </Section>

    </PageContainer>
  )
}