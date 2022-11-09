import React, { useEffect, useRef, useState } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import { useXR } from '@react-three/xr'
import MenuBar from '../../../components/MenuBar'

export default function Fourth({ env, setCurrent, visible, setMenu }) {
  const [show, setShow] = useState(false)
  const [spring, api] = useSpring(() => ({
    from: { scale: 41, objScale: 0, opacity: 0 },
  }))
  const { player } = useXR()
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
          setCurrent(3)
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
          setCurrent(5)
        }
      },
    })
  }

  useEffect(() => {
    if (visible) {
      player.children[0].add(menuRef.current)
      setShow(true)
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
        rotation={[0, -0.5, 0]}
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
