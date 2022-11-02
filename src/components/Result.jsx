import { Text, useTexture } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import { Interactive } from '@react-three/xr'

export default function Result({
  correct,
  visible,
  onClick,
  position,
  scale,
  rotation,
}) {
  const bgAlpha = useTexture('/textures/info/questionAlpha.png')

  const styles = useSpring({
    scale: visible ? 1 : 0,
    innerScale: visible ? 1.1 : 0,
  })

  return (
    <Interactive onSelect={onClick}>
      <group
        // position={[0.35, 0.15, 2.2]}
        // scale={0.2}
        scale={scale}
        position={position}
        rotation={rotation}
      >
        <a.mesh scale={styles.scale}>
          <planeBufferGeometry args={[2, 0.75]} />
          <meshBasicMaterial
            color={correct ? '#65B03B' : '#E73A39'}
            transparent
            // alphaMap={bgAlpha}
            opacity={1}
          />
          <Text
            position={[0, 0, 0.01]}
            color="#fff"
            fontSize={0.2}
            anchorX="center"
            anchorY="middle"
            font="/fonts/nunito.ttf"
            outlineColor="#fff"
            outlineWidth={0.005}
            maxWidth={1.7}
          >
            {correct ? 'ХАРИУЛТ ЗӨВ' : 'ХАРИУЛТ БУРУУ'}
          </Text>
        </a.mesh>
      </group>
    </Interactive>
  )
}
