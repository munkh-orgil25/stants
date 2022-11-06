import { useThree } from '@react-three/fiber'
import { useXR } from '@react-three/xr'
import { useEffect, useState } from 'react'
import { CubeTextureLoader, LinearEncoding, sRGBEncoding } from 'three'
import { Route, useLocation } from 'wouter'
import Scope from '../components/Scope'
import XRElectricity from '../scenes/xr/Electricity'
import XRHeat from '../scenes/xr/Heat'
import XRHeight from '../scenes/xr/Height'
import XRPressure from '../scenes/xr/Pressure'
import XRSafety from '../scenes/xr/Safety'
import XRStairs from '../scenes/xr/Stairs'
import XRMenu from './XRMenu'

export default function XRApp() {
  const [location, setLocation] = useLocation()
  const { isPresenting } = useXR()

  useEffect(() => {
    setLocation('/xr/menu')
  }, [isPresenting])

  return (
    <>
      <Route path="/xr/menu">
        <XRMenu setLocation={setLocation} location={location} />
      </Route>
      <Scope base="/xr/1">
        <XRHeight setLocation={setLocation} location={location} />
      </Scope>
      <Scope base="/xr/2">
        <XRElectricity setLocation={setLocation} location={location} />
      </Scope>
      <Scope base="/xr/3">
        <XRHeat setLocation={setLocation} location={location} />
      </Scope>
      <Scope base="/xr/4">
        <XRSafety setLocation={setLocation} location={location} />
      </Scope>
      <Scope base="/xr/5">
        <XRStairs setLocation={setLocation} location={location} />
      </Scope>
      <Scope base="/xr/6">
        <XRPressure setLocation={setLocation} location={location} />
      </Scope>
    </>
  )
}
