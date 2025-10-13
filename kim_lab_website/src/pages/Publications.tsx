import { ExternalLink, Calendar, Users } from 'lucide-react'
import { PageContainer, PageHeader, Section, Card, CardTitle, CardDescription, SectionTitle, Button } from '../components/ui'
import { SECTION_DELAYS, getCardDelay } from '../lib/animations'

export function Publications() {
  return (
    <PageContainer>
      <PageHeader 
        title="Publications" 
        description="Recent research contributions to neuroscience and cortical circuit development"
      />

      {/* Publications List */}
      <Section delay={SECTION_DELAYS[0]} className="space-y-8">
        <SectionTitle centered={false}>Recent Publications</SectionTitle>
          
          {/* Publications from ORCID Profile */}
          {[
            {
              title: "Bell Jar: A Semiautomated Registration and Cell Counting Tool for Mouse Neurohistology Analysis",
              authors: "Kim, E., et al.",
              journal: "eNeuro",
              year: "2025",
              doi: "10.1523/ENEURO.0036-23.2025",
              url: "https://doi.org/10.1523/ENEURO.0036-23.2025",
              description: "A semi-automated tool for registration and cell counting in mouse neurohistology analysis, streamlining neuroscience research workflows.",
              type: "journal-article"
            },
            {
              title: "Bell Jar: A Semi-Automated Registration and Cell Counting Tool for Mouse Neurohistology Analysis",
              authors: "Kim, E., et al.",
              journal: "bioRxiv",
              year: "2022",
              doi: "10.1101/2022.11.09.515722",
              url: "https://doi.org/10.1101/2022.11.09.515722",
              description: "Preprint version of the Bell Jar tool, providing automated solutions for neuroscience image analysis and cell counting.",
              type: "preprint"
            }
          ].map((publication, index) => (
            <Card key={publication.title} delay={getCardDelay(SECTION_DELAYS[0], index)}>
              <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                <div className="flex-1">
                  <CardTitle>{publication.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-secondary mb-3">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{publication.authors}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{publication.year}</span>
                    </div>
                    <span className="font-medium text-moebius-blue-400">
                      {publication.journal}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-moebius-blue-400/85 text-white">
                      {publication.type}
                    </span>
                  </div>
                  <CardDescription className="mb-4">
                    {publication.description}
                  </CardDescription>
                  <div className="flex items-center flex-wrap gap-4">
                    <span className="text-sm text-muted">
                      DOI: {publication.doi}
                    </span>
                    <Button 
                      variant="sketch" 
                      href={publication.url}
                      className="inline-flex items-center space-x-1 text-sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View Paper</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </Section>

    </PageContainer>
  )
}