import { Environment } from '@react-three/drei'
import { Interactive } from '@react-three/xr'
import React, { useEffect } from 'react'

export default function First({ setLocation, setEnv }) {
  useEffect(() => {
    setEnv('/textures/2.1/')
  }, [])

  return (
    <group>
      <Interactive onSelect={() => setLocation('/xr/1/1')}>
        <mesh position={[0.5, 1.5, -2]} scale={0.2}>
          <boxBufferGeometry />
          <meshBasicMaterial color="red" />
        </mesh>
      </Interactive>
    </group>
  )
}
