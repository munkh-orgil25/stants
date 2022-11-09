import { useTexture } from '@react-three/drei'
import { useXR } from '@react-three/xr'
import React, { useEffect, useRef } from 'react'

export default function MenuBar() {
  const { player, isPresenting } = useXR()
  const ref = useRef()

  const bg4 = useTexture('/textures/menu/base.png')

  useEffect(() => {
    if (isPresenting) {
      player.children[0].add(ref.current)
    }
  }, [isPresenting])

  return (
    <group>
      <mesh ref={ref} position={[-2, 0, 0]} rotation={[Math.PI * 0.5, 1.5, 0]}>
        <planeGeometry args={[2, 0.5]} />
        <meshBasicMaterial transparent alphaMap={bg4} alphaTest={0.1} />
      </mesh>
    </group>
  )
}
