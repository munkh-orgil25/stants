export default function XRCard({ bgMap, iconMap, position, text, onClick }) {
  return (
    <group position={position} onClick={onClick}>
      <mesh>
        <planeGeometry args={[1, 0.676]} />
        <meshBasicMaterial
          color="#00375b"
          transparent
          alphaTest={0.1}
          alphaMap={bgMap}
        />
        {text}
        <mesh scale={0.25} position={[0, 0.1, 0.001]}>
          <planeGeometry />
          <meshBasicMaterial
            map={iconMap}
            transparent
            alphaTest={0.1}
            color="#ffffff"
          />
        </mesh>
      </mesh>
    </group>
  )
}
