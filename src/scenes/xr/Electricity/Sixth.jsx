import React, { useEffect, useState } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import { Interactive } from '@react-three/xr'
import HoverButton from '../../../components/HoverButton'

export default function Sixth({ env, setCurrent, visible }) {
  const [show, setShow] = useState(false)
  const [spring, api] = useSpring(() => ({
    from: { scale: 41, objScale: 0.1, opacity: 0 },
  }))

  const handlePrev = () => {
    api.start({
      from: { scale: 20, opacity: 1, objScale: 0.1 },
      to: { scale: 40, opacity: 0, objScale: 0 },
      config: config.slow,
      onChange: () => {
        if (spring.opacity.get() < 0.3) {
          setShow(false)
          setCurrent(5)
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
        rotation={[0, -2, 0]}
      >
        <sphereGeometry />
        <meshBasicMaterial side={BackSide} map={env} transparent />
      </a.mesh>

      {/* TP */}
      <Interactive onSelect={handlePrev}>
        <HoverButton
          arrow
          position={[0, 0.3, -2.62]}
          rotation={[0, 0, 0]}
          scale={spring.objScale}
          text="Буцах"
          onClick={handlePrev}
        />
      </Interactive>
    </group>
  )
}
