import { Text, useTexture } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

export default function InfoText({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  title = '',
  text = '',
  visible,
  onClick,
}) {
  const bgAlpha = useTexture('/textures/info/bgAlpha.png')

  const styles = useSpring({
    outerScale: visible ? 1.2 : 0,
    innerScale: visible ? 1.05 : 0,
    baseScale: visible ? 1 : 0,
  })

  return (
    <group
      scale={scale}
      position={position}
      rotation={rotation}
      onClick={onClick}
    >
      <a.mesh scale={styles.outerScale} position={[0, 0, -0.02]}>
        <planeBufferGeometry args={[1.85, 1]} />
        <meshBasicMaterial
          color="#006DB6"
          transparent
          alphaMap={bgAlpha}
          opacity={0.5}
        />
      </a.mesh>
      <a.mesh scale={styles.innerScale} position={[0, 0, -0.01]}>
        <planeBufferGeometry args={[1.975, 1]} />
        <meshBasicMaterial
          color="#006DB6"
          transparent
          alphaMap={bgAlpha}
          opacity={1}
        />
      </a.mesh>
      <a.mesh scale={styles.baseScale}>
        <planeBufferGeometry args={[2, 1]} />
        <meshBasicMaterial color="#EFF7FE" transparent alphaMap={bgAlpha} />
        <Text
          position={[-0.8, 0.35, 0.1]}
          color="#282828"
          fontSize={0.085}
          anchorX="left"
          anchorY="middle"
          font="/fonts/nunito.ttf"
          outlineColor="#282828"
          outlineWidth={0.0025}
          maxWidth={20}
        >
          {title}
        </Text>
        <Text
          position={[-0.8, -0.025, 0.1]}
          color="#282828"
          fontSize={0.06}
          anchorX="left"
          anchorY="middle"
          font="/fonts/nunito.ttf"
          outlineColor="#282828"
          outlineWidth={0.001}
          maxWidth={1.6}
        >
          {text}
        </Text>
      </a.mesh>
    </group>
  )
}
