import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color } from 'three'

// initial position
const POSITION = {
  x: 0,
  y: 0,
  z: 0,
}

// colors, maybe change later?
const COLOR = {
  R: 0,
  G: 0,
  B: 0,
}

export function Flares() {
  const itemsRef = useRef([])

  useFrame((state, delta) => {
    // get the time based on the runtime
    let elapsed = state.clock.getElapsedTime()

    // for every ring spawned, it will iterate through
    // them and then gonna find the distance and assign a
    // color to it based on the distance
    for (let index = 0; index < itemsRef.current.length; index++) {
      let colorScale = 1
      let mesh = itemsRef.current[index]
      let z = (index - 7) * 3.5 + ((elapsed * 0.4) % 3.5) * 2
      let dist = Math.abs(z)

      mesh.position.set(0, 0, -z)
      mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, dist * 0.04)

      if (dist > 2) {
        colorScale = 1 - (Math.min(dist, 12) - 2) / 10
      }

      colorScale *= 0.5

      if (index % 2 === 1) {
        mesh.material.emissive = new Color(6, 0.15, 0.6).multiplyScalar(0.5)
      } else {
        mesh.material.emissive = new Color(0.1, 0.5, 3).multiplyScalar(0.5)
      }
    }
  })

  return (
    <>
      {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => (
        <mesh
          castShadow
          receiveShadow
          position={[POSITION.x, POSITION.y, POSITION.z]}
          key={i}
          ref={(element) => (itemsRef.current[i] = element)}
        >
          <torusGeometry args={[3.35, 0.05, 16, 100]} />
          <meshStandardMaterial
            emissive={[4, 0.1, 0.4]}
            color={[COLOR.R, COLOR.G, COLOR.B]}
          />
        </mesh>
      ))}
    </>
  )
}
