/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-props-no-spreading */
import { Suspense, useEffect, useState } from 'react'
import { Route, useLocation } from 'wouter'
import WebCanvasWrapper from './components/WebCanvasWrapper'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Scope from './components/Scope'
import Height from './scenes/Height'
import Electricity from './scenes/Electricity'
import XRMenu from './pages/XRMenu'
import XRCanvasWrapper from './components/XRCanvasWrapper'

function App() {
  const [supported, setSupported] = useState()
  const [location, setLocation] = useLocation()

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
          <Home supported={supported} setLocation={setLocation} />
        </Route>

        <Route path="/menu">
          <Menu />
        </Route>

        <Route path="/xr/menu">
          <XRCanvasWrapper>
            <XRMenu />
          </XRCanvasWrapper>
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
