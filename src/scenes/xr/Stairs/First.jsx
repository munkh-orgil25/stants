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
import HoverButton from '../../../components/HoverButton'
import InfoText from '../../../components/InfoText'

export default function First({ env, setCurrent, visible }) {
  const { player } = useXR()
  const [animate, setAnimate] = useState(true)
  const [infoVisible, setInfoVisible] = useState(false)

  const handleNext = () => {
    setAnimate(false)
  }

  const scaleApi = useSpringRef()
  const { scale } = useSpring({
    ref: scaleApi,
    config: config.slow,
    from: { scale: animate ? 5 : 20 },
    to: { scale: animate ? 20 : 5 },
  })

  const opacityApi = useSpringRef()
  const { opacity } = useSpring({
    ref: opacityApi,
    config: config.slow,
    from: { opacity: 1 },
    to: { opacity: animate ? 1 : 0 },
    onChange: () => {
      if (opacity.get() < 0.25 && !animate) {
        setCurrent(2)
      }
    },
  })

  // OJBECTS
  useChain(animate ? [opacityApi, scaleApi] : [scaleApi, opacityApi], [0, 0.4])

  useEffect(() => {
    if (visible) {
      player.position.set(0, -1.2, 0)
      setAnimate(true)
    }
  }, [visible])

  return (
    <group visible={visible}>
      {/* BG */}
      <a.mesh
        scale={scale}
        material-opacity={opacity}
        position={[0, 0, 0]}
        rotation={[0, -1.3, 0]}
      >
        <sphereGeometry />
        <meshBasicMaterial map={env} transparent side={BackSide} />
      </a.mesh>

      {/* INFO */}
      <HoverButton
        position={[-1.3, 0.25, -2.5]}
        rotation={[0, 0.5, 0]}
        scale={0.2}
        text="Унших"
        onClick={() => setInfoVisible(true)}
      />
      <Interactive onSelect={() => setInfoVisible(false)}>
        <InfoText
          visible={infoVisible}
          onClick={() => setInfoVisible(false)}
          scale={1}
          position={[0, 0.8, -2]}
          rotation={[0, 0, 0]}
          title="Гар болон слесарын багажны аюул"
          text="Ажил хийхэд багаж нь аюулгүй ажиллагааг бүрэн хангаж шаардлагад нийцсэн , туршигдаж баталгаажсан байх ёстой."
        />
      </Interactive>

      {/* TP */}
      <Interactive onSelect={handleNext}>
        <HoverButton
          arrow
          position={[3, 0.5, -3]}
          rotation={[0, -0.5, 0]}
          scale={0.2}
          text="Шилжих"
          onClick={handleNext}
        />
      </Interactive>
    </group>
  )
}
