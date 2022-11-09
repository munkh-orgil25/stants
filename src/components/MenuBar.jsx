import { useTexture } from '@react-three/drei'
import { Interactive, useXR } from '@react-three/xr'
import React, { forwardRef, useEffect, useRef } from 'react'
import { a } from '@react-spring/three'

const MenuBar = forwardRef(({ color, onClick }, ref) => {
  const bg4 = useTexture('/textures/menu/base.png')

  return (
    <group ref={ref}>
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
    </group>
  )
})

export default MenuBar
