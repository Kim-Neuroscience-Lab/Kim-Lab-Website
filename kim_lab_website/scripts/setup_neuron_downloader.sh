#!/bin/bash

# Setup script for downloading MICrONs neuron meshes
echo "Setting up MICrONs neuron mesh downloader..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install requirements
echo "Installing required packages..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Setup complete!"
echo ""
echo "To use the downloader:"
echo "1. Activate the virtual environment: source venv/bin/activate"
echo "2. Run the downloader: python download_neurons.py"
echo ""
echo "Note: You may need to set up CAVE authentication first."
echo "See: https://tutorial.microns-explorer.org/quickstart_notebooks/01-caveclient-setup.html"
