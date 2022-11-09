import { useTexture } from '@react-three/drei'
import { Interactive, useXR } from '@react-three/xr'
import React, { useEffect, useRef } from 'react'
import { a } from '@react-spring/three'

export default function MenuBar({ color, scale, onClick }) {
  const { player, isPresenting } = useXR()
  const ref = useRef()

  const bg4 = useTexture('/textures/menu/base.png')

  useEffect(() => {
    if (isPresenting) {
      player.children[0].add(ref.current)
    }
  }, [isPresenting])

  return (
    <a.group ref={ref} scale={scale}>
      <Interactive onSelect={onClick}>
        <mesh position={[0, 0, -1.5]} rotation={[0, 0, 0]} onClick={onClick}>
          <planeGeometry args={[2, 0.5]} />
          <meshBasicMaterial
            transparent
            alphaMap={bg4}
            alphaTest={0.1}
            color={color}
          />
        </mesh>
      </Interactive>
    </a.group>
  )
}
