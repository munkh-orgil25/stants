import { useTexture } from '@react-three/drei'
import { Interactive } from '@react-three/xr'
import React, { useEffect, useState } from 'react'
import { BackSide, CubeTextureLoader } from 'three'
import XRLoading from '../components/XRLoading'

export default function XRMenu({ setLocation, setEnvPath }) {
  const [envLoaded, setEnvLoaded] = useState(null)
  const [loading, setLoading] = useState(true)
  // const envMap = useTexture('/textures/')

  return (
    <group>
      <mesh scale={20}>
        <sphereGeometry />
        <meshBasicMaterial side={BackSide} color="white" />
      </mesh>
      <Interactive onSelect={() => setLocation('/xr/1')}>
        <mesh
          position={[0.5, 1.5, -2]}
          scale={0.2}
          onClick={() => setLocation('/xr/1')}
        >
          <boxBufferGeometry />
          <meshBasicMaterial color="green" />
        </mesh>
      </Interactive>
      <Interactive onSelect={() => setLocation('/xr/2')}>
        <mesh position={[-0.5, 1.5, -2]} scale={0.2}>
          <boxBufferGeometry />
          <meshBasicMaterial color="blue" />
        </mesh>
      </Interactive>
    </group>
  )
}
