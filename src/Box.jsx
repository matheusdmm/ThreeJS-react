import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'

// controls the box speed
const SPEED = 1.75

function Box({ color }) {
  const box = useRef()
  const time = useRef(0)
  const [position, setPosition] = useState(getInitialPosition())
  const [xRotSpeed] = useState(() => Math.random())
  const [yRotSpeed] = useState(() => Math.random())
  const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.5)

  // box movement
  useFrame(
    (state, delta) => {
      time.current += delta * SPEED
      let newZ = position.z - time.current

      if (newZ < -10) {
        resetPosition()
        time.current = 0
      }

      box.current.position.set(position.x, position.y, newZ)
      box.current.rotation.x += delta * xRotSpeed
      box.current.rotation.y += delta * yRotSpeed
    },
    [xRotSpeed, yRotSpeed, position]
  )

  // alocates a starting zone for the box
  function getInitialPosition() {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      (Math.random() * 2 - 1) * 15
    )
    if (v.x < 0) v.x -= SPEED
    if (v.x > 0) v.x += SPEED

    return v
  }

  // get the box to the starting zone
  function resetPosition() {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      Math.random() * 10 + 10
    )
    if (v.x < 0) v.x -= SPEED
    if (v.x > 0) v.x += SPEED

    setPosition(v)
  }

  return (
    <mesh ref={box} rotation-x={Math.PI * 0.5} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} envMapIntensity={0.3} />
    </mesh>
  )
}

// kinda efficient way to spawn lots of boxes
export function Boxes() {
  const boxQnt = 66

  const [arr] = useState(() => {
    let a = []
    for (let index = 0; index < boxQnt; index++) a.push(0)
    return a
  })

  return (
    <>
      {arr.map((event, index) => (
        <Box
          key={index}
          color={index % 2 === 0 ? [0.9, 0.3, 0.1] : [0.05, 0.15, 0.4]}
        />
      ))}
    </>
  )
}
