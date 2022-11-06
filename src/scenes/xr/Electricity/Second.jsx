import { Interactive } from '@react-three/xr'
import { useState, useEffect } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'

export default function Second({ env, setCurrent, visible }) {
  const [show, setShow] = useState(true)
  const [spring, api] = useSpring(() => ({
    from: { scale: 40, objScale: 0, opacity: 0 },
  }))

  const handlePrev = () => {
    // setIntro(false)
    api.start({
      from: { scale: 20, opacity: 1, objScale: 1 },
      to: { scale: 40, opacity: 0, objScale: 0 },
      config: config.slow,
      onChange: () => {
        if (spring.opacity.get() < 0.3) {
          setShow(false)
          setCurrent(1)
        }
      },
    })
  }

  const handleNext = () => {
    api.start({
      from: { scale: 20, opacity: 1, objScale: 1 },
      to: { scale: 0, opacity: 0, objScale: 0 },
      config: config.slow,
      onChange: () => {
        if (spring.opacity.get() < 0.3) {
          setShow(false)
          setCurrent(3)
        }
      },
    })
  }

  useEffect(() => {
    if (visible) {
      setShow(true)
      api.start({
        to: { scale: 20, objScale: 1, opacity: 1 },
        config: config.slow,
      })
    }
  }, [visible])

  return (
    <group visible={show}>
      <a.mesh
        scale={spring.scale}
        material-opacity={spring.opacity}
        position={[0, 0, 0]}
      >
        <sphereGeometry />
        <meshBasicMaterial side={BackSide} map={env} transparent />
      </a.mesh>

      <a.group scale={spring.objScale}>
        <Interactive onSelect={handlePrev}>
          <mesh onClick={handlePrev} scale={0.2} position={[-2, 1.5, -2]}>
            <sphereGeometry />
            <meshBasicMaterial color="pink" />
          </mesh>
        </Interactive>
        <Interactive onSelect={handleNext}>
          <mesh onClick={handleNext} scale={0.2} position={[-2, 1, -2]}>
            <sphereGeometry />
            <meshBasicMaterial color="hotpink" />
          </mesh>
        </Interactive>
      </a.group>
    </group>
  )
}
