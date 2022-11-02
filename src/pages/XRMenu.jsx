import { Environment } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Interactive } from '@react-three/xr'
import React, { useEffect, useState } from 'react'
import { CubeTextureLoader } from 'three'
import XRLoading from '../components/XRLoading'

export default function XRMenu({ setLocation }) {
  const scene = useThree((state) => state.scene)
  const envLoader = new CubeTextureLoader()
  const [loading, setLoading] = useState(true)
  const [env, setEnv] = useState(null)

  useEffect(() => {
    setEnv(
      envLoader
        .setPath('/textures/2.1/')
        .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])
    )
  }, [])

  useEffect(() => {
    if (env) {
      setLoading(false)
    }
  }, [env])

  useEffect(() => {
    if (location === '/xr/menu') {
      scene.background = env
    }
  }, [location])

  if (loading) {
    return <XRLoading />
  }

  return (
    <group>
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
