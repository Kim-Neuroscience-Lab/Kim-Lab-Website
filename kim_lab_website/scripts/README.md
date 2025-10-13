# MICrONs Neuron Mesh Downloader

This script downloads neuron meshes from the MICrONs dataset for use in the Kim Lab website's 3D background.

## Setup

1. **Install dependencies:**

   ```bash
   chmod +x setup_neuron_downloader.sh
   ./setup_neuron_downloader.sh
   ```

2. **Set up CAVE authentication:**
   - Follow the [CAVEclient setup guide](https://tutorial.microns-explorer.org/quickstart_notebooks/01-caveclient-setup.html)
   - You'll need to authenticate with Google Cloud to access the MICrONs dataset

## Usage

1. **Activate the virtual environment:**

   ```bash
   source venv/bin/activate
   ```

2. **Run the downloader:**
   ```bash
   python download_neurons.py
   ```

## What it downloads

The script downloads the following neurons:

- **864691135975539779**
- **864691135801604706**

For each neuron, it downloads multiple levels of detail (LOD):

- **LOD 1**: ~1.4M vertices (high detail)
- **LOD 2**: ~250K vertices (medium detail)
- **LOD 3**: ~57K vertices (low detail)

## Output

Files are saved to `downloaded_neurons/` directory:

- `neuron_864691135975539779_lod1.obj` (and .ply)
- `neuron_864691135975539779_lod2.obj` (and .ply)
- `neuron_864691135975539779_lod3.obj` (and .ply)
- `neuron_864691135801604706_lod1.obj` (and .ply)
- `neuron_864691135801604706_lod2.obj` (and .ply)
- `neuron_864691135801604706_lod3.obj` (and .ply)

## Blender Import

1. Open Blender
2. File > Import > Wavefront (.obj)
3. Select one of the downloaded .obj files
4. **Important**: The mesh will be imported in nanometers (very large scale)
5. Scale it down significantly (try 0.001 or smaller)
6. Clean up the mesh as needed
7. Export in a format suitable for Three.js (GLTF/GLB recommended)

## Integration with Website

After cleaning in Blender:

1. Export as GLTF/GLB format
2. Place in `public/models/` directory
3. Update the `Scene3D.tsx` component to load the real neuron meshes
4. Apply the Moebius shader to the imported meshes

## Notes

- **File sizes**: Meshes can be hundreds of MB, so be mindful of disk space
- **Coordinate system**: MICrONs uses a different coordinate system (Y-axis increases downward)
- **Scale**: Everything is in nanometers, so you'll need to scale significantly for web use
- **Performance**: Start with LOD 2 or 3 for web use, LOD 1 is very high detail

## Troubleshooting

- **Authentication errors**: Make sure you've set up CAVE authentication properly
- **Download failures**: Check your internet connection and try again
- **Import issues in Blender**: Try different LOD levels or check the file format
