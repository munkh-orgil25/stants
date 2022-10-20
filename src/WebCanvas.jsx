import { Loader, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Env from './components/Env'
import Menu from './sections/Menu'
import TestPlace from './sections/TestPlace'

const WebCanvas = () => {
  return (
    <div className="canvas">
      <Canvas>
        <TestPlace />
        <Menu />
        <OrbitControls enableZoom={false} />
      </Canvas>
      <Loader />
    </div>
  )
}

export default WebCanvas
