import { Interactive, useXR } from '@react-three/xr'
import { useState, useEffect } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import HoverButton from '../../../components/HoverButton'

export default function Second({ env, setCurrent, visible }) {
  const { player } = useXR()
  const [show, setShow] = useState(false)
  const [spring, api] = useSpring(() => ({
    from: { scale: 40, objScale: 0, opacity: 0 },
  }))

  const handlePrev = () => {
    // setIntro(false)
    api.start({
      from: { scale: 20, opacity: 1, objScale: 0.1 },
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
      from: { scale: 20, opacity: 1, objScale: 0.1 },
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
      player.position.set(0, 0, 0)
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
        rotation={[0, 1.15, 0]}
      >
        <sphereGeometry />
        <meshBasicMaterial side={BackSide} map={env} transparent />
      </a.mesh>

      {/* TP */}
      <Interactive onSelect={handleNext}>
        <HoverButton
          arrow
          position={[-1, 2, -3]}
          rotation={[0, 0.5, 0]}
          scale={0.2}
          text="Шилжих"
          onClick={handleNext}
        />
      </Interactive>

      {/* TP */}
      <Interactive onSelect={handlePrev}>
        <HoverButton
          arrow
          position={[0, 0.3, 3]}
          rotation={[0, Math.PI, 0]}
          scale={0.1}
          text="Буцах"
          onClick={handlePrev}
        />
      </Interactive>
    </group>
  )
}
