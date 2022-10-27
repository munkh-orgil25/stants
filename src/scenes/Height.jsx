import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Route, useLocation } from 'wouter'
import Env from '../components/Env'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'

const Height = () => {
  const [location, setLocation] = useLocation()
  console.log(location)
  const envMap = useTexture('/textures/1/color2.jpg')
  const envMap2 = useTexture('/textures/1/color4.jpg')

  const [moveState, setMoveState] = useState(null)

  const moveDown = () => {
    setMoveState('start')
  }

  const vec = new THREE.Vector3()
  const markRef = useRef()
  useFrame((state) => {
    if (moveState === 'start') {
      state.camera.lookAt(markRef.current.position)
      state.camera.position.lerp(vec.set(-5, -15, 0), 0.1)
      state.camera.updateProjectionMatrix
      console.log(state.camera.position.y)
    }
    if (state.camera.position.y < -14) {
      setMoveState('end')
    }
    return null
  })

  useEffect(() => {
    if (moveState === 'end') {
      setLocation('/1')
    }
  }, [moveState])

  return (
    <group>
      <Route path="/">
        <Env map={envMap} />
        <mesh position={[-20, -40, 0]} scale={1} onClick={moveDown}>
          <sphereBufferGeometry />
          <meshBasicMaterial color="#ddd" />
        </mesh>
        <mesh position={[-10, -30, 0]} ref={markRef}>
          <planeBufferGeometry />
          <meshBasicMaterial color="#ddd" transparent opacity={0} />
        </mesh>
      </Route>
      <Route path="/1">
        <Env map={envMap2} />
        <mesh
          position={[0, 20, 0]}
          scale={0.3}
          onClick={() => setLocation('/')}
        >
          <sphereBufferGeometry />
          <meshBasicMaterial color="#ddd" />
        </mesh>
      </Route>
    </group>
  )
}

export default Height
