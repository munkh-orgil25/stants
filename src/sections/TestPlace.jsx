import { useTexture } from '@react-three/drei'
import React from 'react'
import Env from '../components/Env'

const TestPlace = () => {
  const envMap = useTexture('/textures/env2.jpg')
  return (
    <group>
      <Env map={envMap} />
    </group>
  )
}

export default TestPlace
