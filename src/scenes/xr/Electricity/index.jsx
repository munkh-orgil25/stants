import { useEffect, useState } from 'react'
import { CubeTextureLoader } from 'three'
import { Route } from 'wouter'
import First from './First'
import XRLoading from '../../../components/XRLoading'
import Second from './Second'

export default function XRElectricity({ setLocation, location, setEnvPath }) {
  const envLoader = new CubeTextureLoader()
  const [loading, setLoading] = useState(true)
  const [env1Loaded, setEnv1Loaded] = useState(null)
  const [env2Loaded, setEnv2Loaded] = useState(null)

  useEffect(() => {
    envLoader
      .setPath('/textures/2.1/')
      .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], () =>
        setEnv1Loaded(true)
      )
    envLoader
      .setPath('/textures/2.2/')
      .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], () =>
        setEnv2Loaded(true)
      )
  }, [])

  useEffect(() => {
    if (env1Loaded && env2Loaded) {
      setLoading(false)
    }
  }, [env1Loaded, env2Loaded])

  useEffect(() => {
    if (location === '/xr/2') {
      setEnvPath('/textures/2.1/')
    }
    if (location === '/xr/2/1') {
      setEnvPath('/textures/2.2/')
    }
  }, [location])

  if (loading) {
    return <XRLoading />
  }

  return (
    <>
      <Route path="/">
        <First setLocation={setLocation} />
      </Route>
      <Route path="/1">
        <Second setLocation={setLocation} />
      </Route>
    </>
  )
}