/* eslint-disable no-param-reassign */
import { Text, useTexture } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import { Interactive } from '@react-three/xr'
import { NearestFilter } from 'three'

export default function Result({
  correct,
  visible,
  onClick,
  position,
  scale,
  rotation,
}) {
  const bgAlpha = useTexture('/textures/info/bgAlpha.png', (txtr) => {
    txtr.magFilter = NearestFilter
    txtr.minFilter = NearestFilter
  })

  const wrongAlpha = useTexture('/textures/button/wrongAlpha.png', (txtr) => {
    txtr.magFilter = NearestFilter
    txtr.minFilter = NearestFilter
  })

  const correctAlpha = useTexture(
    '/textures/button/correctAlpha.png',
    (txtr) => {
      txtr.magFilter = NearestFilter
      txtr.minFilter = NearestFilter
    }
  )

  const styles = useSpring({
    scale: visible ? 1 : 0,
  })
  const color = correct ? '#65B03B' : '#E73A39'

  return (
    <Interactive onSelect={onClick}>
      <group
        onClick={onClick}
        // position={[0.35, 0.15, 2.2]}
        // scale={0.2}
        scale={scale}
        position={position}
        rotation={rotation}
      >
        <a.mesh scale={styles.scale}>
          <planeBufferGeometry args={[2, 1]} />
          <meshBasicMaterial
            color={color}
            transparent
            alphaMap={bgAlpha}
            opacity={1}
            alphaTest={0.1}
          />
          <Text
            position={[0, 0.2, 0.01]}
            color="#fff"
            fontSize={0.15}
            anchorX="center"
            anchorY="middle"
            font="/fonts/nunito.ttf"
            outlineColor="#fff"
            outlineWidth={0.005}
            maxWidth={1.7}
          >
            {correct ? 'ХАРИУЛТ ЗӨВ' : 'ХАРИУЛТ БУРУУ'}
          </Text>
          <mesh position={[0, -0.175, 0.01]} scale={0.3}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              color="#fff"
              map={correct ? correctAlpha : wrongAlpha}
              transparent
              alphaTest={0.1}
            />
          </mesh>
        </a.mesh>
      </group>
    </Interactive>
  )
}
