import { useRef, useMemo, useEffect, useCallback } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
// @ts-ignore - Shader module doesn't have TypeScript declarations
import { createMoebiusMaterial } from '../shaders/moebiusShader.js'

// Neuron mesh component
function RealNeuronMesh() {
  const groupRef = useRef<THREE.Group>(null)
  
  // Load the high-detail model
  const gltf = useLoader(GLTFLoader, '/neuron_optimized.glb')
  
  // Create material
  const material = useMemo(() => 
    createMoebiusMaterial('#0ea5e9', { 
      brightness: 1.0,
      colorLevel: 1.0, // Overall brightness multiplier
      colorThreshold1: 0.7, // LIGHT_BLUISH threshold (higher = less light blue)
      colorThreshold2: 0.0001, // WARM_BLUE threshold (higher = less warm blue)
      colorBlendWidth: 0.5,  // Smoothness of color transitions (0.0 = sharp, 0.2 = very smooth)
      debugDistance: false // Disable debug mode to see actual hatching
    }), []
  )

  // Throttled resize handler to prevent excessive updates
  const handleResize = useCallback(() => {
    if (material.uniforms && material.uniforms.uResolution) {
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    }
  }, [material])

  // Add resize listener with throttling
  useEffect(() => {
    let timeoutId: number
    const throttledResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 100) // Throttle to 100ms
    }
    
    window.addEventListener('resize', throttledResize)
    return () => {
      window.removeEventListener('resize', throttledResize)
      clearTimeout(timeoutId)
    }
  }, [handleResize])

  // Update shader uniforms and rotation - using Three.js built-in methods
  useFrame((state) => {
    // Only update time uniform if material is ready
    if (material.uniforms && material.uniforms.uTime) {
      material.uniforms.uTime.value = state.clock.elapsedTime
    }
    
    // Update camera position for per-vertex distance calculation
    if (material.uniforms && material.uniforms.uCameraPosition) {
      material.uniforms.uCameraPosition.value.copy(state.camera.position)
    }
    
    // Color level is now controlled by the material options
    // You can change it by modifying the colorLevel value in createMoebiusMaterial
    
    // Simple auto-rotation - using Three.js built-in rotation
    if (groupRef.current && groupRef.current.visible) {
      groupRef.current.rotateY(0.0001) // Use built-in rotateY method
    }
  })

  // Create silhouette material once to avoid recreating on every render
  const silhouetteMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        uniform float uOutlineWidth;
        
        void main() {
          // Simple vertex displacement along normal
          vec3 newPosition = position + normal * uOutlineWidth;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Solid black
        }
      `,
      uniforms: {
        uOutlineWidth: { value: 0.00002 }
      },
      side: THREE.BackSide, // Render only back faces
      transparent: false,
      depthWrite: true,
      depthTest: true
    })
  }, [])

  // Create neuron mesh with silhouette using industry standard two-pass approach
  const { neuronMesh, silhouetteMesh } = useMemo(() => {
    const mainMesh = gltf.scene.clone()
    const silhouetteMesh = gltf.scene.clone()
    
    // Setup main mesh with Three.js built-in optimizations
    mainMesh.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.material = material
        child.castShadow = true
        child.receiveShadow = true
        child.frustumCulled = true
        
        // Use Three.js built-in geometry optimization methods
        if (child.geometry) {
          child.geometry.computeBoundingSphere()
          child.geometry.computeBoundingBox()
          // Use built-in geometry disposal prevention
          child.geometry.dispose = () => {} // Prevent accidental disposal
        }
      }
    })
    
    // Setup silhouette mesh - use pre-created material with Three.js built-in methods
    silhouetteMesh.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.material = silhouetteMaterial
        child.frustumCulled = true
        
        // Use Three.js built-in geometry optimization methods
        if (child.geometry) {
          child.geometry.computeBoundingSphere()
          child.geometry.computeBoundingBox()
          // Use built-in geometry disposal prevention
          child.geometry.dispose = () => {} // Prevent accidental disposal
        }
      }
    })
    
    return { neuronMesh: mainMesh, silhouetteMesh }
  }, [gltf, material, silhouetteMaterial])

  return (
    <group ref={groupRef} frustumCulled={true}>
      {/* Render silhouette first (behind) */}
      <primitive object={silhouetteMesh} />
      {/* Render main mesh on top */}
      <primitive object={neuronMesh} />
    </group>
  )
}

// Floating particles for ambient effect - optimized for off-screen culling
function FloatingParticles({ count = 30 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100
    }
    return positions
  }, [count])

  useFrame(() => {
    if (particlesRef.current) {
      // Use Three.js built-in visibility check
      if (particlesRef.current.visible) {
        particlesRef.current.rotation.y += 0.001
        particlesRef.current.rotation.x += 0.0005
      }
    }
  })

  return (
    <points ref={particlesRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color="#4a3c2a"
        transparent
        opacity={0.8}
        sizeAttenuation
        alphaTest={0.1} // Built-in alpha testing
        depthWrite={false} // Built-in depth optimization
        depthTest={true} // Built-in depth testing
      />
    </points>
  )
}

export function Scene3D() {
  const { camera, gl } = useThree()

  // Manually set camera position with downward diagonal angle using Three.js built-in methods
  useEffect(() => {
    // Use Three.js built-in camera positioning methods
    camera.position.set(20,-15, 0.1) // X: right, Y: up, Z: back - moved even further back
    camera.lookAt(0, 0, 0) // Looking at the origin
    
    // Use Three.js built-in camera optimization methods
    camera.far = 5000 // Set reasonable far plane
    camera.near = 0.01 // Set reasonable near plane
    
    // Increase field of view to reduce corner clipping
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 110 // Increase to 110 degrees for much wider view
      camera.updateProjectionMatrix()
    }
    
    // Use Three.js built-in renderer optimization methods
    // Note: Frustum culling is enabled by default in Three.js
    // Additional optimizations are handled at the object level
  }, [camera, gl])
  

  return (
    <>
      {/* Moebius-style gradient background */}
      <mesh position={[0, 0, -100]} scale={[200, 200, 200]}>
        <sphereGeometry args={[1, 16, 16]} />
        <primitive 
          object={new THREE.ShaderMaterial({
            vertexShader: `
              varying vec3 vWorldPosition;
              void main() {
                vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              varying vec3 vWorldPosition;
              
              // HSL to RGB conversion function
              vec3 hslToRgb(vec3 hsl) {
                float h = hsl.x / 360.0;
                float s = hsl.y;
                float l = hsl.z;
                
                float c = (1.0 - abs(2.0 * l - 1.0)) * s;
                float x = c * (1.0 - abs(mod(h * 6.0, 2.0) - 1.0));
                float m = l - c * 0.5;
                
                vec3 rgb;
                if (h < 1.0/6.0) {
                  rgb = vec3(c, x, 0.0);
                } else if (h < 2.0/6.0) {
                  rgb = vec3(x, c, 0.0);
                } else if (h < 3.0/6.0) {
                  rgb = vec3(0.0, c, x);
                } else if (h < 4.0/6.0) {
                  rgb = vec3(0.0, x, c);
                } else if (h < 5.0/6.0) {
                  rgb = vec3(x, 0.0, c);
                } else {
                  rgb = vec3(c, 0.0, x);
                }
                
                return rgb + m;
              }
              
              void main() {
                // Create vertical gradient from deep blue to lighter desaturated blue
                float height = normalize(vWorldPosition).y;
                height = (height + 1.0) * 0.5; // Convert from -1,1 to 0,1
                
                // HSL colors for Moebius-style gradient
                vec3 hsl1 = vec3(0.0, 0.4, 0.6);
                vec3 hsl2 = vec3(30.0, 0.4, 0.8);
                vec3 hsl3 = vec3(70.0, 0.4, 0.9);
                
                // Smooth gradient transitions in HSL space
                vec3 hsl;
                if (height < 0.2) {
                  hsl = mix(hsl1, hsl2, height * 2.0);
                } else {
                  hsl = mix(hsl2, hsl3, (height - 0.2) * 2.0);
                }
                
                // Convert HSL to RGB
                vec3 color = hslToRgb(hsl);
                
                // Add subtle noise for organic feel
                float noise = fract(sin(dot(vWorldPosition.xz * 0.1, vec2(12.9898, 78.233))) * 43758.5453);
                color += (noise - 0.5) * 0.02;
                
                gl_FragColor = vec4(color, 1.0);
              }
            `,
            side: THREE.BackSide
          })}
        />
      </mesh>
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#0ea5e9" intensity={0.5} />
      <pointLight position={[10, -10, 5]} color="#a855f7" intensity={0.5} />
      
      {/* Stars */}
      <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={0.5} />
      
      {/* Neuron mesh */}
      <RealNeuronMesh />
      
      {/* Floating particles */}
      <FloatingParticles count={30} />
      
    </>
  )
}