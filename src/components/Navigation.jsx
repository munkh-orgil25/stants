import { a, useSpring } from '@react-spring/three'
import { Text, useTexture } from '@react-three/drei'
import { Interactive, useXR } from '@react-three/xr'
import { useState, useRef, useEffect } from 'react'
import { DoubleSide } from 'three'

export default function Navigation({ show, setLocation }) {
  const map = useTexture('/textures/button/menu.png')
  const icon = useTexture('/textures/button/house.png')
  const [hovered, setHovered] = useState(false)

  const { txtScale } = useSpring({
    txtScale: hovered ? 0.1 : 0,
  })

  const { scale } = useSpring({
    scale: show ? 1 : 0,
  })

  return (
    <a.group scale={scale}>
      <Interactive
        onHover={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onSelect={() => setLocation('/xr/menu')}
      >
        <a.mesh
          position={[0, -0.5, -1]}
          scale={0.1}
          onClick={() => setLocation('/xr/menu')}
        >
          <planeGeometry />
          <meshBasicMaterial
            transparent
            alphaTest={0.1}
            alphaMap={map}
            color="#fff"
            side={DoubleSide}
          />
          <mesh scale={0.5} position={[0, 0, 0.01]}>
            <planeGeometry />
            <meshBasicMaterial
              transparent
              alphaTest={0.1}
              alphaMap={icon}
              color="#006DB6"
            />
          </mesh>
        </a.mesh>
        <a.mesh position={[0, 0.1, -1]} scale={txtScale}>
          <planeGeometry args={[2, 0.8]} />
          <meshBasicMaterial color="#006DB6" />
          <Text
            position={[0, 0, 0.001]}
            color="#fff"
            fontSize={0.45}
            anchorX="center"
            anchorY="middle"
            font="/fonts/variable.ttf"
            outlineColor="#fff"
            outlineWidth={0}
            maxWidth={20}
          >
            Нүүр
          </Text>
        </a.mesh>
      </Interactive>
    </a.group>
  )
}
