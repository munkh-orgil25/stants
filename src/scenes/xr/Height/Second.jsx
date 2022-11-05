import React, { useState, useEffect } from 'react'
import {
  a,
  config,
  useChain,
  useSpring,
  useSpringRef,
} from '@react-spring/three'
import { BackSide } from 'three'
import { Interactive } from '@react-three/xr'

export default function Second({ env, visible, setCurrent }) {
  const [animate, setAnimate] = useState(true)

  const handleNext = () => {
    setAnimate(false)
  }

  const { scale } = useSpring({
    config: config.slow,
    scale: animate ? 30 : 21,
    onChange: () => {
      if (scale.get() < 23 && !animate) {
        setCurrent(1)
      }
    },
  })

  // const opacityApi = useSpringRef()
  // const { opacity } = useSpring({
  //   ref: opacityApi,
  //   config: config.slow,
  //   from: { opacity: 1 },
  //   to: { opacity: animate ? 1 : 1 },
  //   onChange: () => {
  //     if (opacity.get() < 0.2 && !animate) {
  //       setCurrent(1)
  //     }
  //   },
  // })

  // useChain(animate ? [opacityApi, scaleApi] : [scaleApi, opacityApi], [0, 0.2])

  useEffect(() => {
    if (visible) {
      setAnimate(true)
    }
  }, [visible])

  return (
    <group visible>
      <a.mesh scale={scale} material-opacity={1}>
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
