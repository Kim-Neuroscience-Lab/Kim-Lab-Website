import { Mail, MapPin, Phone } from 'lucide-react'
import { PageContainer, PageHeader, Section, Card, CardTitle, CardDescription } from '../components/ui'
import { SECTION_DELAYS } from '../lib/animations'

export function Contact() {
  return (
    <PageContainer>
      <PageHeader
        title="Contact"
        description="Get in touch with the Kim Neuroscience Lab"
      />

      <Section delay={SECTION_DELAYS[0]} className="space-y-6 max-w-2xl mx-auto">
        <Card>
          <div className="flex items-start space-x-4">
            <Mail className="h-6 w-6 text-moebius-blue-400 mt-1 flex-shrink-0" />
            <div>
              <CardTitle>Email</CardTitle>
              <CardDescription className="mb-2">
                For general inquiries and collaboration opportunities
              </CardDescription>
              <span className="text-moebius-blue-400">
                ekim62 at ucsc dot edu
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start space-x-4">
            <MapPin className="h-6 w-6 text-moebius-blue-400 mt-1 flex-shrink-0" />
            <div>
              <CardTitle>Laboratory Location</CardTitle>
              <CardDescription>
                Department of Molecular, Cell & Developmental Biology<br />
                University of California, Santa Cruz<br />
                1156 High Street<br />
                Santa Cruz, CA 95064
              </CardDescription>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start space-x-4">
            <Phone className="h-6 w-6 text-moebius-blue-400 mt-1 flex-shrink-0" />
            <div>
              <CardTitle>Phone</CardTitle>
              <CardDescription className="mb-2">
                Laboratory and office phone
              </CardDescription>
              <a
                href="tel:+1-831-459-4601"
                className="text-moebius-blue-400 hover:text-moebius-blue-300 transition-colors"
              >
                (831) 459-4601
              </a>
            </div>
          </div>
        </Card>
      </Section>
    </PageContainer>
  )
}