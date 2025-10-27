import { PageContainer, PageHeader, Section, Card, CardTitle, CardDescription, SectionTitle } from '../components/ui'
import { SECTION_DELAYS, getCardDelay } from '../lib/animations'

export function LabFun() {
  // Placeholder events and activities
  const labActivities = [
    {
      title: "Lab Retreats",
      description: "Annual lab retreats for team building and scientific discussions",
      image: "/images/lab-fun/retreat.jpg"
    },
    {
      title: "Social Events",
      description: "Regular social gatherings and celebrations",
      image: "/images/lab-fun/social.jpg"
    },
    {
      title: "Conference Adventures",
      description: "Team members presenting at conferences around the world",
      image: "/images/lab-fun/conference.jpg"
    },
    {
      title: "Lab Celebrations",
      description: "Celebrating research milestones and achievements",
      image: "/images/lab-fun/celebration.jpg"
    }
  ]

  return (
    <PageContainer>
      <PageHeader
        title="Lab Fun"
        description="Life in the lab beyond the bench"
      />

      <Section delay={SECTION_DELAYS[0]} className="space-y-8">
        <SectionTitle>Lab Activities & Events</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {labActivities.map((activity, index) => (
            <Card key={activity.title} delay={getCardDelay(SECTION_DELAYS[0], index)}>
              <div className="aspect-w-16 aspect-h-9 bg-slate-200 rounded-lg overflow-hidden mb-4">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
              </div>
              <CardTitle>{activity.title}</CardTitle>
              <CardDescription>
                {activity.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </Section>
    </PageContainer>
  )
}
