import React, { useEffect, useState } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import { Interactive, useXR } from '@react-three/xr'
import HoverButton from '../../../components/HoverButton'

export default function Fifth({ env, setCurrent, visible }) {
  const { player } = useXR()
  const [show, setShow] = useState(false)
  const [spring, api] = useSpring(() => ({
    from: { scale: 41, objScale: 0, opacity: 0 },
  }))

  useEffect(() => {
    player.position.set(0, 1, 0)
  }, [])

  const handlePrev = () => {
    api.start({
      from: { scale: 20, opacity: 1, objScale: 0.1 },
      to: { scale: 40, opacity: 0, objScale: 0 },
      config: config.slow,
      onChange: () => {
        if (spring.opacity.get() < 0.3) {
          setShow(false)
          setCurrent(4)
        }
      },
    })
  }

  const handleNext = () => {
    api.start({
      from: { scale: 20, opacity: 1, objScale: 0.1 },
      to: { scale: 0, opacity: 0, objScale: 0 },
      config: config.slow,
      onChange: () => {
        if (spring.opacity.get() < 0.3) {
          setShow(false)
          setCurrent(6)
        }
      },
    })
  }

  useEffect(() => {
    if (visible) {
      setShow(true)
      api.start({
        to: { scale: 20, objScale: 0.1, opacity: 1 },
        config: config.slow,
      })
    } else {
      setShow(false)
    }
  }, [visible])

  return (
    <group visible={show}>
      <a.mesh
        scale={spring.scale}
        material-opacity={spring.opacity}
        position={[0, 0, 0]}
        rotation={[0, -1.7, 0]}
      >
        <sphereGeometry />
        <meshBasicMaterial side={BackSide} map={env} transparent />
      </a.mesh>

      {/* TP */}
      <Interactive onSelect={handleNext}>
        <HoverButton
          position={[0, -2, -1.8]}
          rotation={[-0.5, 0, 0]}
          scale={spring.objScale}
          text="Шилжих"
          onClick={handleNext}
        />
      </Interactive>

      {/* TP */}
      <Interactive onSelect={handlePrev}>
        <HoverButton
          position={[2, 0.2, -0.5]}
          rotation={[0, -1.2, 0]}
          scale={spring.objScale}
          text="Буцах"
          onClick={handlePrev}
        />
      </Interactive>
    </group>
  )
}
