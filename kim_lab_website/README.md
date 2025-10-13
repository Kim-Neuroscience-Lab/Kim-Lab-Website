# Kim Neuroscience Lab Website

A modern, interactive website for the Kim Neuroscience Lab at UC Santa Cruz, built with React, Three.js, and inspired by Moebius comics aesthetic.

## Features

- **3D Neural Visualizations**: Interactive Three.js scenes with neuron meshes and particle effects
- **Moebius-Inspired Design**: Custom color palette and styling inspired by the iconic French comic artist
- **Smooth Animations**: Framer Motion for fluid page transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Stack**: React 18, TypeScript, Vite for optimal development experience

## Tech Stack

### Frontend Core

- **React 18** + **TypeScript** - Component architecture for complex 3D scenes
- **Vite** - Fast build tool with excellent hot reload
- **Three.js** + **@react-three/fiber** - 3D graphics and neural visualizations
- **@react-three/drei** - Useful helpers for Three.js patterns

### Styling & UI

- **Tailwind CSS** - Utility-first styling with custom Moebius theme
- **Framer Motion** - Smooth animations and page transitions
- **React Hook Form** - Form handling with validation
- **Radix UI** - Accessible component primitives

### Development Tools

- **ESLint** + **Prettier** - Code quality and formatting
- **TypeScript** - Type safety and better developer experience

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd kim_lab_website
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navigation.tsx  # Site navigation
│   ├── Footer.tsx      # Site footer
│   └── Scene3D.tsx     # Three.js 3D scene
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Research.tsx    # Research overview
│   ├── People.tsx      # Team members
│   ├── Publications.tsx # Research publications
│   ├── Contact.tsx     # Contact information
│   ├── Positions.tsx   # Open positions
│   ├── Code.tsx        # Code & resources
│   └── LandAcknowledgment.tsx # Land acknowledgment
├── lib/                # Utility functions
│   └── utils.ts        # Common utilities
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## Design System

### Color Palette (Moebius-Inspired)

- **Blue**: `#0ea5e9` - Primary brand color
- **Purple**: `#a855f7` - Secondary accent
- **Orange**: `#f97316` - Highlight color
- **Green**: `#22c55e` - Success/positive actions

### Typography

- **Display Font**: Space Grotesk - For headings and titles
- **Body Font**: Inter - For body text and UI elements

## 3D Scene Features

The website includes an interactive 3D scene with:

- Procedurally generated neuron meshes
- Floating particle effects
- Dynamic lighting and materials
- Smooth camera animations
- Ambient environmental effects

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the artistic style of Jean Giraud (Moebius)
- Built for the Kim Neuroscience Lab at UC Santa Cruz
- Original website: https://www.ejkimlab.com/

## Contact

For questions about this website, please contact:

- Email: ejkim@ucsc.edu
- Lab Website: https://www.ejkimlab.com/
