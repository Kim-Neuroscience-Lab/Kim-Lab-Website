import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Layout } from './components/Layout'
import { Scene3D } from './components/Scene3D'
import { Home } from './pages/Home'
import { Research } from './pages/Research'
import { People } from './pages/People'
import { Publications } from './pages/Publications'
import { Gallery } from './pages/Gallery'
import { LabFun } from './pages/LabFun'
import { Contact } from './pages/Contact'
import { Positions } from './pages/Positions'
import { Code } from './pages/Code'
import { LandAcknowledgment } from './pages/LandAcknowledgment'

function App() {
  return (
    <Router>
      <div className="relative w-full min-h-screen">
        {/* 3D Background Scene - Fixed position */}
        <div className="fixed inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <Scene3D />
            </Suspense>
          </Canvas>
        </div>
        
        {/* Main Content - Scrollable */}
        <div className="relative z-10 w-full">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/research" element={<Research />} />
              <Route path="/people" element={<People />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/lab-fun" element={<LabFun />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/positions" element={<Positions />} />
              <Route path="/code" element={<Code />} />
              <Route path="/land-acknowledgment" element={<LandAcknowledgment />} />
            </Routes>
          </Layout>
        </div>
      </div>
    </Router>
  )
}

export default App
