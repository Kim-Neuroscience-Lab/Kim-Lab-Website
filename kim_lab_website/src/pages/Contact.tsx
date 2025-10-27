import { Mail, MapPin, Phone } from 'lucide-react'
import { PageContainer, PageHeader, Section, Card, CardTitle, CardDescription, SectionTitle, Button } from '../components/ui'
import { SECTION_DELAYS } from '../lib/animations'

export function Contact() {
  return (
    <PageContainer>
      <PageHeader 
        title="Contact" 
        description="Get in touch with the Kim Neuroscience Lab"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <Section delay={SECTION_DELAYS[0]} className="space-y-6">
            <Card>
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-moebius-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <CardTitle>Email</CardTitle>
                  <CardDescription className="mb-2">
                    For general inquiries and collaboration opportunities
                  </CardDescription>
                  <a 
                    href="mailto:ejkim@ucsc.edu"
                    className="text-moebius-blue-400 hover:text-moebius-blue-300 transition-colors"
                  >
                    ejkim@ucsc.edu
                  </a>
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
          </div>
        </Section>

        {/* Contact Form */}
        <Section delay={SECTION_DELAYS[1]}>
          <Card>
            <SectionTitle centered={false}>Send a Message</SectionTitle>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-moebius-blue-400 focus:border-moebius-blue-400 outline-none transition-colors bg-white/50 backdrop-blur-sm"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-moebius-blue-400 focus:border-moebius-blue-400 outline-none transition-colors bg-white/50 backdrop-blur-sm"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-moebius-blue-400 focus:border-moebius-blue-400 outline-none transition-colors bg-white/50 backdrop-blur-sm"
                >
                  <option value="">Select a subject</option>
                  <option value="collaboration">Research Collaboration</option>
                  <option value="position">Position Inquiry</option>
                  <option value="general">General Question</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-moebius-blue-400 focus:border-moebius-blue-400 outline-none transition-colors bg-white/50 backdrop-blur-sm resize-none"
                  placeholder="Tell us about your inquiry..."
                ></textarea>
              </div>
              
              <Button type="submit" className="w-full text-center">
                Send Message
              </Button>
            </form>
          </Card>
        </Section>
      </div>
    </PageContainer>
  )
}