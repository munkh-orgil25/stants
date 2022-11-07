import { Interactive, useXR } from '@react-three/xr'
import { useState, useEffect } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide, sRGBEncoding } from 'three'
import HoverButton from '../../../components/HoverButton'

export default function Second({ env, setCurrent, visible }) {
  const { player } = useXR()
  const [show, setShow] = useState(false)
  const [spring, api] = useSpring(() => ({
    from: { scale: 40, objScale: 0, opacity: 0 },
  }))

  const [video] = useState(() =>
    Object.assign(document.createElement('video'), {
      src: 'https://d3w3wbk40x6rvz.cloudfront.net/videos/6.mp4',
      crossOrigin: 'anonymous',
      loop: true,
      muted: false,
    })
  )

  const handlePrev = () => {
    api.start({
      from: { scale: 20, opacity: 1, objScale: 0.1 },
      to: { scale: 40, opacity: 0, objScale: 0 },
      config: config.slow,
      onChange: () => {
        if (spring.opacity.get() < 0.3) {
          setShow(false)
          setCurrent(1)
        }
      },
    })
  }

  useEffect(() => {
    if (visible) {
      setShow(true)
      player.position.set(0, -1.2, 0)
      api.start({
        to: { scale: 20, objScale: 0.1, opacity: 1 },
        config: config.slow,
        onRest: () => video.play(),
      })
    } else {
      setShow(false)
    }
  }, [visible])

  return (
    <group visible={show}>
      <a.mesh
        scale={spring.scale}
        material-opacity={spring.opacity}
        position={[0, 0, 0]}
        rotation={[0, 1.15, 0]}
      >
        <sphereGeometry />
        <meshBasicMaterial side={BackSide} transparent>
          <videoTexture attach="map" args={[video]} encoding={sRGBEncoding} />
        </meshBasicMaterial>
      </a.mesh>

      {/* TP */}
      <Interactive onSelect={handlePrev}>
        <HoverButton
          arrow
          position={[0, -0.5, -2]}
          rotation={[0, 0, 0]}
          scale={0.1}
          text="Буцах"
          onClick={handlePrev}
        />
      </Interactive>
    </group>
  )
}
