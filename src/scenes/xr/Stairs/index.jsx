import { useEffect, useState } from 'react'
import { TextureLoader } from 'three'
import XRLoading from '../../../components/XRLoading'
// scenes
import First from './First'
import Second from './Second'
import Third from './Third'
import Fourth from './Fourth'

export default function XRStairs({ setLocation, location }) {
  const [current, setCurrent] = useState(4)
  const [env1, setEnv1] = useState(null)
  const [env2, setEnv2] = useState(null)
  const [env3, setEnv3] = useState(null)
  const [env4, setEnv4] = useState(null)
  const [loading, setLoading] = useState(true)
  const textureLoader = new TextureLoader()

  useEffect(() => {
    textureLoader.load('/textures/5/1.png', (texture) => {
      setEnv1(texture)
    })
    textureLoader.load('/textures/5/2.png', (texture) => {
      setEnv2(texture)
    })
    textureLoader.load('/textures/5/3.png', (texture) => {
      setEnv3(texture)
    })
    textureLoader.load('/textures/5/4.png', (texture) => {
      setEnv4(texture)
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
      <Third visible={current === 3} env={env3} setCurrent={setCurrent} />
      <Fourth visible={current === 4} env={env4} setCurrent={setCurrent} />
    </>
  )
}
