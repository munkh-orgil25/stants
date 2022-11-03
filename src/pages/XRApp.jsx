import { useThree } from '@react-three/fiber'
import { useXR } from '@react-three/xr'
import { useEffect, useState } from 'react'
import { CubeTextureLoader, LinearEncoding, sRGBEncoding } from 'three'
import { Route, useLocation } from 'wouter'
import Scope from '../components/Scope'
import XRElectricity from '../scenes/xr/Electricity'
import XRHeight from '../scenes/xr/Height'
import XRMenu from './XRMenu'

export default function XRApp() {
  const [location, setLocation] = useLocation()
  const { isPresenting } = useXR()
  const [envPath, setEnvPath] = useState(null)

  useEffect(() => {
    setLocation('/xr/menu')
  }, [isPresenting])

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
