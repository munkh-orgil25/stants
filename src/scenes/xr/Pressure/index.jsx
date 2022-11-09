import { useEffect, useState } from 'react'
import { TextureLoader } from 'three'
import XRLoading from '../../../components/XRLoading'
// scenes
import First from './First'
import Second from './Second'

export default function XRPressure({ setLocation }) {
  const [current, setCurrent] = useState(1)
  const [env1, setEnv1] = useState(null)
  const [loading, setLoading] = useState(true)
  const textureLoader = new TextureLoader()

  const setMenu = () => setLocation('/xr/menu')

  useEffect(() => {
    textureLoader.load('/textures/6/1.png', (texture) => {
      setEnv1(texture)
    })
  }, [])

  useEffect(() => {
    if (env1) {
      setLoading(false)
    }
  }, [env1])

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
        setCurrent={setCurrent}
        setMenu={setMenu}
      />
    </>
  )
}
