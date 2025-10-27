import { PageContainer, PageHeader, Section, Card, CardTitle, CardDescription } from '../components/ui'
import { SECTION_DELAYS } from '../lib/animations'

export function Gallery() {
  return (
    <PageContainer>
      <PageHeader
        title="Gallery"
        description="Visual highlights from our research and laboratory"
      />

      <Section delay={SECTION_DELAYS[0]}>
        <div className="max-w-2xl mx-auto">
          <Card size="large" className="text-center">
            <CardTitle size="large">Coming Soon</CardTitle>
            <CardDescription>
              Our gallery of research images and laboratory photos will be available soon.
            </CardDescription>
          </Card>
        </div>
      </Section>
    </PageContainer>
  )
}
