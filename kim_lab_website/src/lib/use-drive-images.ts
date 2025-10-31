/**
 * React Hook for fetching images from Google Drive
 * Includes polling for live updates
 */

import { useState, useEffect, useCallback } from 'react'
import { fetchDriveImages, getDriveConfig, type DriveImage } from './drive-service'

interface UseDriveImagesOptions {
  folderId: string
  pollingInterval?: number // milliseconds, default 5 minutes
  enabled?: boolean // whether to fetch, default true
  sortByFilename?: boolean // whether to sort by filename number, default false
}

interface UseDriveImagesReturn {
  images: DriveImage[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

/**
 * Hook to fetch and poll Google Drive images
 * @param options - Configuration options
 * @returns Images, loading state, error, and refetch function
 */
export function useDriveImages({
  folderId,
  pollingInterval = 5 * 60 * 1000, // 5 minutes default
  enabled = true,
  sortByFilename = false,
}: UseDriveImagesOptions): UseDriveImagesReturn {
  const [images, setImages] = useState<DriveImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { apiKey } = getDriveConfig()

  const fetchImages = useCallback(async () => {
    // Skip if not enabled or no API key
    if (!enabled || !apiKey || !folderId) {
      setLoading(false)
      if (!apiKey) {
        setError('Google Drive API key not configured')
      }
      return
    }

    try {
      setError(null)
      const fetchedImages = await fetchDriveImages(folderId, apiKey, sortByFilename)
      setImages(fetchedImages)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch images'
      setError(errorMessage)
      console.error('Error in useDriveImages:', err)
    } finally {
      setLoading(false)
    }
  }, [folderId, apiKey, enabled, sortByFilename])

  // Initial fetch
  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  // Polling for updates
  useEffect(() => {
    if (!enabled || pollingInterval <= 0) {
      return
    }

    const interval = setInterval(() => {
      fetchImages()
    }, pollingInterval)

    return () => clearInterval(interval)
  }, [fetchImages, pollingInterval, enabled])

  return {
    images,
    loading,
    error,
    refetch: fetchImages,
  }
}
