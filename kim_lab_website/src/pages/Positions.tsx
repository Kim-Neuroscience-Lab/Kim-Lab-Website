import { GraduationCap, Users, Microscope, Mail, ExternalLink } from 'lucide-react'
import { PageContainer, PageHeader, Section, Card, CardTitle, CardDescription, Button } from '../components/ui'
import { SECTION_DELAYS } from '../lib/animations'

export function Positions() {
  return (
    <PageContainer>
      <PageHeader 
        title="Positions" 
        description="Join our team of passionate researchers studying cortical circuit development"
      />


      {/* Position Categories */}
      <div className="space-y-12">
        
        {/* Graduate Students */}
        <Section delay={SECTION_DELAYS[0]}>
          <Card size="large">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-moebius-blue-400 to-moebius-blue-300 rounded-xl flex items-center justify-center flex-shrink-0">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle size="large" className="mb-4">Graduate Students</CardTitle>
                <CardDescription className="mb-6">
                  We have openings for graduate students. Students interested in joining the lab should apply to UC Santa Cruz MCD PhD program. 
                  Prospective students are strongly encouraged to contact the PI early in the application process.
                </CardDescription>
                <Button 
                  href="mailto:ekim62@ucsc.edu?subject=Graduate Student Position Inquiry"
                  className="inline-flex items-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact PI</span>
                </Button>
              </div>
            </div>
          </Card>
        </Section>

        {/* Postdocs */}
        <Section delay={SECTION_DELAYS[1]}>
          <Card size="large">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-moebius-purple-400 to-moebius-purple-300 rounded-xl flex items-center justify-center flex-shrink-0">
                <Microscope className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle size="large" className="mb-4">Postdocs</CardTitle>
                <CardDescription className="mb-6">
                  We have postdoctoral openings for PhDs with a background in neurobiology or neuroscience. 
                  We look for candidates who are driven, curious, and collegial to join our team. 
                  Please contact the PI directly with a CV and a brief summary of research interest.
                </CardDescription>
                <Button 
                  href="mailto:ekim62@ucsc.edu?subject=Postdoctoral Position Inquiry"
                  className="inline-flex items-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact PI</span>
                </Button>
              </div>
            </div>
          </Card>
        </Section>

        {/* Lab Manager / Technician */}
        <Section delay={SECTION_DELAYS[2]}>
          <Card size="large">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-moebius-orange-500 to-moebius-orange-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle size="large" className="mb-4">Lab Manager / Technician</CardTitle>
                <CardDescription className="mb-6">
                  We have positions open for a lab manager and a technician. 
                  Please contact the PI directly for details on the lab manager position.
                </CardDescription>
                <Button 
                  href="mailto:ekim62@ucsc.edu?subject=Lab Manager/Technician Position Inquiry"
                  className="inline-flex items-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact PI</span>
                </Button>
              </div>
            </div>
          </Card>
        </Section>

        {/* Undergraduate Students */}
        <Section delay={SECTION_DELAYS[3]}>
          <Card size="large">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-gradient-to-br from-moebius-green-500 to-moebius-green-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle size="large" className="mb-4">Undergraduate Students</CardTitle>
                <CardDescription className="mb-6">
                  For current undergraduate student applications please submit an application through the following link. 
                  Submissions are always kept and replied to as positions become available.
                </CardDescription>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="https://forms.gle/QNdGnKxhi8MR2uUQ7"
                    className="inline-flex items-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Apply Here</span>
                  </Button>
                  <Button 
                    variant="secondary"
                    href="mailto:ekim62@ucsc.edu?subject=Undergraduate Research Questions"
                    className="inline-flex items-center space-x-2"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Learn More</span>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Section>

      </div>
    </PageContainer>
  )
}