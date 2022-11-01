import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Controllers, XR, XRButton } from '@react-three/xr'
import React from 'react'
import { Route } from 'wouter'
import XRMenu from './XRMenu'

export default function XRHome() {
  return (
    <div className="content-w">
      <div className="illustration-w">
        <img src="/images/intro.png" alt="intro-illustration" />
      </div>
      <div className="button-w">
        <XRButton mode="VR" className="start-btn">
          Эхлэх XR
        </XRButton>
      </div>
      {/* <div className="canvas"> */}
      <Canvas>
        <XR>
          {/* Routes */}
          <Route path="/">
            <XRMenu />
          </Route>
          <Controllers />
        </XR>
        <OrbitControls />
      </Canvas>
      {/* </div> */}
    </div>
  )
}
