import { Interactive, useXR } from '@react-three/xr'
import { useEffect, useRef, useState } from 'react'
import { a, useSpring, config } from '@react-spring/three'
import HoverButton from '../../../components/HoverButton'
import InfoText from '../../../components/InfoText'

export default function First({ setLocation }) {
  const infoRef = useRef()
  const [infoVisible, setInfoVisible] = useState(false)
  const { player, isPresenting } = useXR()

  useEffect(() => {
    if (isPresenting) {
      player.children[0].add(infoRef.current)
    }

    return () => {
      player.children[0].children.length = 0
    }
  }, [isPresenting])

  return (
    <group>
      {/* INFO */}
      <group ref={infoRef} position={[-2, 0, 0]}>
        <HoverButton
          position={[0, 0, 0]}
          rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
          scale={0.15}
          text="Унших"
          onClick={() => setInfoVisible(true)}
        />
        <Interactive onSelect={() => setInfoVisible(false)}>
          <InfoText
            visible={infoVisible}
            onClick={() => setInfoVisible(false)}
            scale={1}
            position={[0, 0, 0]}
            rotation={[Math.PI * 0.5, Math.PI * 0.5, 0]}
            title="ХХБ дахь цахилгааны аюул."
            text="Цахилгааны Хаалттай хувиарлах байгууламж ( ХХБ) нь цахилгаан тоноглолын таслах,залгах аппаратур , удирдлагын хэлхээ байралдаг сэлгэн залгалт хийгддэг онц чухал объект юм."
          />
        </Interactive>
      </group>
    </group>
  )
}
