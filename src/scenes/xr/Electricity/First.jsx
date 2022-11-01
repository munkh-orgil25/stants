import { Environment } from '@react-three/drei'
import { Interactive } from '@react-three/xr'
import React from 'react'

export default function First({ setLocation }) {
  return (
    <group>
      <Environment
        background
        files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
        path="/textures/2.1/"
      />
      <Interactive onSelect={() => setLocation('/xr/menu')}>
        <mesh position={[0.5, 1.5, -2]} scale={0.2}>
          <boxBufferGeometry />
          <meshBasicMaterial color="red" />
        </mesh>
      </Interactive>
    </group>
  )
}
