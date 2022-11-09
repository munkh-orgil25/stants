import { useXR } from '@react-three/xr'
import React, { useEffect, useRef } from 'react'

export default function MenuBar() {
  const { player, isPresenting } = useXR()
  const ref = useRef()

  useEffect(() => {
    if (isPresenting) {
      player.children[0].add(ref.current)
    }
  }, [isPresenting])

  return (
    <group>
      <mesh ref={ref} position={[-2, 0, 0]} rotation={[0, Math.PI * 0.5, 0]}>
        <planeGeometry args={[0.5, 2]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  )
}
