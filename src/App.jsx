import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'

import { Ground } from './Ground.jsx'
import { Vehicle } from './Vehicle.jsx'
import { Flares } from './Flares.jsx'
import { Boxes } from './Box.jsx'
import { Grid } from './Grid.jsx'

import './style.css'

// changes the field of view
const FOV = 35
const cubeCameraResolution = 256

/*
    <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={'blue'} />
      </mesh>

*/

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={FOV} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />

      {/* reflections yaaay */}
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Vehicle />
          </>
        )}
      </CubeCamera>

      {/* spotlight emitts lights in a single direction */}
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />
      <Grid />
      <Flares />
      <Boxes />

      {/* camera effects */}
      <EffectComposer>
        <DepthOfField
          focusDistance={0.005}
          focalLength={0.01}
          bokehScale={3}
          height={480}
        />
        <Bloom
          BlendFunction={BlendFunction.ADD}
          intensity={1.3}
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.95}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          BlendFunction={BlendFunction.NORMAL}
          offset={(0.0005, 0.0012)}
        />
      </EffectComposer>
    </>
  )
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  )
}

export default App
