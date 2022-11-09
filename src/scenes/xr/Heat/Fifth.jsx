import { Interactive, useXR } from '@react-three/xr'
import { useState, useEffect, useRef } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import HoverButton from '../../../components/HoverButton'
import MenuBar from '../../../components/MenuBar'

export default function Fifth({ env, setCurrent, visible, setMenu }) {
  const { player } = useXR()
  const [show, setShow] = useState(false)
  const [spring, api] = useSpring(() => ({
    from: { scale: 40, objScale: 0, opacity: 0 },
  }))
  const menuRef = useRef()
  const handleMenu = () => {
    player.children[0].remove(menuRef.current)
    setMenu()
  }
  const { scale } = useSpring({
    scale: show ? 1 : 0,
  })

  const handlePrev = () => {
    player.children[0].remove(menuRef.current)
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
    player.children[0].remove(menuRef.current)
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
      player.children[0].add(menuRef.current)
      player.position.set(0, -1.2, 0)
      api.start({
        to: { scale: 20, objScale: 0.1, opacity: 1 },
        config: config.slow,
      })
    } else {
      setShow(false)
      if (menuRef.current) {
        player.children[0].remove(menuRef.current)
      }
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

      <MenuBar
        scale={scale}
        onPrev={handlePrev}
        onNext={handleNext}
        onMenu={handleMenu}
        ref={menuRef}
        type={2}
      />
    </group>
  )
}
