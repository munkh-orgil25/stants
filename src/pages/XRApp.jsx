import { useXR } from '@react-three/xr'
import { useEffect } from 'react'
import { Route, useLocation } from 'wouter'
import Scope from '../components/Scope'
import XRElectricity from '../scenes/xr/Electricity'
import XRMenu from './XRMenu'

export default function XRApp() {
  const [location, setLocation] = useLocation()
  const { isPresenting, referenceSpace } = useXR()

  useEffect(() => {
    setLocation('/xr/menu')
  }, [isPresenting])

  return (
    <>
      <Route path="/xr/menu">
        <XRMenu setLocation={setLocation} />
      </Route>
      <Scope base="/xr/1">
        <XRElectricity setLocation={setLocation} />
      </Scope>
    </>
  )
}
