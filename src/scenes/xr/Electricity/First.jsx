import { Environment } from '@react-three/drei'
import React from 'react'

export default function First() {
  return (
    <group>
      <Environment
        background
        files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
        path="/textures/1.1/"
      />
    </group>
  )
}
