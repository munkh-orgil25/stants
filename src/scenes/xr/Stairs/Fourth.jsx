import { Interactive, useXR } from '@react-three/xr'
import { useState, useEffect } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import HoverButton from '../../../components/HoverButton'

export default function Fourth({ env, setCurrent, visible }) {
  const { player } = useXR()
  const [show, setShow] = useState(false)
  const [spring, api] = useSpring(() => ({
    from: { scale: 40, objScale: 0, opacity: 0 },
  }))

  const handlePrev = () => {
    api.start({
      from: { scale: 20, opacity: 1, objScale: 0.1 },
      to: { scale: 40, opacity: 0, objScale: 0 },
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
      player.position.set(0, -1.2, 0)
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
        rotation={[0, 0.1, 0]}
      >
        <sphereGeometry />
        <meshBasicMaterial side={BackSide} map={env} transparent />
      </a.mesh>

      <HoverButton
        position={[2.5, -0.5, -1]}
        rotation={[0, -1, 0]}
        scale={0.15}
        text="Багаж хэрэглэх үеийн хамгаалах хэрэгсэл"
        long
        onClick={() => {}}
      />

      <HoverButton
        position={[-1, -0.5, 3]}
        rotation={[0, -3, 0]}
        scale={0.15}
        text="Жижиг гар багажны тавцан"
        long
        onClick={() => {}}
      />

      <HoverButton
        position={[0, -0.5, -3]}
        rotation={[0, 0, 0]}
        scale={0.15}
        text="Механик гар багаж"
        long
        onClick={() => {}}
      />

      <HoverButton
        position={[2, -0.5, 2]}
        rotation={[0, -2, 0]}
        scale={0.15}
        text="Цахилгаан гар багаж"
        long
        arrow
        onClick={() => {}}
      />

      {/* TP */}
      <Interactive onSelect={handlePrev}>
        <HoverButton
          arrow
          position={[3, -0.5, 0.5]}
          rotation={[0, -1.5, 0]}
          scale={0.15}
          text="Буцах"
          onClick={handlePrev}
        />
      </Interactive>
    </group>
  )
}
