import { Canvas } from '@react-three/fiber'
import { XRButton, XR } from '@react-three/xr'
import { useEffect, useRef, useState } from 'react'
import { BackSide } from 'three'
import { Route } from 'wouter'
import WebCanvasWrapper from './components/WebCanvasWrapper'
import Home from './pages/Home'
import Menu from './pages/Menu'
import WebCanvas from './WebCanvas'
import XRCanvas from './XRCanvas'
import Scope from './components/Scope'
import Height from './scenes/Height'
import Electricity from './scenes/Electricity'

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
          <img src="/images/bg2.png" alt="background" />
        </div>

        <Route path="/">
          <Home setStart={setStart} supported={supported} />
        </Route>

        <Route path="/menu">
          <Menu />
        </Route>

        <Scope base="/1">
          <WebCanvasWrapper>
            <Height />
          </WebCanvasWrapper>
        </Scope>

        <Scope base="/2">
          <WebCanvasWrapper>
            <Electricity />
          </WebCanvasWrapper>
        </Scope>
      </div>

      {/* {start === 'xr' ? <XRCanvas /> : start === 'web' ? <WebCanvas /> : null} */}
    </div>
  )
}

export default App
