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
import Info from './Info'
import MenuBar from '../../../components/MenuBar'

export default function First({ env, setCurrent, visible, setMenu }) {
  const { player } = useXR()
  const [animate, setAnimate] = useState(true)
  const [infoVisible, setInfoVisible] = useState(false)

  const { menuScale, pos } = useSpring({
    menuScale: animate ? 1 : 0,
    pos: animate ? [0, -0.5, -1.5] : [0, -10, -2],
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
        rotation={[0, -0.35, 0]}
      >
        <sphereGeometry />
        <meshBasicMaterial map={env} transparent side={BackSide} />
      </a.mesh>

      <Interactive onSelect={() => setInfoVisible(false)}>
        <Info
          visible={infoVisible}
          onClick={() => setInfoVisible(false)}
          scale={1}
          position={[0, 0.8, -2]}
          rotation={[0, 0, 0]}
          title="Ажлын байрны шат тавцан, уур усны аюул"
          text="Та байнгын шат тавцангаар явахадаа гурав болон дөрвөн цэгийн дүрс (2 гар, 2 хөл, эсвэл 2 гар, 1 хөл гишгүүр, шатны бариултай контакталхыг хэлнэ)-ийг баримталж явах ёстой. Байнгын шатнууд стандарт бус марштай тул огцом уруудахад хөл алдах хальтрах, цохих эрсдэлтэй. Шатны гишгүүр дээр ус, тос асгарсан байвал хальтрахаас болгоомжил. Үйлдвэрийн байранд шугам хоолой, хаалтнаас уур ус гарсан, ЗОН татсан байвал ойртохгүй байх, тойрч гарах шаардлагатай. Энэ нь та нэг халуун уур, усанд түлэглэх эрсдэлээс хамгаална. Уур усны алдагдлыг та аюулыг зургаар баримтжуулж  аюулыг мэдээлэх хуудсаар мэлээлж устгуулах үүрэгтэй."
        />
      </Interactive>

      <MenuBar
        pos={pos}
        scale={menuScale}
        onNext={handleNext}
        onInfo={() => setInfoVisible(true)}
        onMenu={setMenu}
        type={1}
      />
    </group>
  )
}
