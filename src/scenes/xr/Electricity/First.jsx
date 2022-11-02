import { Interactive } from '@react-three/xr'

export default function First({ setLocation }) {
  return (
    <group>
      <Interactive onSelect={() => setLocation('/xr/2/1')}>
        <mesh position={[0.5, 1.5, -2]} scale={0.2}>
          <boxBufferGeometry />
          <meshBasicMaterial color="red" />
        </mesh>
      </Interactive>
    </group>
  )
}