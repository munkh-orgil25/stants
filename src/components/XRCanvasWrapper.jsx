import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Controllers, Hands, XR } from '@react-three/xr'
import React from 'react'

export default function XRCanvasWrapper({ children }) {
  return (
    <div className="canvas">
      <Canvas>
        <XR>
          {children}
          <Controllers />
        </XR>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
