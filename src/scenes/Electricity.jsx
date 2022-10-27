import { useTexture } from '@react-three/drei'
import { Route, useLocation } from 'wouter'
import Env from '../components/Env'

const Electricity = () => {
  const [location, setLocation] = useLocation()
  console.log(location)
  const envMap = useTexture('/textures/2/color1.jpg')
  const envMap2 = useTexture('/textures/2/color3.jpg')

  return (
    <group>
      <Route path="/">
        <Env map={envMap} />
        <mesh
          position={[-10, -10, -5]}
          scale={0.3}
          onClick={() => setLocation('/1')}
        >
          <sphereBufferGeometry />
          <meshBasicMaterial color="#ddd" />
        </mesh>
      </Route>
      <Route path="/1">
        <Env map={envMap2} />
        <mesh
          position={[-10, -15, -25]}
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

export default Electricity
