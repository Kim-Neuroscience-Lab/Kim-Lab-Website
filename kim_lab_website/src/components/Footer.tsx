import { MapPin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative z-40">
      <div className="absolute inset-0 bg-[rgba(248,250,252,0.75)] border-t border-[rgba(166,183,217,0.25)] shadow-[0_-12px_32px_rgba(166,183,217,0.16),0_-4px_12px_rgba(0,0,0,0.08)] backdrop-blur-xl"></div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 text-secondary">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="text-sm">
              © 2025 Kim Neuroscience Lab. All rights reserved.
            </p>
            <p className="text-xs text-secondary/70 mt-1">
              Background neuron morphology adapted from the MICrONS dataset (
              <a
                href="https://www.microns-explorer.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-moebius-blue-400 transition-colors underline"
              >
                www.microns-explorer.org
              </a>
              )
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 text-center md:text-right order-1 md:order-2">
            <div className="flex items-center justify-center md:justify-end space-x-2 text-primary">
              <MapPin className="h-4 w-4 text-moebius-blue-400" />
              <span>University of California, Santa Cruz</span>
            </div>
            <div className="flex items-center justify-center md:justify-end space-x-2 text-primary">
              <Mail className="h-4 w-4 text-moebius-blue-400" />
              <a
                href="mailto:ejkim@ucsc.edu"
                className="hover:text-moebius-blue-300 transition-colors"
              >
                ejkim@ucsc.edu
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
