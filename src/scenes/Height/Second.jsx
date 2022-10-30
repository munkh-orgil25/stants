import React from 'react'

const Second = () => {
  return (
    <group>
      <Env map={envMap2} />
      <mesh
        position={[0, 20, 0]}
        scale={0.3}
        onClick={() => setLocation('/')}
      >
        <sphereBufferGeometry />
        <meshBasicMaterial color="#ddd" />
      </mesh>
    </group>
  )
}

export default Second