import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useThree } from '@react-three/fiber'

export function MoebiusPostProcessing() {
  const { size } = useThree()
  
  // Use lower resolution for better performance
  const renderHeight = Math.min(size.height, 720)
  
  return (
    <EffectComposer>
      {/* Depth of field for realistic focus effects - optimized */}
      <DepthOfField
        focusDistance={0.2}
        focalLength={0.1}
        bokehScale={0.5}
        height={renderHeight}
      />
      
      {/* Bloom effect for Moebius-style glowing highlights - optimized */}
      <Bloom
        intensity={0.1}
        luminanceThreshold={0.95}
        luminanceSmoothing={0.05}
        blendFunction={BlendFunction.ADD}
      />
      
      {/* Chromatic aberration disabled per user request */}
      {/* <ChromaticAberration
        offset={[0.0005, 0.0005]}
        blendFunction={BlendFunction.NORMAL}
      /> */}
      
      {/* Film grain disabled to preserve original look */}
      {/* <Noise
        premultiply
        blendFunction={BlendFunction.OVERLAY}
        opacity={0.05}
      /> */}
    </EffectComposer>
  )
}
