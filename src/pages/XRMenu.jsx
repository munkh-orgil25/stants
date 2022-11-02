import { Interactive } from '@react-three/xr'
import React, { useEffect, useState } from 'react'
import { CubeTextureLoader } from 'three'
import XRLoading from '../components/XRLoading'

export default function XRMenu({ setLocation, setEnvPath }) {
  const envLoader = new CubeTextureLoader()
  const [envLoaded, setEnvLoaded] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    envLoader
      .setPath('/textures/menu/')
      .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], () =>
        setEnvLoaded(true)
      )
  }, [])

  useEffect(() => {
    setEnvPath('/textures/menu/')
  }, [])

  useEffect(() => {
    if (envLoaded) {
      setLoading(false)
    }
  }, [envLoaded])

  if (loading) {
    return <XRLoading />
  }

  return (
    <group>
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
