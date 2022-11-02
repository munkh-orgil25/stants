import { Interactive, useXR } from '@react-three/xr'
import { useEffect, useRef, useState } from 'react'
import { a, useSpring, config } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import HoverButton from '../../../components/HoverButton'
import InfoText from '../../../components/InfoText'

export default function First({ setLocation }) {
  const infoRef = useRef()
  const [infoVisible, setInfoVisible] = useState(true)
  const [camera, setCamera] = useState(null)
  const { player, isPresenting } = useXR()

  return (
    <group>
      {/* INFO */}
      <group position={[-4, 0.6, -5]} rotation={[0, 0.75, 0]}>
        <HoverButton
          position={[0, 0, -0.01]}
          scale={0.5}
          text="Унших"
          onClick={() => setInfoVisible(true)}
        />
        <Interactive onSelect={() => setInfoVisible(false)}>
          <InfoText
            visible={infoVisible}
            onClick={() => setInfoVisible(false)}
            scale={1}
            position={[0, 1, 4]}
            title="ХХБ дахь цахилгааны аюул."
            text="1,3 метрээс дээш өндөрт зориулалтын (нэмэлт бэхлэгээ хийгдсэн, пайзтай, шат тавцанг акт үйлдэж хүлээлцсэн гэх мэт) шат тавьсан дээр ажил гүйцэтгэх ёстой. Та өндөр ажил гүйцэтгэх үед өнөөдрийн бүсийг тогтмол зүүж амин цэг, амин олсноос бүсийг бэхлэж ажил гүйцэтгэх ёстой. Өндөр .  Биё биендээ хяналт тавьж, өндөөр биет унагаахгүй болгоомжтой ажил гүйцэтгэх."
          />
        </Interactive>
      </group>
    </group>
  )
}
