import { Environment } from '@react-three/drei'
import React from 'react'

export default function XRMenu() {
  return (
    <group>
      <Environment
        background
        files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
        path="/textures/menu/"
      />
      <mesh>
        <sphereBufferGeometry />
        <meshBasicMaterial />
      </mesh>
    </group>
  )
}
