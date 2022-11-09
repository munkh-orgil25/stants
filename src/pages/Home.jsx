import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { XRButton } from '@react-three/xr'
import { useState } from 'react'
import { Link } from 'wouter'
import XRApp from './XRApp'

function Home({ supported, setStartXr }) {
  return (
    <div className="content-w">
      <div className="illustration-w">
        <img src="/images/intro.png" alt="intro-illustration" />
      </div>
      <div className="button-w">
        {supported ? (
          <XRButton
            mode="VR"
            className="start-btn"
            sessionInit={{
              optionalFeatures: [
                'local-floor',
                'bounded-floor',
                'hand-tracking',
                'layers',
              ],
            }}
            onClick={() => setStartXr(true)}
          >
            Эхлэх
          </XRButton>
        ) : (
          <Link href="/menu">
            <button type="button" className="start-btn">
              Эхлэх
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Home
