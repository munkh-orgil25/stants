import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const WebCanvasWrapper = ({ children }) => {
  return (
    <div className="canvas">
      <Canvas>
        {children}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}

export default WebCanvasWrapper
