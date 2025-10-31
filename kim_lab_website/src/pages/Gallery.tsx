import { RefreshCw, AlertTriangle, Image as ImageIcon } from 'lucide-react'
import { PageContainer, PageHeader, Section, Card, CardTitle, CardDescription, Button } from '../components/ui'
import { SECTION_DELAYS, getCardDelay } from '../lib/animations'
import { useDriveImages } from '../lib/use-drive-images'
import { getDriveConfig } from '../lib/drive-service'

export function Gallery() {
  const { galleryFolderId } = getDriveConfig()
  const { images, loading, error, refetch } = useDriveImages({
    folderId: galleryFolderId,
    enabled: !!galleryFolderId,
  })

  return (
    <PageContainer>
      <PageHeader
        title="Gallery"
        description="Visual highlights from our research and laboratory"
      />

      <Section delay={SECTION_DELAYS[0]}>
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 text-moebius-blue-400 animate-spin mb-4" />
            <p className="text-secondary">Loading gallery images...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <Card className="border border-moebius-orange-300 bg-white/70 max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <AlertTriangle className="h-12 w-12 text-moebius-orange-600" />
              <div>
                <CardTitle className="text-moebius-orange-600 mb-2">Unable to Load Gallery</CardTitle>
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
              <CardTitle size="large">No Images Yet</CardTitle>
              <CardDescription>
                Gallery images will appear here once they are added to Google Drive.
              </CardDescription>
            </Card>
          </div>
        )}

        {/* Image Grid */}
        {!loading && !error && images.length > 0 && (
          <div className="space-y-8">
            {images.map((image, index) => (
              <Card key={image.id} delay={getCardDelay(SECTION_DELAYS[0], index)}>
                <div className="bg-slate-200 rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.description || image.name}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </PageContainer>
  )
}
