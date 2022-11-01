import { useEffect, useState } from 'react'
import { Route, useLocation } from 'wouter'
import WebCanvasWrapper from './components/WebCanvasWrapper'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Scope from './components/Scope'
import Height from './scenes/Height'
import Electricity from './scenes/Electricity'

function App() {
  const [supported, setSupported] = useState(false)

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
          <Home supported={supported} />
        </Route>

        <Route path="/menu">
          <Menu />
        </Route>

        {/* <Scope base="/xr">
          <XRCanvasWrapper>
            <XRApp />
          </XRCanvasWrapper>
        </Scope> */}

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
