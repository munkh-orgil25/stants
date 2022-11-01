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
    // console.log(isPresenting, referenceSpace)
  }, [isPresenting])

  return (
    <>
      <Route path="/">
        <XRMenu setLocation={setLocation} />
      </Route>
      <Scope base="/1">
        <XRElectricity />
      </Scope>
    </>
  )
}
