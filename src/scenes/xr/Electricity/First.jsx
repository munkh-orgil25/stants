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
import InfoText from '../../../components/InfoText'
import NavBar from '../../../components/NavBar'

export default function First({ env, setCurrent, visible, setMenu }) {
  const { player } = useXR()
  const [animate, setAnimate] = useState(true)
  const [infoVisible, setInfoVisible] = useState(false)

  const { menuScale, pos } = useSpring({
    menuScale: animate ? 1 : 0,
    pos: animate ? [0, 0, -1.5] : [0, -10, -2],
  })

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
        rotation={[0, -1.65, 0]}
      >
        <sphereGeometry />
        <meshBasicMaterial map={env} transparent side={BackSide} />
      </a.mesh>

      <Interactive onSelect={() => setInfoVisible(false)}>
        <InfoText
          visible={infoVisible}
          onClick={() => setInfoVisible(false)}
          scale={1}
          position={[0, 0.3, -2]}
          rotation={[0, 0, 0]}
          title="ХХБ дахь цахилгааны аюул."
          text="Цахилгааны Хаалттай хувиарлах байгууламж ( ХХБ) нь цахилгаан тоноглолын таслах,залгах аппаратур , удирдлагын хэлхээ байралдаг сэлгэн залгалт хийгддэг онц чухал объект юм."
        />
      </Interactive>

      <NavBar
        pos={pos}
        scale={menuScale}
        onNext={handleNext}
        onMenu={setMenu}
        onInfo={() => setInfoVisible(true)}
        type={1}
      />
    </group>
  )
}
