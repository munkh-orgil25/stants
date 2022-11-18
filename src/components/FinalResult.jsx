/* eslint-disable no-param-reassign */
import { Text, useTexture } from '@react-three/drei'
import { Interactive } from '@react-three/xr'
import React from 'react'
import { a, useSpring } from '@react-spring/three'
import { NearestFilter } from 'three'

export default function FinalResult({
  visible,
  scale,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onClick,
  score,
  limit = 4,
  retry,
  next,
}) {
  const won = score > limit
  const bgAlpha = useTexture('/textures/info/bgAlpha.png', (texture) => {
    texture.magFilter = NearestFilter
    texture.minFilter = NearestFilter
  })
  const optionAlpha = useTexture(
    '/textures/info/answerAlpha.png',
    (texture) => {
      texture.magFilter = NearestFilter
      texture.minFilter = NearestFilter
    }
  )
  const rightAlpha = useTexture(
    '/textures/button/circleWrong.png',
    (texture) => {
      texture.magFilter = NearestFilter
      texture.minFilter = NearestFilter
    }
  )
  const wrongAlpha = useTexture(
    '/textures/button/circleRight.png',
    (texture) => {
      texture.magFilter = NearestFilter
      texture.minFilter = NearestFilter
    }
  )

  const outColor = won ? '#65B03B' : '#E77F7E'
  const innerColor = won ? '#65B03B' : '#E73A39'

  const styles = useSpring({
    baseScale: visible ? 1 : 0,
    innerScale: visible ? 1.1 : 0,
    outerScale: visible ? 1.2 : 0,
    buttonScale: visible ? 0.5 : 0,
  })

  return (
    <group
      scale={scale}
      position={position}
      rotation={rotation}
      onClick={onClick}
    >
      <Interactive onSelect={onClick}>
        <a.mesh scale={styles.outerScale} position={[0, 0, -0.02]}>
          <planeBufferGeometry args={[1.85, 1]} />
          <meshBasicMaterial
            color={outColor}
            transparent
            alphaMap={bgAlpha}
            opacity={1}
            alphaTest={0.1}
          />
        </a.mesh>
        <a.mesh scale={styles.innerScale} position={[0, 0, -0.01]}>
          <planeBufferGeometry args={[1.975, 1.02]} />
          <meshBasicMaterial
            color={innerColor}
            transparent
            alphaMap={bgAlpha}
            opacity={1}
            alphaTest={0.1}
          />
        </a.mesh>
        <a.mesh scale={styles.baseScale}>
          <planeBufferGeometry args={[2, 1]} />
          <meshBasicMaterial color="#EFF7FE" transparent alphaMap={bgAlpha} />
          <Text
            position={[0, 0.25, 0.1]}
            color="#282828"
            fontSize={0.15}
            anchorX="center"
            anchorY="middle"
            font="/fonts/nunito.ttf"
            outlineColor="#282828"
            outlineWidth={0.005}
            maxWidth={20}
          >
            {won ? 'Баяр хүргэе' : 'Тэнцсэнгүй'}
          </Text>
          <mesh position={[0, -0, 0.01]} scale={0.3}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
              color={innerColor}
              map={won ? wrongAlpha : rightAlpha}
              transparent
              alphaTest={0.1}
            />
          </mesh>
          <Text
            position={[0, -0.3, 0.1]}
            color="#282828"
            fontSize={0.08}
            anchorX="center"
            anchorY="middle"
            font="/fonts/nunito.ttf"
            outlineColor="#282828"
            outlineWidth={0.002}
            maxWidth={1.6}
          >
            Та {score} оноо авсан байна.
          </Text>
        </a.mesh>
      </Interactive>
      <Interactive onSelect={retry}>
        <a.mesh
          onClick={retry}
          scale={styles.buttonScale}
          position={[-0.55, -0.8, 0]}
        >
          <planeBufferGeometry args={[2, 0.5]} />
          <meshBasicMaterial
            color="#EFF7FE"
            transparent
            alphaMap={optionAlpha}
            alphaTest={0.1}
          />
          <Text
            position={[0, 0, 0.1]}
            color="#282828"
            fontSize={0.15}
            anchorX="center"
            anchorY="middle"
            font="/fonts/nunito.ttf"
            outlineColor="#282828"
            outlineWidth={0.005}
            maxWidth={20}
          >
            Дахин оролдох
          </Text>
        </a.mesh>
      </Interactive>
      <Interactive onSelect={next}>
        <a.mesh
          onClick={next}
          scale={styles.buttonScale}
          position={[0.55, -0.8, 0]}
        >
          <planeBufferGeometry args={[2, 0.5]} />
          <meshBasicMaterial
            color="#EFF7FE"
            transparent
            alphaMap={optionAlpha}
            alphaTest={0.1}
          />
          <Text
            position={[0, 0, 0.1]}
            color="#282828"
            fontSize={0.15}
            anchorX="center"
            anchorY="middle"
            font="/fonts/nunito.ttf"
            outlineColor="#282828"
            outlineWidth={0.005}
            maxWidth={20}
          >
            Цаашлах
          </Text>
        </a.mesh>
      </Interactive>
    </group>
  )
}
