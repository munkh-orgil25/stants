import { XRButton } from '@react-three/xr'
import React from 'react'
import { Link } from 'wouter'

const Home = ({ setStart, supported }) => {
  return (
    <div className="content-w">
      <div className="illustration-w">
        <img src="/images/intro.png" alt="intro-illustration" />
      </div>
      <div className="button-w">
        {supported ? (
          <XRButton
            mode="VR"
            onClick={() => setStart('xr')}
            className="start-btn"
          >
            Эхлэх
          </XRButton>
        ) : (
          <Link href="/menu">
            <button className="start-btn">Эхлэх</button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Home
