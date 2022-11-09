import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useXR } from '@react-three/xr'
import React, { useEffect, useRef } from 'react'

export default function MenuBar() {
  const { player, isPresenting } = useXR()
  const ref = useRef()

  const bg4 = useTexture('/textures/menu/base.png')

  useFrame(({ camera }) => {
    // Move mesh to be flush with camera
    ref.current.position.copy(camera.position)
    ref.current.quaternion.copy(camera.quaternion)

    // Apply offset
    ref.current.translateX(-2)
  })

  useEffect(() => {
    if (isPresenting) {
      // console.log(player.children)
    }
  }, [isPresenting])

  return (
    <group ref={ref}>
      <mesh position={[0, 0, 1]} rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}>
        <planeGeometry args={[2, 0.5]} />
        <meshBasicMaterial transparent alphaMap={bg4} alphaTest={0.1} />
      </mesh>
    </group>
  )
}
