import { Environment } from '@react-three/drei'
import { Interactive } from '@react-three/xr'
import { useState, useEffect } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'

export default function Second({ env, setCurrent, visible }) {
  const [animate, setAnimate] = useState(true)

  const handleNext = () => {
    setAnimate(false)
  }

  const { scale } = useSpring({
    config: config.slow,
    scale: animate ? 40 : 21,
    onChange: () => {
      if (scale.get() < 21.5 && !animate) {
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
    <group>
      <a.mesh scale={scale} material-opacity={1} position={[0, 1.5, 0]}>
        <sphereGeometry />
        <meshBasicMaterial side={BackSide} map={env} transparent />
      </a.mesh>

      <a.group>
        <Interactive onSelect={handleNext}>
          <mesh onClick={handleNext} scale={0.2} position={[-2, 1.5, -2]}>
            <sphereGeometry />
            <meshBasicMaterial color="pink" />
          </mesh>
        </Interactive>
      </a.group>
    </group>
  )
}
