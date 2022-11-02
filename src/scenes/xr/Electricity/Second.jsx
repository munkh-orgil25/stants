import { Environment } from '@react-three/drei'
import { Interactive } from '@react-three/xr'

export default function Second({ setLocation }) {
  return (
    <group>
      <Interactive onSelect={() => setLocation('/xr/1')}>
        <mesh position={[0.5, 1.5, -2]} scale={0.2}>
          <boxBufferGeometry />
          <meshBasicMaterial color="red" />
        </mesh>
      </Interactive>
    </group>
  )
}
