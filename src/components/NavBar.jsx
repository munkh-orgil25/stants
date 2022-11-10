import { useTexture } from '@react-three/drei'
import { Interactive, useXR } from '@react-three/xr'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { a, useSpring } from '@react-spring/three'
import { DoubleSide } from 'three'

function NavBar({
  type,
  scale = 1,
  onInfo = () => {},
  onMenu = () => {},
  onNext = () => {},
  onPrev = () => {},
  pos = [0, 0, -1.5],
}) {
  const bg3 = useTexture('/textures/menu/base3.png')
  const bg2 = useTexture('/textures/menu/base2.png')
  const next = useTexture('/textures/button/next.png')
  const prev = useTexture('/textures/button/prev.png')
  const house = useTexture('/textures/button/house.png')
  const info = useTexture('/textures/button/info.png')

  const ref = useRef()
  const { player } = useXR()

  useEffect(() => {
    if (ref.current) {
      player.children[0].add(ref.current)
    }
  }, [ref.current])

  if (type === 1) {
    return (
      <a.group scale={scale} ref={ref} position={pos}>
        <group position={[0, -0.75, 0]} rotation={[-0.25, 0, 0]} scale={0.5}>
          <mesh rotation={[0, 0, 0]}>
            <planeGeometry args={[1.5, 0.5]} />
            <meshBasicMaterial
              transparent
              alphaMap={bg3}
              alphaTest={0.1}
              color="#fff"
            />
          </mesh>

          <Interactive onSelect={onInfo}>
            <Button position={[-0.5, 0, 0.001]} icon={info} />
          </Interactive>
          <Interactive onSelect={onMenu}>
            <Button position={[0, 0, 0.001]} icon={house} />
          </Interactive>
          <Interactive onSelect={onNext}>
            <Button position={[0.5, 0, 0.001]} icon={next} />
          </Interactive>
        </group>
      </a.group>
    )
  }

  if (type === 2) {
    return (
      <a.group scale={scale} ref={ref} position={pos}>
        <group position={[0, -0.75, 0]} rotation={[-0.25, 0, 0]} scale={0.5}>
          <mesh rotation={[0, 0, 0]}>
            <planeGeometry args={[1.5, 0.5]} />
            <meshBasicMaterial
              transparent
              alphaMap={bg3}
              alphaTest={0.1}
              color="#fff"
            />
          </mesh>

          <Interactive onSelect={onPrev}>
            <Button position={[-0.5, 0, 0.001]} icon={prev} />
          </Interactive>
          <Interactive onSelect={onMenu}>
            <Button position={[0, 0, 0.001]} icon={house} />
          </Interactive>
          <Interactive onSelect={onNext}>
            <Button position={[0.5, 0, 0.001]} icon={next} />
          </Interactive>
        </group>
      </a.group>
    )
  }

  return (
    <a.group scale={scale} ref={ref} position={pos}>
      <group position={[0, -0.75, 0]} rotation={[-0.25, 0, 0]} scale={0.5}>
        <mesh rotation={[0, 0, 0]}>
          <planeGeometry args={[1, 0.5]} />
          <meshBasicMaterial
            transparent
            alphaMap={bg2}
            alphaTest={0.1}
            color="#fff"
          />
        </mesh>

        <Interactive onSelect={onPrev}>
          <Button position={[-0.22, 0, 0.001]} icon={prev} />
        </Interactive>
        <Interactive onSelect={onMenu}>
          <Button position={[0.22, 0, 0.001]} icon={house} />
        </Interactive>
      </group>
    </a.group>
  )
}

function Button({ position, icon }) {
  const alphaMap = useTexture('/textures/menu/cell.png')
  const [hovered, setHovered] = useState(false)

  const styles = useSpring({
    scale: hovered ? 0.36 : 0.33,
  })

  return (
    <Interactive
      onHover={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <a.group position={position} scale={styles.scale}>
        <mesh position={[0, 0, 0.001]} rotation={[0, 0, 0]}>
          <planeGeometry />
          <meshBasicMaterial
            transparent
            alphaMap={alphaMap}
            side={DoubleSide}
          />
        </mesh>
        <mesh scale={1.1}>
          <planeGeometry />
          <meshBasicMaterial
            transparent
            alphaMap={alphaMap}
            alphaTest={0.1}
            color="#80B6DB"
          />
          <mesh scale={0.5} position={[0, 0, 0.001]}>
            <planeBufferGeometry />
            <meshBasicMaterial
              transparent
              alphaMap={icon}
              alphaTest={0.1}
              color="#006DB6"
            />
          </mesh>
        </mesh>
      </a.group>
    </Interactive>
  )
}

export default NavBar
