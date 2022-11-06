import { useEffect, useState } from 'react'
import { TextureLoader } from 'three'
import XRLoading from '../../../components/XRLoading'
// scenes
import First from './First'
import Second from './Second'
import Third from './Third'
import Fourth from './Fourth'
import Fifth from './Fifth'
import Sixth from './Sixth'
import Seventh from './Seventh'
import Eighth from './Eighth'
import Ninth from './Ninth'
import Tenth from './Tenth'

export default function XRSafety({ setLocation, location }) {
  const [current, setCurrent] = useState(2)
  const [env1, setEnv1] = useState(null)
  const [env2, setEnv2] = useState(null)
  const [env3, setEnv3] = useState(null)
  const [env4, setEnv4] = useState(null)
  const [env5, setEnv5] = useState(null)
  const [env6, setEnv6] = useState(null)
  const [env7, setEnv7] = useState(null)
  const [env8, setEnv8] = useState(null)
  const [env9, setEnv9] = useState(null)
  const [env10, setEnv10] = useState(null)
  const [loading, setLoading] = useState(true)
  const textureLoader = new TextureLoader()

  useEffect(() => {
    textureLoader.load('/textures/4/1.png', (texture) => {
      setEnv1(texture)
    })
    textureLoader.load('/textures/4/2.png', (texture) => {
      setEnv2(texture)
    })
    textureLoader.load('/textures/4/3.png', (texture) => {
      setEnv3(texture)
    })
    textureLoader.load('/textures/4/4.png', (texture) => {
      setEnv4(texture)
    })
    textureLoader.load('/textures/4/5.png', (texture) => {
      setEnv5(texture)
    })
    textureLoader.load('/textures/4/6.png', (texture) => {
      setEnv6(texture)
    })
    textureLoader.load('/textures/4/7.png', (texture) => {
      setEnv7(texture)
    })
    textureLoader.load('/textures/4/8.png', (texture) => {
      setEnv8(texture)
    })
    textureLoader.load('/textures/4/9.png', (texture) => {
      setEnv9(texture)
    })
    textureLoader.load('/textures/4/10.png', (texture) => {
      setEnv10(texture)
    })
    textureLoader.load('/textures/4/1.png', (texture) => {
      setEnv1(texture)
    })
    textureLoader.load('/textures/4/2.png', (texture) => {
      setEnv2(texture)
    })
  }, [])

  useEffect(() => {
    if (
      env1 &&
      env2 &&
      env3 &&
      env4 &&
      env5 &&
      env6 &&
      env7 &&
      env8 &&
      env9 &&
      env10
    ) {
      setLoading(false)
    }
  }, [env1, env2, env3, env4, env5, env6, env7, env8, env9, env10])

  if (loading) {
    return <XRLoading />
  }

  return (
    <>
      <First visible={current === 1} env={env1} setCurrent={setCurrent} />
      <Second visible={current === 2} env={env2} setCurrent={setCurrent} />
      <Third visible={current === 3} env={env3} setCurrent={setCurrent} />
      <Fourth visible={current === 4} env={env4} setCurrent={setCurrent} />
      <Fifth visible={current === 5} env={env5} setCurrent={setCurrent} />
      <Sixth visible={current === 6} env={env6} setCurrent={setCurrent} />
      <Seventh visible={current === 7} env={env7} setCurrent={setCurrent} />
      <Eighth visible={current === 8} env={env8} setCurrent={setCurrent} />
      <Ninth visible={current === 9} env={env9} setCurrent={setCurrent} />
      <Tenth visible={current === 10} env={env10} setCurrent={setCurrent} />
    </>
  )
}
