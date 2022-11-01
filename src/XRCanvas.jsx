import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { XR } from '@react-three/xr'
import { BackSide } from 'three'

function XRCanvas() {
  return (
    <div className="canvas">
      <Canvas>
        <XR>
          <mesh scale={100}>
            <sphereBufferGeometry />
            <meshBasicMaterial color="#ddd" side={BackSide} />
          </mesh>

          <mesh position={[0, 1.6, -3]}>
            <boxBufferGeometry />
            <meshBasicMaterial color="blue" />
          </mesh>
        </XR>
      </Canvas>
      <Loader />
    </div>
  )
}

export default XRCanvas
