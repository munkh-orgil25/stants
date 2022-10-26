import { Canvas } from '@react-three/fiber'
import { XRButton, XR } from '@react-three/xr'
import { useEffect, useRef, useState } from 'react'
import { BackSide } from 'three'
import WebCanvas from './WebCanvas'
import XRCanvas from './XRCanvas'

function App() {
  const [supported, setSupported] = useState()
  const [start, setStart] = useState(null)

  useEffect(() => {
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr').then((isSupported) => {
        if (isSupported) {
          setSupported(true)
        } else {
          setSupported(false)
        }
      })
    } else {
      setSupported(false)
    }
  }, [])

  return (
    <div className="main">
      <div className="home_section">
        <div className="background">
          <img src="/images/bg.png" alt="background" />
        </div>
        <div className="mask" />
        <div className="text-w">
          <h1 className="title">
            <div className="line">Дулааны Цахилгаан</div>
            <div className="line">Станц</div>
          </h1>
        </div>
      </div>
      {supported ? (
        <XRButton mode="VR" onClick={() => setStart('xr')}>
          Эхлэх XR
        </XRButton>
      ) : (
        <button onClick={() => setStart('web')}>Эхлэх Web</button>
      )}

      {start === 'xr' ? <XRCanvas /> : start === 'web' ? <WebCanvas /> : null}
    </div>
  )
}

export default App
