import { Mail, ExternalLink } from 'lucide-react'
import { PageContainer, PageHeader, Section, Card, CardTitle, CardDescription, SectionTitle } from '../components/ui'
import { SECTION_DELAYS, getCardDelay } from '../lib/animations'

export function People() {
  // Current Lab Members
  const currentMembers = [
    {
      name: "Richard Dickson",
      position: "Postdoctoral Researcher – NIH IRACDA Fellow",
      education: "Ph.D., University of Leeds, U.K.\nB.Sc., University of Leeds, U.K.",
      category: "postdoc",
      photo: "/images/people/Image-from-iOS-1024x768.jpg"
    },
    {
      name: "Matthew Jacobs",
      position: "Postdoctoral Researcher",
      education: "Ph.D., University of California, Santa Cruz\nB.S., University of California, San Diego",
      category: "postdoc",
      photo: "/images/people/2018-11-26-11.47.56-1.jpg"
    },
    {
      name: "Max Chen",
      position: "Assistant Specialist", 
      education: "M.S., San Jose State University",
      category: "staff",
      photo: "/images/people/ML9_4309_0002-731x1024.jpg"
    },
    {
      name: "John Ratliff",
      position: "Junior Specialist",
      education: "B.S., Cognitive and Behavioral Neuroscience, UC San Diego",
      category: "staff",
      photo: "/images/people/john-601x1024.jpg"
    },
    {
      name: "Jorin Eddy",
      position: "Assistant Specialist",
      education: "B.S., Neuroscience and Cognitive Science, UC Santa Cruz",
      category: "staff",
      photo: "/images/people/MU_ID-pic.jpg"
    },
    {
      name: "Adam Murray",
      position: "Undergraduate Researcher - MARC Scholar",
      education: "UC Santa Cruz Undergraduate",
      category: "undergraduate",
      photo: "/images/people/image-1024x1024.png"
    },
    {
      name: "Hannah Tao",
      position: "Undergraduate Researcher",
      education: "UC Santa Cruz Undergraduate",
      category: "undergraduate",
      photo: "/images/people/IMG_1512-768x1024.jpg"
    },
    {
      name: "Sevilla Tovar",
      position: "Undergraduate Researcher",
      education: "UC Santa Cruz Undergraduate",
      category: "undergraduate",
      photo: "/images/people/Sevilla-Tovar.png"
    },
    {
      name: "Lucas Pfaffernoschke",
      position: "Undergraduate Researcher",
      education: "UC Santa Cruz Undergraduate",
      category: "undergraduate",
      photo: "/images/people/Lucas-Pfaffernoschke.png"
    },
    {
      name: "Hope Cross",
      position: "Undergraduate Researcher",
      education: "UC Santa Cruz Undergraduate",
      category: "undergraduate",
      photo: "/images/people/hope-cross.jpeg"
    }
  ]

  // Alumni
  const alumni = [
    "Faye An – Undergraduate Researcher (MCD Biology); UC Santa Cruz Undergraduate",
    "Lily Taylor-Hunt – Undergraduate Researcher (Neuroscience); UC Santa Cruz Undergraduate",
    "Mustapha Major – Graduate Student (MCD Biology); B.S., University of Colorado Denver",
    "Efrain Hernandez Alvarez – Junior Specialist; B.S., University of California, Santa Cruz",
    "Hylen James – Undergraduate Researcher (MARC Scholar); UC Santa Cruz Undergraduate",
    "Gursajan Gill – Graduate Rotation Student; B.A., Biology, Concentration in Neuroscience, Williams College",
    "Julian Swartz – Undergraduate Volunteer Researcher, now Junior Specialist @ Sharma Lab UCSC",
    "Paul Pham – Junior Specialist, now Graduate Student @ UC Riverside", 
    "Mariana Rocha – NIH-PREP Scholar, now Graduate Student @ Emory University",
    "Prabhjot Gill – Undergraduate Volunteer Researcher",
    "Brett Meissner – MCD Graduate Rotation Student, now Graduate Student @ Boeger Lab UCSC",
    "Alexander Hoefler – MCD Graduate Rotation Student",
    "Hyo Gun Lee – MCD Graduate Rotation Student, now Graduate Student @ Zuo Lab UCSC",
    "Gloria Cao – Undergraduate Volunteer Researcher, now Research Specialist @ Stanford",
    "Eugene Kim – Volunteer Researcher", 
    "Jordan Chong – Undergraduate Volunteer Researcher",
    "Stefan Abreo – MCD Graduate Rotation Student, now Graduate Student @ Zuo Lab UCSC",
    "Miles Membreno – CB3 Graduate Rotation Student, now Graduate Student @ Rubin Lab UCSC", 
    "Jordan Nichols – Undergraduate Volunteer Researcher, now Graduate Student @ UCSD",
    "Walid Yuqob – Undergraduate Volunteer Researcher",
    "Liad Hermelin – Undergraduate Volunteer Researcher",
    "Alec Soronow – Graduate Student (MS)",
    "Yesenia Puga – Undergraduate Volunteer Researcher"
  ]

  return (
    <PageContainer>
      <PageHeader 
        title="People" 
        description="Meet the researchers and collaborators working to understand the brain's neural circuits"
      />

      {/* Principal Investigator */}
      <Section delay={SECTION_DELAYS[0]} className="mb-16">
        <SectionTitle>Principal Investigator</SectionTitle>
        <div className="max-w-4xl mx-auto">
          <Card size="large">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/40 shadow-sm bg-neutral-100">
                <img
                  src="/images/people/euiseok-kim.jpg"
                  alt="Euiseok Kim"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <CardTitle size="large">Euiseok Kim</CardTitle>
                <p className="text-moebius-blue-400 mb-4 font-medium">
                  Assistant Professor of MCD Biology
                </p>
                <div className="text-secondary text-sm space-y-1 mb-4">
                  <p>B.S., Yonsei University, Seoul, Korea</p>
                  <p>Ph.D., University of Texas, Southwestern Medical Center at Dallas, TX</p>
                  <p>Postdoctorate, The Salk Institute for Biological Studies and UC San Diego, La Jolla, CA</p>
                </div>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a 
                    href="mailto:ekim62@ucsc.edu"
                    className="inline-flex items-center space-x-2 text-moebius-blue-400 hover:text-moebius-blue-300 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Contact</span>
                  </a>
                  <a 
                    href="https://www.ejkimlab.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-moebius-blue-400 hover:text-moebius-blue-300 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Lab Website</span>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Current Lab Members */}
      <Section delay={SECTION_DELAYS[1]} className="mb-16">
        <SectionTitle>Current Lab Members</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMembers.map((member, index) => (
            <Card key={member.name} delay={getCardDelay(SECTION_DELAYS[1], index)}>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white/40 shadow-sm bg-neutral-100">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardTitle className="mb-2">{member.name}</CardTitle>
                <p className="text-moebius-blue-400 text-sm font-medium mb-3">
                  {member.position}
                </p>
                <CardDescription size="sm" className="whitespace-pre-line">
                  {member.education}
                </CardDescription>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Alumni */}
      <Section delay={SECTION_DELAYS[2]}>
        <SectionTitle>Alumni</SectionTitle>
        <Card size="large" className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alumni.map((alumnus, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 py-2"
              >
                <div className="w-2 h-2 bg-moebius-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <CardDescription size="sm" className="flex-1">
                  {alumnus}
                </CardDescription>
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </PageContainer>
  )
}