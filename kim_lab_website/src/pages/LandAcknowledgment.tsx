import { MapPin, Heart, Users } from 'lucide-react'
import { PageContainer, PageHeader, Section, Card, CardTitle, CardDescription, SectionTitle } from '../components/ui'
import { SECTION_DELAYS } from '../lib/animations'

export function LandAcknowledgment() {
  return (
    <PageContainer>
      <PageHeader 
        title="Land Acknowledgment" 
        description="Recognizing the Indigenous peoples and their enduring connection to this land"
      />

      {/* Main Acknowledgment */}
      <Section delay={SECTION_DELAYS[0]} className="max-w-4xl mx-auto mb-16">
        <Card size="large">
          <div className="flex items-start space-x-6">
            <MapPin className="h-12 w-12 text-moebius-blue-400 flex-shrink-0 mt-2" />
            <div>
              <SectionTitle centered={false} className="mb-6">
                Acknowledging the Amah Mutsun Tribal Band
              </SectionTitle>
              <div className="prose prose-lg max-w-none">
                <CardDescription size="base" className="mb-4">
                  The University of California, Santa Cruz sits on the unceded territory of the Awaswas-speaking Uypi Tribe. 
                  The Amah Mutsun Tribal Band, comprised of the descendants of indigenous people taken to missions Santa Cruz 
                  and San Juan Bautista during Spanish colonization of the Central Coast, is today working hard to restore 
                  traditional stewardship practices on these lands and heal from historical trauma.
                </CardDescription>
                
                <CardDescription size="base" className="mb-4">
                  The Kim Neuroscience Laboratory acknowledges that our research takes place on Indigenous land. We recognize 
                  the Amah Mutsun Tribal Band as the traditional stewards of this area and honor their ongoing connection to 
                  this territory. We are committed to building meaningful relationships with Indigenous communities and 
                  supporting Indigenous sovereignty.
                </CardDescription>
                
                <CardDescription size="base">
                  As we study the complexities of neural networks and brain connectivity, we are reminded that knowledge 
                  systems are deeply interconnected with the lands and communities from which they emerge. We strive to 
                  approach our scientific work with respect for Indigenous knowledge systems and ways of understanding 
                  the natural world.
                </CardDescription>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Action Items */}
      <Section delay={SECTION_DELAYS[1]} className="mb-16">
        <SectionTitle>Our Commitment</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <Heart className="h-12 w-12 text-moebius-blue-400 mx-auto mb-4" />
            <CardTitle>Respect & Recognition</CardTitle>
            <CardDescription size="sm">
              We honor the Indigenous peoples of this land and commit to ongoing education about Indigenous history and culture.
            </CardDescription>
          </Card>

          <Card className="text-center">
            <Users className="h-12 w-12 text-moebius-blue-400 mx-auto mb-4" />
            <CardTitle>Community Partnership</CardTitle>
            <CardDescription size="sm">
              We seek opportunities to build meaningful relationships and collaborate with Indigenous communities.
            </CardDescription>
          </Card>

          <Card className="text-center">
            <MapPin className="h-12 w-12 text-moebius-blue-400 mx-auto mb-4" />
            <CardTitle>Land Stewardship</CardTitle>
            <CardDescription size="sm">
              We support traditional ecological knowledge and Indigenous-led conservation efforts.
            </CardDescription>
          </Card>
        </div>
      </Section>

      {/* Resources */}
      <Section delay={SECTION_DELAYS[2]}>
        <Card size="large" className="max-w-4xl mx-auto">
          <SectionTitle>Learn More</SectionTitle>
          <CardDescription className="mb-6">
            We encourage everyone to learn more about the Indigenous history of this region and ways to support 
            Indigenous communities. Here are some resources to get started:
          </CardDescription>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-primary mb-2">Amah Mutsun Tribal Band</h4>
              <CardDescription className="mb-2">
                Learn about the tribal band's history, culture, and current initiatives including land stewardship and language revitalization.
              </CardDescription>
              <a
                href="https://amahmutsuntribalband.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-moebius-blue-400 hover:text-moebius-blue-300 transition-colors"
              >
                Visit Website →
              </a>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary mb-2">UC Santa Cruz Land Acknowledgment</h4>
              <CardDescription className="mb-2">
                Read the university's full land acknowledgment and learn about campus initiatives supporting Indigenous communities.
              </CardDescription>
              <a
                href="https://www.ucsc.edu/land-acknowledgment/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-moebius-blue-400 hover:text-moebius-blue-300 transition-colors"
              >
                Read More →
              </a>
            </div>
            
            <div>
              <h4 className="font-semibold text-primary mb-2">Native Land Digital</h4>
              <CardDescription className="mb-2">
                Explore an interactive map showing Indigenous territories, languages, and treaties worldwide.
              </CardDescription>
              <a
                href="https://native-land.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-moebius-blue-400 hover:text-moebius-blue-300 transition-colors"
              >
                Explore Map →
              </a>
            </div>
          </div>
        </Card>
      </Section>
    </PageContainer>
  )
}