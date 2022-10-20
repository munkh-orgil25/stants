import { useTexture } from '@react-three/drei'
import React from 'react'
import Env from '../components/Env'

const Menu = () => {
  const startMap = useTexture('/textures/env1.jpg')

  return (
    <group>
      <Env map={startMap} />
    </group>
  )
}

export default Menu
