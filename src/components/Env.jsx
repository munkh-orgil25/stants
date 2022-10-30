import React from 'react'
import { BackSide, DoubleSide } from 'three'

const Env = ({ map, rotation=[0,0,0] }) => {
  return (
    <mesh scale={50} rotation={rotation}>
      <sphereBufferGeometry />
      <meshBasicMaterial side={DoubleSide} map={map} transparent />
    </mesh>
  )
}

export default Env
