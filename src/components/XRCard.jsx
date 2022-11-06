import { Text, useTexture } from '@react-three/drei'
import React from 'react'

export default function XRCard({ bgMap, iconMap, position, text, onClick }) {
  return (
    <group position={position} onClick={onClick}>
      <mesh>
        <planeGeometry args={[1, 0.676]} />
        <meshBasicMaterial transparent alphaTest={0.1} alphaMap={bgMap} />
        {text}
        <mesh scale={0.25} position={[0, 0.1, 0.01]}>
          <planeGeometry />
          <meshBasicMaterial map={iconMap} transparent alphaTest={0.1} />
        </mesh>
      </mesh>
    </group>
  )
}
