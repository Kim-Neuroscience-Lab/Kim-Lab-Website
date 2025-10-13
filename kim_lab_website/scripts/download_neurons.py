#!/usr/bin/env python3
"""
Script to download neuron meshes from the MICrONs dataset
Based on: https://tutorial.microns-explorer.org/quickstart_notebooks/06-cloudvolume-download-mesh.html
"""

import os
import sys
from pathlib import Path

# Add the project root to the Python path
project_root = Path(__file__).parent.parent
sys.path.append(str(project_root))

try:
    from caveclient import CAVEclient
    from cloudvolume import CloudVolume
    import trimesh
    import numpy as np
except ImportError as e:
    print(f"Missing required packages. Please install them with:")
    print(f"pip install caveclient cloud-volume trimesh")
    print(f"Error: {e}")
    sys.exit(1)


def setup_client():
    """Set up the CAVE client for MICrONs dataset access"""
    print("Setting up CAVE client...")

    datastack_name = "minnie65_public"
    client = CAVEclient(datastack_name)

    # Set version for consistency
    client.version = 1300
    print(f"Using version: {client.version}")

    return client


def download_static_mesh(neuron_id, output_dir, lod=2):
    """
    Download a static mesh from the MICrONs dataset

    Args:
        neuron_id (int): The neuron ID to download
        output_dir (str): Directory to save the mesh
        lod (int): Level of detail (0=highest, 3=lowest)
    """
    print(f"Downloading neuron {neuron_id} with LOD {lod}...")

    # Set up CloudVolume for static meshes
    cv = CloudVolume(
        "precomputed://gs://iarpa_microns/minnie/minnie65/seg_m1300", use_https=True
    )

    try:
        # Download the mesh
        mesh_data = cv.mesh.get(neuron_id, lod=lod)[neuron_id]

        print(
            f"Downloaded mesh with {mesh_data.vertices.shape[0]} vertices and {mesh_data.faces.shape[0]} faces"
        )

        # Create output directory
        os.makedirs(output_dir, exist_ok=True)

        # Save as OBJ file (good for Blender import)
        obj_path = os.path.join(output_dir, f"neuron_{neuron_id}_lod{lod}.obj")

        # Convert to trimesh format for easier export
        mesh = trimesh.Trimesh(vertices=mesh_data.vertices, faces=mesh_data.faces)

        # Export as OBJ
        mesh.export(obj_path)
        print(f"Saved mesh to: {obj_path}")

        # Also save as PLY (alternative format)
        ply_path = os.path.join(output_dir, f"neuron_{neuron_id}_lod{lod}.ply")
        mesh.export(ply_path)
        print(f"Saved mesh to: {ply_path}")

        return mesh

    except Exception as e:
        print(f"Error downloading neuron {neuron_id}: {e}")
        return None


def download_multiple_lods(neuron_id, output_dir, lods=[0, 1, 2, 3]):
    """Download multiple levels of detail for a neuron"""
    print(f"Downloading multiple LODs for neuron {neuron_id}...")

    cv = CloudVolume(
        "precomputed://gs://iarpa_microns/minnie/minnie65/seg_m1300", use_https=True
    )

    for lod in lods:
        try:
            mesh_data = cv.mesh.get(neuron_id, lod=lod)[neuron_id]
            print(
                f"LOD {lod}: {mesh_data.vertices.shape[0]} vertices, {mesh_data.faces.shape[0]} faces"
            )

            # Save as OBJ
            obj_path = os.path.join(output_dir, f"neuron_{neuron_id}_lod{lod}.obj")
            mesh = trimesh.Trimesh(vertices=mesh_data.vertices, faces=mesh_data.faces)
            mesh.export(obj_path)
            print(f"Saved LOD {lod} to: {obj_path}")

        except Exception as e:
            print(f"Error downloading LOD {lod} for neuron {neuron_id}: {e}")


def main():
    """Main function to download the specified neurons"""

    # Neuron IDs you specified
    neuron_ids = [864691135975539779, 864691135801604706]

    # Create output directory
    output_dir = "downloaded_neurons"
    os.makedirs(output_dir, exist_ok=True)

    print("=" * 60)
    print("MICrONs Neuron Mesh Downloader")
    print("=" * 60)
    print(f"Downloading {len(neuron_ids)} neurons...")
    print(f"Output directory: {output_dir}")
    print()

    # Set up client
    client = setup_client()

    # Download each neuron
    for i, neuron_id in enumerate(neuron_ids, 1):
        print(f"\n[{i}/{len(neuron_ids)}] Processing neuron {neuron_id}")
        print("-" * 40)

        # Download multiple LODs for each neuron
        download_multiple_lods(neuron_id, output_dir, lods=[1, 2, 3])

        print(f"Completed neuron {neuron_id}")

    print("\n" + "=" * 60)
    print("Download complete!")
    print(f"Check the '{output_dir}' directory for your mesh files.")
    print("\nFor Blender import:")
    print("1. Open Blender")
    print("2. File > Import > Wavefront (.obj)")
    print("3. Select one of the downloaded .obj files")
    print("4. The mesh will be imported in nanometers (very large scale)")
    print("5. You may need to scale it down significantly")
    print("=" * 60)


if __name__ == "__main__":
    main()
