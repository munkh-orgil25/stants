import { useThree } from '@react-three/fiber'
import { useXR } from '@react-three/xr'
import { useEffect, useState } from 'react'
import { CubeTextureLoader } from 'three'
import { Route, useLocation } from 'wouter'
import Scope from '../components/Scope'
import XRElectricity from '../scenes/xr/Electricity'
import XRHeight from '../scenes/xr/Height'
import XRMenu from './XRMenu'

export default function XRApp() {
  const scene = useThree((state) => state.scene)
  const envLoader = new CubeTextureLoader()
  const [location, setLocation] = useLocation()
  const { isPresenting } = useXR()
  const [envPath, setEnvPath] = useState(null)

  useEffect(() => {
    setLocation('/xr/menu')
  }, [isPresenting])

  useEffect(() => {
    if (envPath) {
      console.log(envPath)
      const envCube = envLoader
        .setPath(envPath)
        .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])
      scene.background = envCube
    }
  }, [envPath])

  return (
    <>
      <Route path="/xr/menu">
        <XRMenu
          setLocation={setLocation}
          setEnvPath={setEnvPath}
          location={location}
        />
      </Route>
      <Scope base="/xr/1">
        <XRHeight
          setLocation={setLocation}
          setEnvPath={setEnvPath}
          location={location}
        />
      </Scope>
      <Scope base="/xr/2">
        <XRElectricity
          setLocation={setLocation}
          setEnvPath={setEnvPath}
          location={location}
        />
      </Scope>
    </>
  )
}
