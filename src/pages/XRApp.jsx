import { Environment, useCubeTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useXR } from '@react-three/xr'
import { useEffect, useState } from 'react'
import { CubeTextureLoader } from 'three'
import { Route, useLocation } from 'wouter'
import Scope from '../components/Scope'
import XRElectricity from '../scenes/xr/Electricity'
import XRMenu from './XRMenu'

export default function XRApp() {
  const scene = useThree((state) => state.scene)
  const envLoader = new CubeTextureLoader()
  const [location, setLocation] = useLocation()
  const { isPresenting } = useXR()
  const [envPath, setEnvPath] = useState('/textures/menu/')

  const setEnv = (path) => setEnvPath(path)

  useEffect(() => {
    setLocation('/xr/menu')
  }, [isPresenting])

  useEffect(() => {
    const envCube = envLoader
      .setPath(envPath)
      .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])
    scene.background = envCube
  }, [envPath])

  return (
    <>
      {/* <Environment
        background
        files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
        path={envPath}
      /> */}
      <Route path="/xr/menu">
        <XRMenu setLocation={setLocation} setEnv={setEnv} location={location} />
      </Route>
      <Scope base="/xr/1">
        <XRElectricity
          setLocation={setLocation}
          setEnv={setEnv}
          location={location}
        />
      </Scope>
    </>
  )
}
