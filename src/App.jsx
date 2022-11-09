import { useEffect, useState } from 'react'
import { Link, Route, useLocation } from 'wouter'
import { DefaultXRControllers, XRCanvas, XRButton } from '@react-three/xr'
import { OrbitControls } from '@react-three/drei'
import WebCanvasWrapper from './components/WebCanvasWrapper'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Scope from './components/Scope'
import Height from './scenes/Height'
import Electricity from './scenes/Electricity'
import XRApp from './pages/XRApp'

function App() {
  const [supported, setSupported] = useState(false)
  const [startXr, setStartXr] = useState(false)

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
          <img src="/images/bg1.png" alt="background" />
        </div>

        <Route path="/">
          <Home supported={supported} setStartXr={setStartXr} />
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

      {startXr ? (
        <div className="canvas">
          <XRCanvas>
            <XRApp />
            <DefaultXRControllers rayMaterial={{ color: '#006DB6' }} />
            <OrbitControls />
          </XRCanvas>
        </div>
      ) : null}

      {/* {start === 'xr' ? <XRCanvas /> : start === 'web' ? <WebCanvas /> : null} */}
    </div>
  )
}

export default App
