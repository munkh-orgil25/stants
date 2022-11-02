import { Text, useTexture } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { useState } from 'react'
import { Interactive } from '@react-three/xr'

export default function Answer({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  answer,
  visible,
  onClick,
}) {
  const bgAlpha = useTexture('/textures/info/answerAlpha.png')
  const [color, setColor] = useState('#006DB6')
  const [hovered, setHovered] = useState(false)
  const styles = useSpring({
    // outerScale: hovered ? 1.2 : 0,
    innerScale: hovered ? 1.1 : 0,
    baseScale: visible ? 1 : 0,
  })

  return (
    <Interactive onSelect={() => onClick(answer.id)}>
      <group
        scale={scale}
        position={position}
        rotation={rotation}
        onClick={() => onClick(answer.id)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <a.mesh scale={styles.innerScale} position={[0, 0, -0.01]}>
          <planeBufferGeometry args={[1.9, 0.28]} />
          <meshBasicMaterial
            color={color}
            transparent
            alphaMap={bgAlpha}
            opacity={1}
          />
        </a.mesh>
        <a.mesh scale={styles.baseScale}>
          <planeBufferGeometry args={[2, 0.25]} />
          <meshBasicMaterial color="#EFF7FE" transparent alphaMap={bgAlpha} />
          <Text
            position={[-0.85, 0, 0.01]}
            color="#282828"
            fontSize={0.07}
            anchorX="left"
            anchorY="middle"
            font="/fonts/nunito.ttf"
            outlineColor="#282828"
            outlineWidth={0.0025}
            maxWidth={1.7}
          >
            {answer.text}
          </Text>
        </a.mesh>
      </group>
    </Interactive>
  )
}
