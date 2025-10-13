import * as THREE from 'three'

// Enhanced vertex shader with vertex displacement
export const moebiusVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec4 vScreenPosition;
  varying vec3 vViewPosition;
  varying vec3 vWorldNormal;
  varying float vNoise;
  varying float vVertexToCameraDistance;
  
  uniform float uVertexDisplacement;
  uniform float uTime;
  uniform vec3 uCameraPosition;
  
  // Simplex noise for vertex displacement
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  
  vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
  }
  
  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  
  float snoise3D(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 =   v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vPosition = position;
    vUv = uv;
    
     // Generate noise for normal perturbation only (no vertex displacement) - optimized
     vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
     float noise1 = snoise3D(worldPos * 1.0 + uTime * 0.01) * 0.1;
     float noise2 = snoise3D(worldPos * 2.0 + uTime * 0.005) * 0.05;
     // Reduced noise layers for better performance
     
     // Calculate distance from this vertex to camera
     vVertexToCameraDistance = length(worldPos - uCameraPosition);
     vNoise = noise1 + noise2;
     
     // No vertex displacement to maintain mesh integrity
     vec3 displacedPosition = position;
    
    vec4 worldPosition = modelMatrix * vec4(displacedPosition, 1.0);
    vWorldPosition = worldPosition.xyz;
    
    vec4 mvPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
    vViewPosition = mvPosition.xyz;
    
    vScreenPosition = projectionMatrix * mvPosition;
    gl_Position = vScreenPosition;
  }
`

// Aggressive fragment shader for hiding linear artifacts
export function createMoebiusMaterial(color = '#0ea5e9', options = {}) {
  const fragmentShader = `
    uniform vec3 uColor;
    uniform float uTime;
    uniform float uBrightness;
    uniform vec3 uLightDirection;
    uniform vec2 uResolution;
    uniform float uSmoothingIntensity;
    uniform float uNormalPerturbation;
    uniform float uFresnelPower;
    uniform float uArtifactReduction;
    uniform float uColorSmoothing;
    uniform float uColorLevel;
    uniform float uColorThreshold1; // Controls where LIGHT_BLUISH starts
    uniform float uColorThreshold2; // Controls where WARM_BLUE starts
    uniform float uColorBlendWidth; // Controls smoothness of color transitions
    uniform float uHueShift; // Global hue shift for all colors
    uniform float uSaturationMultiplier; // Global saturation multiplier
    uniform float uLightnessMultiplier; // Global lightness multiplier
    uniform bool uDebugDistance; // Debug flag to visualize distance
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying vec4 vScreenPosition;
    varying vec3 vViewPosition;
    varying vec3 vWorldNormal;
    varying float vNoise;
    varying float vVertexToCameraDistance;
    
    // Hatching configuration
    const float BASE_LINE_SPACING = .6;
    const float LINE_THICKNESS = 0.1;
    const float HATCH_LEVEL1 = 0.9;
    const float HATCH_LEVEL2 = 0.1;
    const float BASE_HATCH_INTENSITY = 0.9;
    
    // Distance-based hatching frequency levels
    float getQuantizedHatchingFrequency(float cameraDistance) {
      // Define discrete distance thresholds and corresponding line spacing
      // Closer to camera = lower frequency (larger spacing) - like original
      // Farther from camera = higher frequency (smaller spacing) - like original
      
      if (cameraDistance < 15.0) {
        return BASE_LINE_SPACING * 2.0; // Lower frequency (close) - larger spacing
      } else if (cameraDistance < 25.0) {
        return BASE_LINE_SPACING * 1.5; // Medium-low frequency
      } else if (cameraDistance < 40.0) {
        return BASE_LINE_SPACING * 1.0; // Base frequency
      } else if (cameraDistance < 60.0) {
        return BASE_LINE_SPACING * 0.7; // Higher frequency
      } else if (cameraDistance < 80.0) {
        return BASE_LINE_SPACING * 0.5; // High frequency
      } else {
        return BASE_LINE_SPACING * 0.3; // Very high frequency (far) - smaller spacing
      }
    }
    
    // Distance-based hatching intensity levels
    float getQuantizedHatchingIntensity(float cameraDistance) {
      // Closer to camera = lower intensity (more subtle)
      // Farther from camera = higher intensity (more pronounced)
      
      if (cameraDistance < 15.0) {
        return BASE_HATCH_INTENSITY * 0.3; // Very subtle (close)
      } else if (cameraDistance < 25.0) {
        return BASE_HATCH_INTENSITY * 0.5; // Subtle
      } else if (cameraDistance < 40.0) {
        return BASE_HATCH_INTENSITY * 0.7; // Medium
      } else if (cameraDistance < 60.0) {
        return BASE_HATCH_INTENSITY * 1.0; // Base intensity
      } else if (cameraDistance < 80.0) {
        return BASE_HATCH_INTENSITY * 1.2; // More intense
      } else {
        return BASE_HATCH_INTENSITY * 1.5; // Very intense (far)
      }
    }
    
    // Color level control is now applied to the brightness value in the fragment shader
    
    // HSL color definitions (Hue, Saturation, Lightness)
    const vec3 LIGHT_BLUISH_HSL = vec3(210.0, 0.3, 0.8);    // Blue hue, 60% saturation, 70% lightness
    const vec3 WARM_BLUE_HSL = vec3(220.0, 0.4, 0.75); // Warm blue hue, 40% saturation, 75% lightness  
    const vec3 DESATURATED_PINK_HSL = vec3(340.0, 0.3, 0.7); // Pink hue, 30% saturation, 80% lightness
    
    // HSL to RGB conversion function
    vec3 hslToRgb(vec3 hsl) {
      float h = hsl.x / 360.0; // Convert hue to 0-1 range
      float s = hsl.y;
      float l = hsl.z;
      
      float c = (1.0 - abs(2.0 * l - 1.0)) * s;
      float x = c * (1.0 - abs(mod(h * 6.0, 2.0) - 1.0));
      float m = l - c / 2.0;
      
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
    
    float smoothStep(float edge0, float edge1, float x) {
      float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
      return t * t * (3.0 - 2.0 * t);
    }
    
    float smoothStepAA(float edge, float x, float width) {
      return smoothStep(edge - width, edge + width, x);
    }
    
    // Enhanced 3D simplex noise
    vec3 mod289(vec3 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 mod289(vec4 x) {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 permute(vec4 x) {
      return mod289(((x*34.0)+1.0)*x);
    }
    
    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }
    
    float snoise3D(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0);
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 =   v - i + dot(i, C.xxx);
      
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      i = mod289(i);
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }
    
    float snoise(vec2 v) {
      return snoise3D(vec3(v, 0.0));
    }
    
    float discretizedNoise(vec2 pos, float scale) {
      float noise = snoise(pos * scale);
      return floor(noise * 4.0 + 0.5) / 4.0;
    }
    
     // Aggressive normal blurring to hide discrete faces
     vec3 blurNormals(vec3 normal, float blurStrength) {
       // Get screen-space normal gradients (these indicate face boundaries)
       vec3 normalGradX = dFdx(normal);
       vec3 normalGradY = dFdy(normal);
       
       // Calculate how much we're at a face boundary
       float gradientMagnitude = length(normalGradX) + length(normalGradY);
       
       // Stronger blur at face boundaries
       float faceBoundaryFactor = smoothstep(0.0, 2.0, gradientMagnitude);
       
       // Apply aggressive blur to hide face edges
       vec3 blurredNormal = normal;
       
       // Reduce the gradient influence to blur face boundaries
       blurredNormal -= normalGradX * faceBoundaryFactor * blurStrength * 0.8;
       blurredNormal -= normalGradY * faceBoundaryFactor * blurStrength * 0.8;
       
       // Add some general smoothing even away from boundaries
       blurredNormal -= normalGradX * blurStrength * 0.2;
       blurredNormal -= normalGradY * blurStrength * 0.2;
       
       return normalize(blurredNormal);
     }
     
     // Alternative: Multi-sample normal blurring
     vec3 multiSampleBlur(vec3 normal, float blurRadius) {
       // Sample normals in a small neighborhood
       vec3 normalX = dFdx(normal);
       vec3 normalY = dFdy(normal);
       
       // Create a simple blur kernel
       vec3 blurred = normal;
       blurred += normalX * blurRadius * 0.5;
       blurred += normalY * blurRadius * 0.5;
       blurred -= normalX * blurRadius * 0.25;
       blurred -= normalY * blurRadius * 0.25;
       
       return normalize(blurred);
     }
    
    // Subtle edge detection for gentle smoothing
    float getArtifactFactor(vec3 normal) {
      // Screen-space derivatives for edge detection
      float normalVariation = length(dFdx(normal)) + length(dFdy(normal));
      float positionVariation = length(dFdx(vWorldPosition)) + length(dFdy(vWorldPosition));
      
      // View-dependent edge detection (Fresnel-like) - more subtle
      vec3 viewDir = normalize(-vViewPosition);
      float fresnel = 1.0 - abs(dot(viewDir, normal));
      fresnel = pow(fresnel, uFresnelPower);
      
      // Combine detection methods more gently
      float combinedVariation = normalVariation * 1.0 + positionVariation * 0.05 + fresnel * 0.2;
      
      // Gentler smoothstep for gradual transitions
      return smoothstep(0.1, 0.5, combinedVariation) * uArtifactReduction;
    }
    
    // Generate subtle noise variation for hatching (not hard masking)
    // This keeps hatch lines straight but adds gentle variation to break up artifacts
    float getHatchVariation(vec3 worldPos, float scale) {
      float noise = snoise3D(worldPos * scale);
      float discretized = floor(noise * 4.0 + 0.5) / 4.0; // 4 levels, more subtle
      
      // Return a subtle modulation factor (0.7 to 1.0) instead of hard on/off
      return 0.7 + discretized * 0.3;
    }
    
    
    float getSharedNoise(vec2 screenPos, float brightness) {
      float noiseScale = 0.5;
      float noise = discretizedNoise(screenPos, noiseScale);
      
      float boundaryDistance = min(abs(brightness - HATCH_LEVEL1), abs(brightness - HATCH_LEVEL2));
      float amplitude = 1.0 - smoothStep(0.0, 0.3, boundaryDistance);
      
      return noise * amplitude * 0.3;
    }
    
    // Adaptive hatching with wavy lines and noise based on brightness
    float getHatchLayer1(vec2 screenPos, float brightness, float lineSpacing) {
      // Add wavy distortion to the diagonal lines - optimized
      float waveNoise1 = snoise3D(vWorldPosition * 0.8) * 0.2; // Restored wave intensity
      // Reduced secondary wave for performance
      float waveNoise2 = snoise3D(vWorldPosition * 1.5 + vec3(50.0)) * 0.05;
      
      // Create wavy diagonal lines
      float diagonal = screenPos.x - screenPos.y + waveNoise1 + waveNoise2;
      float line = mod(diagonal, lineSpacing); 
      float halfThickness = LINE_THICKNESS * 0.5;
      float aaWidth = 0.05;
      
      // Adaptive noise based on brightness: darker = less noise, lighter = more noise
      float normalizedBrightness = clamp(brightness, 0.0, 1.0);
      float noiseIntensity = normalizedBrightness * 0.8; // More noise in lighter areas
      
      // Create stipple-like effect for lighter areas
      float stippleNoise = snoise3D(vWorldPosition * 2.0) * 0.4 + 0.5; // Restored stipple intensity
      float stippleMask = step(noiseIntensity, stippleNoise);
      
      // Clean line breaks with adaptive pattern
      float gapLength = 0.3 + noiseIntensity * 0.4; // Longer gaps in lighter areas
      float lineLength = 0.7 - noiseIntensity * 0.4; // Shorter lines in lighter areas
      float segment = mod(diagonal * 2.0, 1.0);
      float lineMask = step(segment, lineLength);
      
      // Generate wavy line
      float lineValue = smoothStepAA(0.5 - halfThickness, line, aaWidth) * 
                        (1.0 - smoothStepAA(0.5 + halfThickness, line, aaWidth));
      
      // Apply adaptive masking
      return lineValue * lineMask * stippleMask;
    }
    
    float getHatchLayer2(vec2 screenPos, float brightness, float lineSpacing) {
      // Add wavy distortion to the diagonal lines (different pattern from layer 1) - optimized
      float waveNoise1 = snoise3D(vWorldPosition * 1.2 + vec3(25.0)) * 0.15; // Restored wave intensity
      // Reduced secondary wave for performance
      float waveNoise2 = snoise3D(vWorldPosition * 2.0 + vec3(75.0)) * 0.02;
      
      // Create wavy diagonal lines
      float diagonal = screenPos.x - screenPos.y + waveNoise1 + waveNoise2;
      float line = mod(diagonal, lineSpacing);
      float halfThickness = LINE_THICKNESS * 0.5;
      float aaWidth = 0.05;
      
      // Adaptive noise based on brightness: darker = less noise, lighter = more noise
      float normalizedBrightness = clamp(brightness, 0.0, 1.0);
      float noiseIntensity = normalizedBrightness * 0.6; // Less aggressive for layer 2
      
      // Create stipple-like effect for lighter areas
      float stippleNoise = snoise3D(vWorldPosition * 1.5 + vec3(50.0)) * 0.4 + 0.5; // Restored stipple intensity
      float stippleMask = step(noiseIntensity, stippleNoise);
      
      // Generate wavy line
      float lineValue = smoothStepAA(0.5 - halfThickness, line, aaWidth) * 
                        (1.0 - smoothStepAA(0.5 + halfThickness, line, aaWidth));
      
      // Apply adaptive masking
      return lineValue * stippleMask;
    }
    
    float applyHatching(vec2 screenPos, float brightness) {
      float hatch = 0.0;
      
      // Get quantized hatching frequency and intensity based on vertex-to-camera distance
      float lineSpacing = getQuantizedHatchingFrequency(vVertexToCameraDistance);
      float hatchIntensity = getQuantizedHatchingIntensity(vVertexToCameraDistance);
      
      // Calculate distance from hatching boundaries
      float distToLevel1 = abs(brightness - HATCH_LEVEL1);
      float distToLevel2 = abs(brightness - HATCH_LEVEL2);
      
      // Layer 1: Binary dithering with adaptive noise scale
      if (brightness < HATCH_LEVEL1) {
        // Larger scale (lower frequency) near boundary, smaller scale (higher frequency) deeper in shadow
        float noiseScale = mix(0.5, 2.0, distToLevel1 / HATCH_LEVEL1); // 0.5 at boundary, 2.0 at depth
        float ditherNoise = snoise3D(vWorldPosition * noiseScale) * 0.5 + 0.5; // 0-1 range
        
        // Binary mask: more masking near boundary, less masking deeper in shadow
        float ditherMask = step(distToLevel1 * 2.0, ditherNoise);
        
        hatch += getHatchLayer1(screenPos, brightness, lineSpacing) * hatchIntensity * ditherMask;
      }
      
      // Layer 2: Binary dithering with adaptive noise scale
      if (brightness < HATCH_LEVEL2) {
        // Larger scale (lower frequency) near boundary, smaller scale (higher frequency) deeper in shadow
        float noiseScale = mix(0.3, 1.5, distToLevel2 / HATCH_LEVEL2); // 0.3 at boundary, 1.5 at depth
        float ditherNoise = snoise3D(vWorldPosition * noiseScale + vec3(100.0)) * 0.5 + 0.5; // Different pattern
        
        // Binary mask: more masking near boundary, less masking deeper in shadow
        float ditherMask = step(distToLevel2 * 2.0, ditherNoise);
        
        hatch += getHatchLayer2(screenPos, brightness, lineSpacing) * hatchIntensity * ditherMask;
      }
      
      return clamp(hatch, 0.0, 1.0);
    }
    
    void main() {
       // Apply aggressive normal blurring FIRST to hide discrete faces
       vec3 smoothNormal = blurNormals(vNormal, uNormalPerturbation);
       
       // All subsequent calculations use the smoothed normal
       // Lighting calculations using smoothed normals
       vec3 lightDir = normalize(uLightDirection);
       float brightness = max(0.0, dot(smoothNormal, lightDir)) * uBrightness;
      
      // Apply controllable color distribution system
      vec3 baseColor;
      
      // Apply color level control to the brightness
      float adjustedBrightness = brightness * uColorLevel;
      adjustedBrightness = clamp(adjustedBrightness, 0.0, 1.0);
      
      // Use controllable thresholds with smooth blending between colors
      // Order: LIGHT_BLUISH (brightest) → WARM_BLUE (medium) → DESATURATED_PINK (darkest)
      float blendWidth = uColorBlendWidth; // Width of smooth transition between colors
      
      // Determine which color zone we're in based on brightness (using HSL)
      vec3 baseColorHSL;
      if (adjustedBrightness > uColorThreshold1) {
        // Bright zone: LIGHT_BLUISH
        baseColorHSL = LIGHT_BLUISH_HSL;
      } else if (adjustedBrightness > uColorThreshold2) {
        // Medium zone: WARM_BLUE
        baseColorHSL = WARM_BLUE_HSL;
      } else {
        // Dark zone: DESATURATED_PINK
        baseColorHSL = DESATURATED_PINK_HSL;
      }
      
      // Add smooth blending at the boundaries (in HSL space)
      if (adjustedBrightness > uColorThreshold1 - blendWidth && adjustedBrightness < uColorThreshold1 + blendWidth) {
        // Smooth transition between LIGHT_BLUISH and WARM_BLUE
        float blend = smoothstep(uColorThreshold1 - blendWidth, uColorThreshold1 + blendWidth, adjustedBrightness);
        baseColorHSL = mix(WARM_BLUE_HSL, LIGHT_BLUISH_HSL, blend);
      } else if (adjustedBrightness > uColorThreshold2 - blendWidth && adjustedBrightness < uColorThreshold2 + blendWidth) {
        // Smooth transition between WARM_BLUE and DESATURATED_PINK
        float blend = smoothstep(uColorThreshold2 - blendWidth, uColorThreshold2 + blendWidth, adjustedBrightness);
        baseColorHSL = mix(DESATURATED_PINK_HSL, WARM_BLUE_HSL, blend);
      }
      
      // Apply global HSL adjustments
      baseColorHSL.x = mod(baseColorHSL.x + uHueShift, 360.0); // Hue shift
      baseColorHSL.y = clamp(baseColorHSL.y * uSaturationMultiplier, 0.0, 1.0); // Saturation multiplier
      baseColorHSL.z = clamp(baseColorHSL.z * uLightnessMultiplier, 0.0, 1.0); // Lightness multiplier
      
      // Convert HSL to RGB for final output
      baseColor = hslToRgb(baseColorHSL);
      
      // Debug: Visualize vertex-to-camera distance as color overlay with more distinct ranges
      if (uDebugDistance) {
        float lineSpacing = getQuantizedHatchingFrequency(vVertexToCameraDistance);
        
        if (vVertexToCameraDistance < 15.0) {
          baseColor = vec3(1.0, 0.0, 0.0); // Red - very close (0.1x spacing)
        } else if (vVertexToCameraDistance < 25.0) {
          baseColor = vec3(1.0, 0.5, 0.0); // Orange - close (0.2x spacing)
        } else if (vVertexToCameraDistance < 40.0) {
          baseColor = vec3(1.0, 1.0, 0.0); // Yellow - medium (0.3x spacing)
        } else if (vVertexToCameraDistance < 60.0) {
          baseColor = vec3(0.0, 1.0, 0.0); // Green - far (1.0x spacing)
        } else if (vVertexToCameraDistance < 80.0) {
          baseColor = vec3(0.0, 0.0, 1.0); // Blue - very far (3.0x spacing)
        } else {
          baseColor = vec3(1.0, 0.0, 1.0); // Magenta - extremely far (6.0x spacing)
        }
        
        // Add line spacing info as brightness variation
        baseColor *= (0.5 + lineSpacing * 0.1); // Brighter = larger spacing
      }
      
      // Debug: Show line spacing as color intensity (temporary)
      if (uDebugDistance) {
        float lineSpacing = getQuantizedHatchingFrequency(vVertexToCameraDistance);
        // Make the color intensity proportional to line spacing
        baseColor = vec3(lineSpacing * 2.0); // White = large spacing, black = small spacing
      }
      
      // Optional: Add subtle noise-based variation for organic feel
      float noiseVariation = snoise3D(vWorldPosition * 0.5) * 0.1; // Restored noise variation
      baseColor += noiseVariation * uColorSmoothing;
      
      // Clean screen space for straight hatching lines
      vec2 screenPos = gl_FragCoord.xy / uResolution.xy * 100.0;
      
      // Apply chaotic hatching
      float hatch = applyHatching(screenPos, brightness);
      
      // Final color
      vec3 finalColor = mix(baseColor, vec3(0.0), hatch);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;
  
  const material = new THREE.ShaderMaterial({
    vertexShader: moebiusVertexShader,
    fragmentShader: fragmentShader,
     uniforms: {
       uColor: { value: new THREE.Color(color) },
       uTime: { value: 0 },
       uBrightness: { value: options.brightness || 1.0 },
       uLightDirection: { value: new THREE.Vector3(1, 1, 1).normalize() },
       uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
       uSmoothingIntensity: { value: options.smoothingIntensity || 0.5 },
       uNormalPerturbation: { value: options.normalPerturbation || 1.5 },
       uVertexDisplacement: { value: options.vertexDisplacement || 0.005 },
       uFresnelPower: { value: options.fresnelPower || 2.0 },
       uArtifactReduction: { value: options.artifactReduction || 0.5 },
       uColorSmoothing: { value: options.colorSmoothing || 0.3 },
       uColorLevel: { value: options.colorLevel || 1.0 },
       uColorThreshold1: { value: options.colorThreshold1 || 0.6 },
       uColorThreshold2: { value: options.colorThreshold2 || 0.3 },
       uColorBlendWidth: { value: options.colorBlendWidth || 0.1 },
       uHueShift: { value: options.hueShift || 0.0 },
       uSaturationMultiplier: { value: options.saturationMultiplier || 1.0 },
       uLightnessMultiplier: { value: options.lightnessMultiplier || 1.0 },
       uCameraPosition: { value: new THREE.Vector3(15, 10, 20) },
       uDebugDistance: { value: options.debugDistance || false }
     },
    side: THREE.FrontSide
  })
  
  return material
}