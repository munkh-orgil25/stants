import { Canvas } from '@react-three/fiber'
import { XR } from '@react-three/xr'
import React from 'react'

export default function XRCanvasWrapper({ children }) {
  return (
    <div className="canvas">
      <Canvas>
        <XR>{children}</XR>
      </Canvas>
    </div>
  )
}
