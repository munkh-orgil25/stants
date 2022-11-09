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
import Info from './Info'
import MenuBar from '../../../components/MenuBar'

export default function First({ env, setCurrent, visible }) {
  const { player } = useXR()
  const [animate, setAnimate] = useState(true)
  const [infoVisible, setInfoVisible] = useState(false)

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

      {/* INFO */}
      <HoverButton
        position={[-1.5, 1, -2.5]}
        rotation={[0, 0.25, 0]}
        scale={0.2}
        text="Унших"
        onClick={() => setInfoVisible(true)}
      />
      <Interactive onSelect={() => setInfoVisible(false)}>
        <Info
          visible={infoVisible}
          onClick={() => setInfoVisible(false)}
          scale={1}
          position={[0, 2, -2]}
          rotation={[0, 0, 0]}
          title="Ажлын байрны шат тавцан, уур усны аюул"
          text="Та байнгын шат тавцангаар явахадаа гурав болон дөрвөн цэгийн дүрс (2 гар, 2 хөл, эсвэл 2 гар, 1 хөл гишгүүр, шатны бариултай контакталхыг хэлнэ)-ийг баримталж явах ёстой. Байнгын шатнууд стандарт бус марштай тул огцом уруудахад хөл алдах хальтрах, цохих эрсдэлтэй. Шатны гишгүүр дээр ус, тос асгарсан байвал хальтрахаас болгоомжил. Үйлдвэрийн байранд шугам хоолой, хаалтнаас уур ус гарсан, ЗОН татсан байвал ойртохгүй байх, тойрч гарах шаардлагатай. Энэ нь та нэг халуун уур, усанд түлэглэх эрсдэлээс хамгаална. Уур усны алдагдлыг та аюулыг зургаар баримтжуулж  аюулыг мэдээлэх хуудсаар мэлээлж устгуулах үүрэгтэй."
        />
      </Interactive>

      {/* TP */}
      <Interactive onSelect={handleNext}>
        <HoverButton
          arrow
          position={[0.7, 1.5, -3]}
          rotation={[0, 0, 0]}
          scale={0.12}
          text="Шилжих"
          onClick={handleNext}
        />
      </Interactive>

      {/* MENU */}
      <MenuBar />
    </group>
  )
}
