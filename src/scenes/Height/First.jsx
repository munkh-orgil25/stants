import { Environment, Text, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'wouter'
import * as THREE from 'three'
import {a, useSpring, config} from '@react-spring/three'

const AnimatedText = a(Text)

const First = () => {
  const [textAnimate, setTextAnimate] = useState(false)
  const textAlpha = useTexture('/textures/1/txtAlpha.png')
  const [location, setLocation] = useLocation()
  const [moveState, setMoveState] = useState(null)

  const moveDown = () => {
    setMoveState('start')
  }

  const initial = useSpring({
    bgOpacity: textAnimate ? 0.7 : 0,
    textOpacity: textAnimate ? 1 : 0,
    config: config.slow
  })

  const vec = new THREE.Vector3()
  const markRef = useRef()
  useFrame((state) => {
    if (moveState === 'start') {
      state.camera.lookAt(markRef.current.position)
      state.camera.position.lerp(vec.set(-5, -15, 0), 0.05)
      state.camera.updateProjectionMatrix
      console.log(state.camera.position.y)
    }
    if (state.camera.position.y < -14) {
      // setMoveState('end')
    }
    return null
  })

  useEffect(() => {
    setTextAnimate(true)
  }, [])

  useEffect(() => {
    if (moveState === 'end') {
      setLocation('/1')
    }
  }, [moveState])

  return (
    <group>
      {/* <Env map={envMap} rotation={[0,-1.7,0]}/> */}
      <Environment
        background 
        files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
        path="/textures/1.1/"
      />
      <mesh position={[0, -40, -20]} scale={1} onClick={moveDown}>
        <sphereBufferGeometry />
        <meshBasicMaterial color="#ddd" />
      </mesh>
      <mesh position={[0, -40, -30]} ref={markRef}>
        <planeBufferGeometry />
        <meshBasicMaterial color="#ddd" transparent opacity={0} />
      </mesh>

      {/* Text */}
      <a.mesh
        rotation={[0,0,0]}
        position={[0,0, -20]}
        material-opacity={initial.bgOpacity}
        onClick={() => setTextAnimate(!textAnimate)}
      >
        <planeBufferGeometry args={[25, 16, 1]}/>
        <meshBasicMaterial 
          transparent 
          color='#0a193f' 
          opacity={0.8} 
          alphaMap={textAlpha}
        />
        <AnimatedText
          position={[0,0,0.001]}
          color="#00ffe6"
          fontSize={1} 
          anchorX="center"
          anchorY="middle"
          font="/fonts/variable.ttf"
          outlineColor="#00ffe6"
          outlineWidth={0}
          maxWidth={20}
          fillOpacity={initial.textOpacity}
        >
          1,3 метрээс дээш өндөрт зориулалтын (нэмэлт бэхлэгээ хийгдсэн, пайзтай, шат тавцанг акт үйлдэж хүлээлцсэн гэх мэт) шат тавьсан дээр ажил гүйцэтгэх ёстой. Та өндөр ажил гүйцэтгэх үед өнөөдрийн бүсийг тогтмол зүүж амин цэг, амин олсноос бүсийг бэхлэж ажил гүйцэтгэх ёстой. Өндөр .  Биё биендээ хяналт тавьж, өндөөр биет унагаахгүй болгоомжтой ажил гүйцэтгэх.
        </AnimatedText>
      </a.mesh>
    </group>
  )
}

export default First