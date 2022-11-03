import React, { useState, useEffect } from 'react'
import { a, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import { Interactive } from '@react-three/xr'

export default function Second({ env, visible, setCurrent }) {
  const [animate, setAnimate] = useState(true)

  const handleNext = () => {
    setAnimate(false)
  }

  const styles = useSpring({
    scale: animate ? 20 : 30,
    opacity: animate ? 1 : 0,
    onRest: () => {
      if (animate === false) {
        setCurrent(1)
      }
    },
  })

  useEffect(() => {
    if (visible) {
      setAnimate(true)
    }
  }, [visible])

  return (
    <group visible={visible}>
      <a.mesh scale={styles.scale} material-opacity={styles.opacity}>
        <sphereGeometry />
        <meshBasicMaterial side={BackSide} map={env} transparent />
      </a.mesh>

      <Interactive onSelect={handleNext}>
        <mesh onClick={handleNext} position={[-2, 1.5, -2]}>
          <boxGeometry />
          <meshBasicMaterial color="pink" />
        </mesh>
      </Interactive>
    </group>
  )
}
