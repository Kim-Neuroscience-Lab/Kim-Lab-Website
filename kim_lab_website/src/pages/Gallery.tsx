import { PageContainer, PageHeader, Section, Card, SectionTitle } from '../components/ui'
import { SECTION_DELAYS, getCardDelay } from '../lib/animations'

export function Gallery() {
  // Placeholder gallery items - can be updated with actual images
  const galleryItems = [
    {
      title: "Neural Circuit Imaging",
      description: "High-resolution imaging of cortical circuits",
      image: "/images/gallery/placeholder-1.jpg"
    },
    {
      title: "Laboratory Research",
      description: "Advanced microscopy techniques in action",
      image: "/images/gallery/placeholder-2.jpg"
    },
    {
      title: "Brain Connectivity",
      description: "Visualization of long-distance neural connections",
      image: "/images/gallery/placeholder-3.jpg"
    }
  ]

  return (
    <PageContainer>
      <PageHeader
        title="Gallery"
        description="Visual highlights from our research and laboratory"
      />

      <Section delay={SECTION_DELAYS[0]} className="space-y-8">
        <SectionTitle>Research Images</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <Card key={item.title} delay={getCardDelay(SECTION_DELAYS[0], index)}>
              <div className="aspect-w-16 aspect-h-12 bg-slate-200 rounded-lg overflow-hidden mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-secondary">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </PageContainer>
  )
}
