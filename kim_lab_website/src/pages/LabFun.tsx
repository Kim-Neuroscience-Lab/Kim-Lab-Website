import { RefreshCw, AlertTriangle, Image as ImageIcon } from 'lucide-react'
import { PageContainer, PageHeader, Section, Card, CardTitle, CardDescription, Button } from '../components/ui'
import { SECTION_DELAYS, getCardDelay } from '../lib/animations'
import { useDriveImages } from '../lib/use-drive-images'
import { getDriveConfig } from '../lib/drive-service'

export function LabFun() {
  const { labFunFolderId } = getDriveConfig()
  const { images, loading, error, refetch } = useDriveImages({
    folderId: labFunFolderId,
    enabled: !!labFunFolderId,
  })

  return (
    <PageContainer>
      <PageHeader
        title="Lab Fun"
        description="Life in the lab beyond the bench"
      />

      <Section delay={SECTION_DELAYS[0]}>
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 text-moebius-blue-400 animate-spin mb-4" />
            <p className="text-secondary">Loading lab photos...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="border border-moebius-orange-300 bg-white/70 max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-moebius-orange-600" />
              <div>
                <CardTitle className="text-moebius-orange-600 mb-2">Unable to Load Photos</CardTitle>
                <CardDescription className="text-moebius-orange-600/80 mb-4">
                  {error}
                </CardDescription>
                <Button onClick={refetch} variant="secondary" className="inline-flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Retry</span>
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {!loading && !error && images.length === 0 && (
          <div className="max-w-2xl mx-auto">
            <Card size="large" className="text-center">
              <ImageIcon className="h-16 w-16 text-moebius-blue-400 mx-auto mb-4" />
              <CardTitle size="large">No Photos Yet</CardTitle>
              <CardDescription>
                Photos and stories from our lab activities, events, and celebrations will be shared here soon.
              </CardDescription>
            </Card>
          </div>
        )}

        {/* Image Grid */}
        {!loading && !error && images.length > 0 && (
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {images.map((image, index) => (
              <Card key={image.id} delay={getCardDelay(SECTION_DELAYS[0], index)} className="break-inside-avoid mb-6">
                <div className="bg-slate-200 rounded-lg overflow-hidden mb-4">
                  <img
                    src={image.thumbnailUrl}
                    alt={image.description || image.name}
                    className="w-full h-auto"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to direct URL if thumbnail fails
                      e.currentTarget.src = image.url
                    }}
                  />
                </div>
                {image.description && (
                  <CardDescription>
                    {image.description}
                  </CardDescription>
                )}
              </Card>
            ))}
          </div>
        )}
      </Section>
    </PageContainer>
  )
}
