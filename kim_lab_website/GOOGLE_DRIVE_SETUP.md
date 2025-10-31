# Google Drive Gallery Setup Guide

This guide will walk you through setting up the dynamic image galleries for the Gallery and Lab Fun pages using Google Drive.

## Overview

The website automatically fetches images from two separate Google Drive folders:
- **Gallery Folder**: Research images and laboratory photos
- **Lab Fun Folder**: Lab activities, events, and celebrations

Images update automatically every 5 minutes, and descriptions from Google Drive are displayed on the website.

---

## Step 1: Create Google Cloud Project & API Key

### 1.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "NEW PROJECT"
3. Enter project name: "Kim Lab Website" (or your preferred name)
4. Click "CREATE"
5. Wait for the project to be created and select it

### 1.2 Enable Google Drive API

1. In the Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Drive API"
3. Click on "Google Drive API"
4. Click "ENABLE"
5. Wait for the API to be enabled

### 1.3 Create API Key

1. Go to "APIs & Services" → "Credentials"
2. Click "CREATE CREDENTIALS" → "API key"
3. Copy the API key that appears (you'll need this later)
4. Click "EDIT API KEY" to configure restrictions

### 1.4 Restrict API Key (Important for Security)

1. Under "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Click "ADD AN ITEM"
   - Add your website URL: `https://yourdomain.com/*`
   - Add localhost for testing: `http://localhost:*`

2. Under "API restrictions":
   - Select "Restrict key"
   - Check only "Google Drive API"

3. Click "SAVE"

---

## Step 2: Set Up Google Drive Folders

### 2.1 Create Folders

1. Go to [Google Drive](https://drive.google.com/)
2. Create two new folders:
   - "Kim Lab Gallery"
   - "Kim Lab Fun"

### 2.2 Make Folders Public

**For Gallery Folder:**
1. Right-click "Kim Lab Gallery" → "Share"
2. Click "Change to anyone with the link"
3. Set permission to "Viewer"
4. Click "Copy link"
5. Extract the folder ID from the URL:
   ```
   https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j
                                          ↑ This is your folder ID
   ```
6. Save this ID for later

**For Lab Fun Folder:**
1. Repeat the same steps for "Kim Lab Fun" folder
2. Save this folder ID as well

---

## Step 3: Configure Website Environment Variables

You have two options for managing the API key and folder IDs:

### Option A: GitHub Repository Secrets (Recommended for Teams)

**Best for:** Multiple developers, automated deployments, better security

1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Add three secrets:

   **Secret 1:**
   - Name: `VITE_GOOGLE_DRIVE_API_KEY`
   - Value: Your API key from Step 1.3

   **Secret 2:**
   - Name: `VITE_GALLERY_FOLDER_ID`
   - Value: Your Gallery folder ID from Step 2.2

   **Secret 3:**
   - Name: `VITE_LAB_FUN_FOLDER_ID`
   - Value: Your Lab Fun folder ID from Step 2.2

5. Click "Add secret" for each

**Benefits:**
- API key never stored locally
- All team members can develop without needing the API key
- Secure and encrypted by GitHub
- Works automatically in GitHub Actions/deployment

**For Local Development:**
Create a `.env.local` file (this is also gitignored):
```bash
cp .env.example .env.local
```
Then add your values to `.env.local` for testing locally.

### Option B: Local .env File (Simpler for Solo Development)

**Best for:** Single developer, quick setup

1. In your project directory: `kim_lab_website/`
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Open `.env` and add your values:
   ```env
   # Google Drive API Key (from Step 1.3)
   VITE_GOOGLE_DRIVE_API_KEY=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567

   # Gallery Folder ID (from Step 2.2)
   VITE_GALLERY_FOLDER_ID=1a2b3c4d5e6f7g8h9i0j

   # Lab Fun Folder ID (from Step 2.2)
   VITE_LAB_FUN_FOLDER_ID=0k9l8m7n6o5p4q3r2s1t
   ```

**Important:** The `.env` file is already in `.gitignore` and will not be committed to Git.

**⚠️ Never commit `.env` files to Git!**

---

## Step 4: Add Images to Google Drive

### 4.1 Upload Images

1. Go to your Google Drive folders
2. Upload images by dragging and dropping or clicking "New" → "File upload"
3. Supported formats: JPG, PNG, GIF, WebP, etc.

### 4.2 Add Descriptions (Important!)

To add captions that appear on the website:

1. Right-click on an image → "File information" (or press `Ctrl+Alt+I` / `Cmd+Option+I`)
2. In the "Description" field, type your caption
3. Press Enter to save

**Example descriptions:**
- "High-resolution microscopy of neural circuits in mouse visual cortex"
- "Lab retreat at Natural Bridges State Beach, Santa Cruz"
- "Team celebrating successful grant submission"

### 4.3 Image Naming Tips

While descriptions are recommended, you can also use descriptive filenames:
- Good: `2025-01-neuron-imaging.jpg`
- Bad: `IMG_1234.jpg`

---

## Step 5: Test the Setup

### 5.1 Start Development Server

```bash
cd kim_lab_website
npm run dev
```

### 5.2 Check the Pages

1. Navigate to "Gallery" page
2. Navigate to "Lab Fun" page
3. You should see your images appear (may take a few seconds to load)

### 5.3 Verify Descriptions

- Image descriptions from Google Drive should appear below each image
- If no description was added, only the filename will show

---

## How It Works

### Automatic Updates

- **Polling Interval**: Every 5 minutes
- **Update Delay**: New images appear within 5 minutes of upload
- **No rebuild required**: Just upload to Drive and wait

### Image Display

- **Thumbnails**: 800px wide thumbnails load first for performance
- **Full images**: Available when clicked (future feature)
- **Lazy loading**: Images load as you scroll
- **Fallback**: If thumbnail fails, full image loads automatically

### Caching

- Images are fetched fresh every 5 minutes
- Browser caches images for faster subsequent loads
- Descriptions update when images update

---

## Maintenance & Management

### Adding New Images

1. Upload to appropriate Google Drive folder
2. Add description (right-click → File information → Description)
3. Wait up to 5 minutes for website to update
4. That's it!

### Removing Images

1. Delete from Google Drive (or move to trash)
2. Website updates within 5 minutes

### Reordering Images

- Images display in order of most recently modified
- To change order: right-click → "File information" → edit description (even just add a space) → save
- This updates the "modified time" and moves it to the front

### Organizing Images

**Using Folders:**
- Keep separate folders for Gallery vs Lab Fun
- Within each folder, you can create subfolders for organization
- However, only images in the main folder (not subfolders) will appear on the website

**Using Naming Conventions:**
- Prefix filenames with dates: `2025-01-15_event-name.jpg`
- This helps with organization and sorting

---

## Troubleshooting

### "Unable to Load Gallery" Error

**Possible causes:**
1. API key not configured correctly
   - Check `.env` file exists and has correct values
   - Verify API key is valid in Google Cloud Console

2. Folder not shared publicly
   - Ensure folder sharing is set to "Anyone with the link"
   - Check folder ID is correct in `.env`

3. API not enabled
   - Verify Google Drive API is enabled in Cloud Console

4. API key restrictions too strict
   - Check HTTP referrer restrictions include your domain
   - For local testing, ensure `http://localhost:*` is allowed

### Images Not Updating

1. **Check polling**: It can take up to 5 minutes for updates
2. **Hard refresh**: Press `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
3. **Clear cache**: Browser may be caching old images
4. **Check Drive**: Verify images are actually in the correct folder

### No Descriptions Showing

1. **Add descriptions in Drive**: Right-click → File information → Description
2. **Wait for update**: May take up to 5 minutes
3. **Check spelling**: Ensure description field is not empty

### API Quota Exceeded

Google Drive API free tier allows:
- 1,000 requests per 100 seconds per user
- 10,000 requests per day

**Solutions:**
- Increase polling interval in code (currently 5 minutes)
- Upgrade to paid Google Cloud plan (if needed)
- Monitor usage in Cloud Console

---

## Security Best Practices

### API Key Security

✅ **DO:**
- Use HTTP referrer restrictions
- Restrict API key to Google Drive API only
- Keep `.env` file in `.gitignore`
- Never commit API keys to Git
- Use different API keys for development and production

❌ **DON'T:**
- Share API key publicly
- Commit `.env` file to Git
- Use API key without restrictions
- Reuse API keys across multiple projects

### Folder Permissions

✅ **DO:**
- Set to "Anyone with link can view"
- Keep folder IDs private (in `.env`)
- Regularly audit folder contents

❌ **DON'T:**
- Allow public editing access
- Share folder IDs publicly
- Store sensitive content in public folders

---

## Advanced Configuration

### Changing Polling Interval

Edit `src/pages/Gallery.tsx` and `src/pages/LabFun.tsx`:

```typescript
const { images, loading, error, refetch } = useDriveImages({
  folderId: galleryFolderId,
  pollingInterval: 10 * 60 * 1000, // Change to 10 minutes
  enabled: !!galleryFolderId,
})
```

### Disabling Auto-Update

Set `pollingInterval` to `0` to disable automatic polling:

```typescript
pollingInterval: 0, // No automatic updates
```

Then manually refresh using the retry button or browser refresh.

---

## Support

If you encounter issues:

1. Check this guide's troubleshooting section
2. Verify all steps were completed correctly
3. Check browser console for error messages
4. Ensure Google Drive folders are publicly accessible
5. Test with a different browser

---

## Summary Checklist

- [ ] Created Google Cloud Project
- [ ] Enabled Google Drive API
- [ ] Created and restricted API key
- [ ] Created two Google Drive folders
- [ ] Made folders publicly accessible (Viewer permission)
- [ ] Copied folder IDs
- [ ] Created `.env` file with configuration
- [ ] Uploaded test images
- [ ] Added descriptions to images
- [ ] Tested Gallery page
- [ ] Tested Lab Fun page
- [ ] Verified auto-updates work (wait 5 minutes after adding image)

---

**Last Updated**: January 2025
