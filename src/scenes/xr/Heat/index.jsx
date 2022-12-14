import { useEffect, useState } from 'react'
import { TextureLoader } from 'three'
import XRLoading from '../../../components/XRLoading'
// scenes
import First from './First'
import Fourth from './Fourth'
import Fifth from './Fifth'
import Second from './Second'
import Sixth from './Sixth'
import Third from './Third'

export default function XRHeat({ setLocation }) {
  const [audio] = useState(new Audio('/audio/noise.mp3'))

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
    if (audio) {
      audio.loop = true
      audio.play()
    }
  }, [audio])

  const setMenu = () => {
    setLocation('/xr/menu')
    audio.pause()
  }

  useEffect(() => {
    textureLoader.load('/textures/3/1.jpg', (texture) => {
      setEnv1(texture)
    })
    textureLoader.load('/textures/3/2.jpg', (texture) => {
      setEnv2(texture)
    })
    textureLoader.load('/textures/3/3.jpg', (texture) => {
      setEnv3(texture)
    })
    textureLoader.load('/textures/3/4.jpg', (texture) => {
      setEnv4(texture)
    })
    textureLoader.load('/textures/3/5.jpg', (texture) => {
      setEnv5(texture)
    })
    textureLoader.load('/textures/3/6.jpg', (texture) => {
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
      <First
        visible={current === 1}
        env={env1}
        setCurrent={setCurrent}
        setMenu={setMenu}
      />
      <Second
        visible={current === 2}
        env={env2}
        setCurrent={setCurrent}
        setMenu={setMenu}
      />
      <Third
        visible={current === 3}
        env={env3}
        setCurrent={setCurrent}
        setMenu={setMenu}
      />
      <Fourth
        visible={current === 4}
        env={env4}
        setCurrent={setCurrent}
        setMenu={setMenu}
      />
      <Fifth
        visible={current === 5}
        env={env5}
        setCurrent={setCurrent}
        setMenu={setMenu}
      />
      <Sixth
        visible={current === 6}
        env={env6}
        setCurrent={setCurrent}
        setMenu={setMenu}
      />
    </>
  )
}
