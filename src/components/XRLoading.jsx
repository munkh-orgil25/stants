import { useXR } from '@react-three/xr'
import { useEffect, useRef, useState } from 'react'
import { BackSide, DoubleSide } from 'three'
import { a, useTrail } from '@react-spring/three'
import { Text } from '@react-three/drei'

function XRLoading() {
  const ref = useRef()
  const [animate, setAnimate] = useState(false)

  const trails = useTrail(3, {
    opacity: animate ? 0.8 : 0.4,
    onRest: () => setAnimate(!animate),
  })

  return (
    <group>
      <mesh scale={100}>
        <sphereBufferGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#000" side={BackSide} />
      </mesh>

      <group
        ref={ref}
        position={[0, 0, -3]}
        rotation={[0, 0, Math.PI * 0.5]}
        scale={0.1}
      >
        {trails.map((styles, index) => (
          <a.mesh
            position={[0, index * 3 - 3, 0]}
            material-opacity={styles.opacity}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            <sphereBufferGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color="#fff" transparent />
          </a.mesh>
        ))}
      </group>
    </group>
  )
}

export default XRLoading
