/* eslint-disable no-param-reassign */
import { Text, useTexture } from '@react-three/drei'
import { useState } from 'react'
import {
  a,
  config,
  useChain,
  useSpring,
  useSpringRef,
} from '@react-spring/three'
import { Interactive } from '@react-three/xr'
import { NearestFilter } from 'three'

export default function HoverButton({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  text = '',
  onClick,
}) {
  const [hovered, setHovered] = useState(false)

  const baseWhiteApi = useSpringRef()
  const baseWhite = useSpring({
    ref: baseWhiteApi,
    from: { scale: 0.5 },
    to: { scale: hovered ? 1.5 : 0.5 },
  })

  const baseOuterApi = useSpringRef()
  const baseOuter = useSpring({
    ref: baseOuterApi,
    config: config.stiff,
    from: { innerScale: 0.8, outerScale: 1.25 },
    to: { innerScale: hovered ? 0.1 : 0.8, outerScale: hovered ? 0.1 : 1.25 },
  })

  const descriptionApi = useSpringRef()
  const description = useSpring({
    ref: descriptionApi,
    // config: config.stiff,
    from: { searchScale: 0, descriptionScale: 0 },
    to: {
      searchScale: hovered ? 0.75 : 0,
      descriptionScale: hovered ? 1.5 : 0,
    },
  })

  const baseAlpha = useTexture('/textures/button/baseAlpha.png', (texture) => {
    texture.magFilter = NearestFilter
    texture.minFilter = NearestFilter
  })
  const searchAlpha = useTexture('/textures/button/searchAlpha.png')

  useChain(
    hovered
      ? [baseOuterApi, baseWhiteApi, descriptionApi]
      : [descriptionApi, baseWhiteApi, baseOuterApi],
    [0, -0.1, 0.2]
  )

  return (
    <Interactive
      onBlur={() => setHovered(false)}
      onHover={() => setHovered(true)}
      onSelect={onClick}
    >
      <a.group
        position={position}
        scale={scale}
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {/* BASE WHITE */}
        <a.mesh position={[0, 0, 0]} scale={baseWhite.scale}>
          <planeBufferGeometry />
          <meshBasicMaterial
            color="white"
            transparent
            alphaMap={baseAlpha}
            alphaTest={0.1}
          />
        </a.mesh>

        {/* BASE INNER */}
        <a.mesh position={[0, 0, -0.01]} scale={baseOuter.innerScale}>
          <planeBufferGeometry />
          <meshBasicMaterial
            color="#006DB6"
            transparent
            alphaMap={baseAlpha}
            alphaTest={0.1}
          />
        </a.mesh>

        {/* BASE OUTER  */}
        <a.mesh position={[0, 0, -0.02]} scale={baseOuter.outerScale}>
          <planeBufferGeometry />
          <meshBasicMaterial
            color="#73A9CE"
            opacity={1}
            transparent
            alphaMap={baseAlpha}
            alphaTest={0.1}
          />
        </a.mesh>

        {/* SEARCH */}
        <a.mesh position={[0, 0, 0.1]} scale={description.searchScale}>
          <planeBufferGeometry />
          <meshBasicMaterial
            color="#006DB6"
            transparent
            alphaMap={searchAlpha}
          />
        </a.mesh>

        {/* DESCRIPTION */}
        <a.mesh position={[0, -1.5, 0]} scale={description.descriptionScale}>
          <planeBufferGeometry args={[2, 0.75, 1]} />
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
            {text}
          </Text>
        </a.mesh>
      </a.group>
    </Interactive>
  )
}
