import { useEffect, useState } from 'react'
import { TextureLoader } from 'three'
import XRLoading from '../../../components/XRLoading'
// scenes
import First from './First'
import Second from './Second'

export default function XRStairs({ setLocation, location }) {
  const [current, setCurrent] = useState(1)
  const [env1, setEnv1] = useState(null)
  const [env2, setEnv2] = useState(null)
  const [loading, setLoading] = useState(true)
  const textureLoader = new TextureLoader()

  useEffect(() => {
    textureLoader.load('/textures/4/1.jpg', (texture) => {
      setEnv1(texture)
    })
    textureLoader.load('/textures/4/2.jpg', (texture) => {
      setEnv2(texture)
    })
  }, [])

  useEffect(() => {
    if (env1 && env2) {
      setLoading(false)
    }
  }, [env1, env2])

  if (loading) {
    return <XRLoading />
  }

  return (
    <>
      <First visible={current === 1} env={env1} setCurrent={setCurrent} />
      <Second visible={current === 2} env={env2} setCurrent={setCurrent} />
    </>
  )
}
