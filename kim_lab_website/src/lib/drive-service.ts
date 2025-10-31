/**
 * Google Drive Service
 * Fetches images from Google Drive folders using the Drive API v3
 */

export interface DriveImage {
  id: string
  name: string
  description: string
  url: string
  thumbnailUrl: string
  createdTime: string
  modifiedTime: string
}

interface DriveFileResponse {
  id: string
  name: string
  description?: string
  createdTime: string
  modifiedTime: string
  mimeType: string
}

interface DriveApiResponse {
  files: DriveFileResponse[]
  nextPageToken?: string
}

/**
 * Fetch images from a Google Drive folder
 * @param folderId - The Google Drive folder ID
 * @param apiKey - Google API key
 * @returns Array of image objects
 */
export async function fetchDriveImages(
  folderId: string,
  apiKey: string
): Promise<DriveImage[]> {
  try {
    const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`
    const fields = 'files(id,name,description,createdTime,modifiedTime,mimeType)'
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=${encodeURIComponent(fields)}&orderBy=modifiedTime desc&key=${apiKey}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Drive API error: ${response.status} ${response.statusText}`)
    }

    const data: DriveApiResponse = await response.json()

    return data.files.map((file) => ({
      id: file.id,
      name: file.name,
      description: file.description || '',
      url: `https://drive.google.com/uc?export=view&id=${file.id}`,
      thumbnailUrl: `https://drive.google.com/thumbnail?id=${file.id}&sz=w800`,
      createdTime: file.createdTime,
      modifiedTime: file.modifiedTime,
    }))
  } catch (error) {
    console.error('Error fetching Drive images:', error)
    throw error
  }
}

/**
 * Get configuration from environment variables
 */
export function getDriveConfig() {
  const apiKey = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY
  const galleryFolderId = import.meta.env.VITE_GALLERY_FOLDER_ID
  const labFunFolderId = import.meta.env.VITE_LAB_FUN_FOLDER_ID

  if (!apiKey) {
    console.warn('Google Drive API key not configured')
  }

  return {
    apiKey: apiKey || '',
    galleryFolderId: galleryFolderId || '',
    labFunFolderId: labFunFolderId || '',
  }
}
