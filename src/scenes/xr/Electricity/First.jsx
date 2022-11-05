import { Interactive, useXR } from '@react-three/xr'
import { useState, useEffect } from 'react'
import {
  a,
  config,
  useChain,
  useSpring,
  useSpringRef,
} from '@react-spring/three'
import { BackSide } from 'three'

export default function First({ env, setCurrent, visible }) {
  const { player } = useXR()
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    player.position.set(0, -1.2, 0)
  }, [])

  const handleNext = () => {
    setAnimate(false)
  }

  const scaleApi = useSpringRef()
  const { scale } = useSpring({
    ref: scaleApi,
    config: config.slow,
    from: { scale: animate ? 3 : 20 },
    to: { scale: animate ? 20 : 3 },
  })

  const opacityApi = useSpringRef()
  const { opacity } = useSpring({
    ref: opacityApi,
    config: config.slow,
    from: { opacity: 1 },
    to: { opacity: animate ? 1 : 0 },
    onChange: () => {
      if (opacity.get() < 0.1 && !animate) {
        setCurrent(2)
      }
    },
  })

  useChain(animate ? [opacityApi, scaleApi] : [scaleApi, opacityApi], [0, 0.2])

  useEffect(() => {
    if (visible) {
      setAnimate(true)
    }
  }, [visible])

  return (
    <group visible={visible}>
      {/* BG */}
      <a.mesh scale={scale} material-opacity={opacity} position={[0, 0, 0]}>
        <sphereGeometry />
        <meshBasicMaterial map={env} transparent side={BackSide} />
      </a.mesh>

      <a.group>
        <Interactive onSelect={handleNext}>
          <mesh onClick={handleNext} position={[0, 1.5, -2]} scale={0.2}>
            <sphereGeometry />
            <meshBasicMaterial />
          </mesh>
        </Interactive>
      </a.group>
    </group>
  )
}
