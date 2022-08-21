import React, { useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Mesh } from 'three'

// handles the object scale config
const SCALE = {
  x: 0.005,
  y: 0.005,
  z: 0.005,
}

// handles the scene itself position
const POSITION = {
  x: 0,
  y: 0,
  z: 0,
}

export function Vehicle() {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + 'models/car/scene.gltf'
  )

  useEffect(() => {
    gltf.scene.scale.set(SCALE.x, SCALE.y, SCALE.z)
    gltf.scene.position.set(POSITION.x, POSITION.y, POSITION.z)
    gltf.scene.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.castShadow = true
        obj.receiveShadow = true
        obj.material.envMapIntensity = 20
      }
    })
  }, [gltf])

  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime()
    let group = gltf.scene.children[0].children[0].children[0]

    group.children[0].rotation.x = t * 2
    group.children[2].rotation.x = t * 2
    group.children[4].rotation.x = t * 2
    group.children[6].rotation.x = t * 2
  })

  return <primitive object={gltf.scene} />
}
