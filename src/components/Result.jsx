import { Text, useTexture } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import { Interactive } from '@react-three/xr'

export default function Result({ correct, visible, onClick }) {
  const bgAlpha = useTexture('/textures/info/questionAlpha.png')

  const styles = useSpring({
    scale: visible ? 1 : 0,
  })

  return (
    <Interactive onSelect={onClick}>
      <group position={[0, 0, 0.2]}>
        <a.mesh scale={styles.scale}>
          <planeBufferGeometry args={[2, 0.75]} />
          <meshBasicMaterial
            color={correct ? '#65B03B' : '#E73A39'}
            transparent
            alphaMap={bgAlpha}
          />
          <Text
            position={[0, 0, 0.01]}
            color="#282828"
            fontSize={0.2}
            anchorX="center"
            anchorY="middle"
            font="/fonts/nunito.ttf"
            outlineColor="#282828"
            outlineWidth={0.0025}
            maxWidth={1.7}
          >
            {correct ? 'Зөв' : 'Буруу'}
          </Text>
        </a.mesh>
      </group>
    </Interactive>
  )
}
