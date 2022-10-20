import React from 'react'
import { BackSide } from 'three'

const Env = ({ map }) => {
  return (
    <mesh scale={20}>
      <sphereBufferGeometry />
      <meshBasicMaterial side={BackSide} map={map} transparent />
    </mesh>
  )
}

export default Env
