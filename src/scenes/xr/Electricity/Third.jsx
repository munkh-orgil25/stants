import React, { useEffect, useState } from 'react'
import { a, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import { Interactive } from '@react-three/xr'

export default function Third({ env, setCurrent, visible }) {
  const [show, setShow] = useState(true)
  const [spring, api] = useSpring(() => ({
    from: { scale: 41, objScale: 0 },
  }))

  const handlePrev = () => {
    // setIntro(false)
    api.start({
      from: { scale: 20, objScale: 1 },
      to: { scale: 41, objScale: 0 },
    })
    setCurrent(2)
  }

  const handleNext = () => {
    api.start({
      from: { scale: 20, objScale: 1 },
      to: { scale: 0, objScale: 0 },
    })
    // setCurrent(3)
  }

  useEffect(() => {
    if (visible) {
      // setIntro(true)
      api.start({
        to: { scale: 20, objScale: 1 },
      })
    }
  }, [visible])

  return (
    <group visible={show}>
      <mesh scale={41}>
        <sphereGeometry />
        <meshBasicMaterial map={env} transparent side={BackSide} />
      </mesh>

      <a.group scale={spring.objScale}>
        <Interactive onSelect={handlePrev}>
          <mesh onClick={handlePrev} scale={0.2} position={[-2, 1.5, -2]}>
            <sphereGeometry />
            <meshBasicMaterial color="#259938" />
          </mesh>
        </Interactive>
        {/* <Interactive onSelect={handleNext}>
          <mesh onClick={handleNext} scale={0.2} position={[-2, 1, -2]}>
            <sphereGeometry />
            <meshBasicMaterial color="#34eb5b" />
          </mesh>
        </Interactive> */}
      </a.group>
    </group>
  )
}
