import { PageContainer, PageHeader, Section, Card, SectionDescription } from '../components/ui'
import { SECTION_DELAYS } from '../lib/animations'

export function Research() {
  return (
    <PageContainer>
      <PageHeader title="Research" />

      {/* Main Research Content */}
      <Section delay={SECTION_DELAYS[0]}>
        <Card size="large">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary mb-8 text-center">
            Development of Neural Circuits for Higher Brain Functions
          </h2>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <SectionDescription size="large">
              The mammalian cortex is composed of numerous functionally specialized areas. Interactions between these areas, mediated by widespread yet precise cell type specific circuits, are central to the neural computations that generate perception, cognition, and behavior, and make us who we are. Since circuit-level understanding of this brain-wide neural network will elucidate fundamentals of the human mind and behavior, my laboratory focuses on understanding the organizational logic of long-distance cortical circuits and the molecular mechanisms of their development using mouse visual cortex as a model.
            </SectionDescription>

            <SectionDescription size="large">
              In the mature brain, what are the connectivity and functional bases of neural circuits at the cellular level? Using novel trans-synaptic tracers and in vivo imaging, we are investigating the identities of brain-wide input and output neurons and their functional contributions to information processing. In the developing brain, what are the mechanisms that match gene expression to neuronal connectivity? It is unknown how a population of neural progenitors in a single cortical area develops into diverse subtypes each projecting to particular brain areas and receiving specific brain-wide inputs. We are examining how genetic programs and neuronal activity interact to construct connectivity.
            </SectionDescription>

            <SectionDescription size="large">
              We address these fundamental questions using novel neural circuit tracing systems with next-generation trans-synaptic viral tracers, mouse genetics, single-cell genome-wide sequencing, and in vivo imaging. My lab will address long-standing but previously unapproachable questions about how specific long-distance neural circuits are developed and organized at the single cell level, which will ultimately provide insights into neurodevelopmental disorders such as autism and schizophrenia.
            </SectionDescription>
          </div>
        </Card>
      </Section>
    </PageContainer>
  )
}