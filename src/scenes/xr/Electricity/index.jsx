import React, { useEffect, useState } from 'react'
import { CubeTextureLoader } from 'three'
import { Route, useLocation } from 'wouter'
import First from './First'
import XRLoading from '../../../components/XRLoading'
import Second from './Second'
import { useThree } from '@react-three/fiber'

export default function XRElectricity({ setLocation, setEnv, location }) {
  const scene = useThree((state) => state.scene)
  const envLoader = new CubeTextureLoader()
  const [loading, setLoading] = useState(true)
  const [env1, setEnv1] = useState(null)
  const [env2, setEnv2] = useState(null)

  useEffect(() => {
    const env1 = envLoader
      .setPath('/textures/2.1/')
      .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])
    const env2 = envLoader
      .setPath('/textures/2.2/')
      .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])

    setEnv1(env1)
    setEnv2(env2)
  }, [])

  useEffect(() => {
    if (env1 && env2) {
      setLoading(false)
    }
  }, [env1, env2])

  useEffect(() => {
    if (location === '/xr/1') {
      scene.background = env1
    }

    if (location === '/xr/1/1') {
      scene.background = env2
    }
  }, [location])

  if (loading) {
    return <XRLoading />
  }

  return (
    <>
      <Route path="/">
        <First setLocation={setLocation} setEnv={setEnv} />
      </Route>
      <Route path="/1">
        <Second setLocation={setLocation} />
      </Route>
    </>
  )
}
