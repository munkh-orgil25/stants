import { Text, useTexture } from '@react-three/drei'
import { Interactive, useXR } from '@react-three/xr'
import React, { useEffect } from 'react'
import { BackSide } from 'three'
import XRCard from '../components/XRCard'

export default function XRMenu({ setLocation }) {
  const envMap = useTexture('/textures/menu/env.jpg')
  const cardBg = useTexture('/textures/menu/cardAlpha.png')
  const icon1 = useTexture('/textures/menu/1.png')
  const icon2 = useTexture('/textures/menu/2.png')
  const icon3 = useTexture('/textures/menu/3.png')
  const icon4 = useTexture('/textures/menu/4.png')
  const icon5 = useTexture('/textures/menu/5.png')
  const icon6 = useTexture('/textures/menu/6.png')
  const { player } = useXR()

  useEffect(() => {
    player.position.set(0, 0, 0)
  }, [])

  return (
    <group>
      <mesh scale={20} rotation={[0, -1.75, 0]}>
        <sphereGeometry />
        <meshBasicMaterial side={BackSide} map={envMap} />
      </mesh>

      {/* LINKS */}
      {/* <group position={[0, 0, 0]} rotation={[0, -2.2, 0]}> */}
      <Interactive onSelect={() => setLocation(`/xr/1`)}>
        <XRCard
          onClick={() => setLocation(`/xr/1`)}
          position={[-1.2, 1.75, -2]}
          bgMap={cardBg}
          iconMap={icon1}
          text={
            <Text
              position={[0.05, -0.1, 0.1]}
              color="#282828"
              fontSize={0.05}
              anchorX="center"
              anchorY="middle"
              font="/fonts/nunito.ttf"
              outlineColor="#282828"
              outlineWidth={0.002}
              maxWidth={0.6}
            >
              ХАЛТИРЖ УНАХ
            </Text>
          }
        />
      </Interactive>
      <Interactive onSelect={() => setLocation(`/xr/2`)}>
        <XRCard
          onClick={() => setLocation(`/xr/2`)}
          position={[0, 1.75, -2]}
          bgMap={cardBg}
          iconMap={icon2}
          text={
            <Text
              position={[0, -0.1, 0.1]}
              color="#282828"
              fontSize={0.05}
              anchorX="center"
              anchorY="middle"
              font="/fonts/nunito.ttf"
              outlineColor="#282828"
              outlineWidth={0.002}
              maxWidth={0.6}
            >
              ЦАХИЛГААНЫ ТАСЛАХ
            </Text>
          }
        />
      </Interactive>
      <Interactive onSelect={() => setLocation(`/xr/3`)}>
        <XRCard
          onClick={() => setLocation(`/xr/3`)}
          position={[1.2, 1.75, -2]}
          bgMap={cardBg}
          iconMap={icon3}
          text={
            <Text
              position={[-0.05, -0.1, 0.1]}
              color="#282828"
              fontSize={0.05}
              anchorX="center"
              anchorY="middle"
              font="/fonts/nunito.ttf"
              outlineColor="#282828"
              outlineWidth={0.002}
              maxWidth={0.6}
            >
              БАГАЖ ХЭРЭГСЭЛ
            </Text>
          }
        />
      </Interactive>
      <Interactive onSelect={() => setLocation(`/xr/4`)}>
        <XRCard
          onClick={() => setLocation(`/xr/4`)}
          position={[-1.2, 1, -2]}
          bgMap={cardBg}
          iconMap={icon4}
          text={
            <Text
              position={[0.05, -0.1, 0.1]}
              color="#282828"
              fontSize={0.05}
              anchorX="center"
              anchorY="middle"
              font="/fonts/nunito.ttf"
              outlineColor="#282828"
              outlineWidth={0.002}
              maxWidth={0.6}
            >
              ОСОЛ АВААР
            </Text>
          }
        />
      </Interactive>
      <Interactive onSelect={() => setLocation(`/xr/5`)}>
        <XRCard
          onClick={() => setLocation(`/xr/5`)}
          position={[0, 1, -2]}
          bgMap={cardBg}
          iconMap={icon5}
          text={
            <>
              <Text
                position={[0, -0.1, 0.1]}
                color="#282828"
                fontSize={0.05}
                anchorX="center"
                anchorY="middle"
                font="/fonts/nunito.ttf"
                outlineColor="#282828"
                outlineWidth={0.002}
                maxWidth={0.6}
              >
                ӨНДӨР ШАТ ТАВЦАН
              </Text>
              <Text
                position={[0, -0.165, 0.1]}
                color="#282828"
                fontSize={0.05}
                anchorX="center"
                anchorY="middle"
                font="/fonts/nunito.ttf"
                outlineColor="#282828"
                outlineWidth={0.002}
                maxWidth={0.6}
              >
                ДЭЭР АЖИЛЛАХ
              </Text>
            </>
          }
        />
      </Interactive>
      <Interactive onSelect={() => setLocation(`/xr/6`)}>
        <XRCard
          onClick={() => setLocation(`/xr/6`)}
          position={[1.2, 1, -2]}
          bgMap={cardBg}
          iconMap={icon6}
          text={
            <Text
              position={[-0.05, -0.1, 0.1]}
              color="#282828"
              fontSize={0.05}
              anchorX="center"
              anchorY="middle"
              font="/fonts/nunito.ttf"
              outlineColor="#282828"
              outlineWidth={0.002}
              maxWidth={0.6}
            >
              ДАРАЛТАТ САВ
            </Text>
          }
        />
      </Interactive>
      {/* </group> */}
    </group>
  )
}
