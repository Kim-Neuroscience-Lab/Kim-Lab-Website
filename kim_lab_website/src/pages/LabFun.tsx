import { PageContainer, PageHeader, Section, Card, CardTitle, CardDescription } from '../components/ui'
import { SECTION_DELAYS } from '../lib/animations'

export function LabFun() {
  return (
    <PageContainer>
      <PageHeader
        title="Lab Fun"
        description="Life in the lab beyond the bench"
      />

      <Section delay={SECTION_DELAYS[0]}>
        <div className="max-w-2xl mx-auto">
          <Card size="large" className="text-center">
            <CardTitle size="large">Coming Soon</CardTitle>
            <CardDescription>
              Photos and stories from our lab activities, events, and celebrations will be shared here soon.
            </CardDescription>
          </Card>
        </div>
      </Section>
    </PageContainer>
  )
}
