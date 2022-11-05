import React from 'react'
import { BackSide } from 'three'

export default function Third({ env }) {
  return (
    <group>
      <mesh scale={41}>
        <sphereGeometry />
        <meshBasicMaterial map={env} transparent side={BackSide} />
      </mesh>
    </group>
  )
}
