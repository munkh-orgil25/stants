import { useEffect, useState } from 'react'
import { TextureLoader } from 'three'
import XRLoading from '../../../components/XRLoading'
// scenes
import First from './First'
import Second from './Second'
import Third from './Third'

export default function XRHeight({ setLocation, location }) {
  const [current, setCurrent] = useState(1)
  const [env1, setEnv1] = useState(null)
  const [env2, setEnv2] = useState(null)
  const [env3, setEnv3] = useState(null)
  const [env4, setEnv4] = useState(null)
  const [env5, setEnv5] = useState(null)
  const [env6, setEnv6] = useState(null)
  const [loading, setLoading] = useState(true)
  const textureLoader = new TextureLoader()

  useEffect(() => {
    textureLoader.load('/textures/2/color10.jpg', (texture) => {
      setEnv1(texture)
    })
    textureLoader.load('/textures/2/color8.jpg', (texture) => {
      setEnv2(texture)
    })
    textureLoader.load('/textures/2/color7.jpg', (texture) => {
      setEnv3(texture)
    })
    textureLoader.load('/textures/2/color1.jpg', (texture) => {
      setEnv4(texture)
    })
    textureLoader.load('/textures/2/color2.jpg', (texture) => {
      setEnv5(texture)
    })
    textureLoader.load('/textures/2/color9.jpg', (texture) => {
      setEnv6(texture)
    })
  }, [])

  useEffect(() => {
    if (env1 && env2 && env3 && env4 && env5 && env6) {
      setLoading(false)
    }
  }, [env1, env2, env3, env4, env5, env6])

  if (loading) {
    return <XRLoading />
  }

  return (
    <>
      <First visible={current === 1} env={env1} setCurrent={setCurrent} />
      <Second visible={current === 2} env={env2} setCurrent={setCurrent} />
      <Third visible={current === 3} env={env3} setCurrent={setCurrent} />
    </>
  )
}
