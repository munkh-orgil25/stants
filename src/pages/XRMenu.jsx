import { Environment } from '@react-three/drei'
import { Interactive } from '@react-three/xr'
import React, { useEffect } from 'react'

export default function XRMenu({ setLocation, setEnv }) {
  useEffect(() => {
    setEnv('/textures/menu/')
  }, [])

  return (
    <group>
      {/* <Environment
        background
        files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
        path="/textures/menu/"
      /> */}

      <Interactive onSelect={() => setLocation('/xr/1')}>
        <mesh position={[0.5, 1.5, -2]} scale={0.2}>
          <boxBufferGeometry />
          <meshBasicMaterial color="green" />
        </mesh>
      </Interactive>
      <Interactive onSelect={() => setLocation('/xr/1/1')}>
        <mesh position={[-0.5, 1.5, -2]} scale={0.2}>
          <boxBufferGeometry />
          <meshBasicMaterial color="blue" />
        </mesh>
      </Interactive>
    </group>
  )
}
