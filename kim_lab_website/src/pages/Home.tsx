import { ArrowRight, BrainCircuit, Microscope, Users, BookOpen } from 'lucide-react'
import { PageContainer, Card, Button, FeatureGrid, SectionDescription, Section } from '../components/ui'
import { ANIMATION_DELAYS, SECTION_DELAYS } from '../lib/animations'

export function Home() {
  const features = [
    {
      icon: BrainCircuit,
      title: "Research",
      description: "Dive into our core questions on neural connectivity and genetic identity",
      to: "/research"
    },
    {
      icon: BookOpen,
      title: "Publications",
      description: "Browse peer-reviewed studies from the Kim Neuroscience Lab",
      to: "/publications"
    },
    {
      icon: Microscope,
      title: "Open Science & Code",
      description: "Access datasets, tools, and software powering our discoveries",
      to: "/code"
    },
    {
      icon: Users,
      title: "People & Positions",
      description: "Meet the team and explore opportunities to join the lab",
      to: "/people"
    }
  ]

  return (
    <PageContainer fullHeight={false}>
      <Section delay={SECTION_DELAYS[0]}>
        <Card size="large" className="text-center">
          {/* Hero Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-primary">
                Kim Neuroscience lab
              </h1>
              <p className="text-xl sm:text-2xl text-secondary max-w-4xl mx-auto">
                University of California, Santa Cruz
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-primary mb-6">
                Development, Connectivity, and Genetic Identity of Cortical Circuits
              </h2>
              <SectionDescription size="large">
                The mammalian cortex is composed of numerous functionally specialized areas. Interactions between these areas, mediated by widespread yet precise cell type specific circuits, are central to the neural computations that generate perception, cognition, and behavior, and make us who we are. Since circuit-level understanding of this brain-wide neural network will elucidate fundamentals of the human mind and behavior, my laboratory focuses on understanding the organizational logic of long-distance cortical circuits and the molecular mechanisms of their development using mouse visual cortex as a model. In the mature brain, what are the connectivity and functional bases of neural circuits at the cellular level? Using novel trans-synaptic tracers and in vivo imaging, we are investigating the identities of brain-wide input and output neurons and their functional contributions to information processing. In the developing brain, what are the mechanisms that match gene expression to neuronal connectivity? It is unknown how a population of neural progenitors in a single cortical area develops into diverse subtypes each projecting to particular brain areas and receiving specific brain-wide inputs. We are examining how genetic programs and neuronal activity interact to construct connectivity.
              </SectionDescription>
              <br />
              <SectionDescription size="large">
                We address these fundamental questions using novel neural circuit tracing systems with next-generation trans-synaptic viral tracers, mouse genetics, single-cell genome-wide sequencing, and in vivo imaging. My lab will address long-standing but previously unapproachable questions about how specific long-distance neural circuits are developed and organized at the single cell level, which will ultimately provide insights into neurodevelopmental disorders such as autism and schizophrenia.
              </SectionDescription>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button to="/research" className="group inline-flex items-center">
                Explore Our Research
                <ArrowRight className="ml-2 h-5 w-5 hover:translate-x-1 transition-transform duration-300 ease-out" />
              </Button>
              <Button variant="secondary" to="/people">
                Meet the Team
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          <FeatureGrid 
            features={features} 
            columns={4} 
            delay={ANIMATION_DELAYS.FEATURE_GRID} 
            className="mt-20" 
          />
        </Card>
      </Section>
    </PageContainer>
  )
}
