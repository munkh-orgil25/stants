import { Interactive, useXR } from '@react-three/xr'
import { useState, useEffect, useRef } from 'react'
import {
  a,
  config,
  useChain,
  useSpring,
  useSpringRef,
} from '@react-spring/three'
import { BackSide } from 'three'
import InfoText from '../../../components/InfoText'
import MenuBar from '../../../components/MenuBar'

export default function First({ env, setCurrent, visible, setMenu }) {
  const { player } = useXR()
  const [animate, setAnimate] = useState(true)
  const [infoVisible, setInfoVisible] = useState(false)

  const menuRef = useRef()
  const handleMenu = () => {
    player.children[0].remove(menuRef.current)
    setMenu()
  }
  const { menuScale } = useSpring({
    menuScale: animate ? 1 : 0,
  })

  const handleNext = () => {
    setAnimate(false)
    player.children[0].remove(menuRef.current)
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
      player.children[0].add(menuRef.current)
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

      <MenuBar
        scale={menuScale}
        onNext={handleNext}
        onMenu={handleMenu}
        onInfo={() => setInfoVisible(true)}
        ref={menuRef}
        type={1}
      />
    </group>
  )
}
