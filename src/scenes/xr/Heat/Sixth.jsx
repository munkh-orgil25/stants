import React, { useEffect, useState } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import { useXR } from '@react-three/xr'
import HoverButton from '../../../components/HoverButton'
import FinalResult from '../../../components/FinalResult'
import Quiz from '../../../components/Quiz'
import NavBar from '../../../components/NavBar'

const questions = [
  {
    id: 1,
    question:
      'Үйлдвэрийн байр талбайн шат тавцангаар явах үедээ та хэдэн цэгийн дүрэм мөрдөж явах ёстой бэ?',
    correct: 3,
    answers: [
      {
        id: 1,
        text: '1 ба 2 цэг',
      },
      {
        id: 2,
        text: '2 ба 3 цэг',
      },
      {
        id: 3,
        text: '3 ба 4 цэг',
      },
    ],
  },
  {
    id: 2,
    question:
      'Шат тавцан дээр ус, тос асгарсан хальтарч унах аюултай байвал та ямар үйлдэл хийх бэ?',
    correct: 2,
    answers: [
      { text: 'Аюулыг тойрч явна', id: 1 },
      { text: 'Зургаан баримтжуулан аюулыг мэдээлж устгуулна', id: 2 },
      { text: 'Холбогдох ИТА нарт мэдэгдэнэ', id: 3 },
    ],
  },
  {
    id: 3,
    question:
      'Үйлдвэрийн байранд шугам хоолой, хаалтнаас уур үлээсэн, ус алдсан аюулд ямар арга хэмжээ авах бэ?',
    correct: 2,
    answers: [
      {
        text: 'Өөрөө түлэгдэхгүйн тулд тойрч гарна.',
        id: 1,
      },
      {
        text: 'Шуурхайн ажиллагааны хяналт мэдээллийн системийн дагуу холбогдох удирдлагад нь мэдэгдэж хамгаалах ЗОН татуулна',
        id: 2,
      },
      {
        text: 'Цех, нэгжийнхээ ажилчдад анхааруулж хэлнэ',
        id: 3,
      },
    ],
  },
]

export default function Sixth({ env, setCurrent, visible, setMenu }) {
  const { player } = useXR()
  const [show, setShow] = useState(false)
  const [spring, api] = useSpring(() => ({
    from: { scale: 41, objScale: 0.1, opacity: 0 },
  }))

  const { scale, pos } = useSpring({
    scale: show ? 1 : 0,
    pos: show ? [0, 0, -1.5] : [0, -10, -2],
  })

  const handlePrev = () => {
    api.start({
      from: { scale: 20, opacity: 1, objScale: 0.1 },
      to: { scale: 40, opacity: 0, objScale: 0 },
      config: config.slow,
      onChange: () => {
        if (spring.opacity.get() < 0.3) {
          setShow(false)
          setCurrent(5)
        }
      },
    })
  }

  useEffect(() => {
    if (visible) {
      setShow(true)
      player.position.set(0, -1.2, 0)
      api.start({
        to: { scale: 20, objScale: 0.1, opacity: 1 },
        config: config.slow,
      })
    } else {
      setShow(false)
    }
  }, [visible])

  // QUIZ
  const [activeQuiz, setActiveQuiz] = useState(0)

  // SCORES
  const [first, setFirst] = useState(0)
  const [second, setSecond] = useState(0)
  const [third, setThird] = useState(0)

  const [finished, setFinished] = useState(false)
  const [showFinal, setShowFinal] = useState(false)

  const failAudio = new Audio('/audio/fail.mp3')
  const correctAudio = new Audio('/audio/correct.mp3')

  const styles = useSpring({
    overlay: showFinal ? 0.45 : 0,
  })

  const openQuiz = () => {
    if (!finished) {
      setActiveQuiz(1)
    } else {
      setShowFinal(true)
    }
  }

  useEffect(() => {
    if (showFinal) {
      const total = first + second + third
      if (total > 1) {
        correctAudio.play()
      } else {
        failAudio.play()
      }
    }
  }, [showFinal])

  return (
    <group visible={show}>
      <a.mesh
        scale={spring.scale}
        material-opacity={spring.opacity}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      >
        <sphereGeometry />
        <meshBasicMaterial side={BackSide} map={env} transparent />
      </a.mesh>

      {/* Quiz */}
      <HoverButton
        position={[-1.7, -0.5, -2.4]}
        rotation={[0, 0.25, 0]}
        scale={0.2}
        text="Шалгах"
        onClick={openQuiz}
      />
      <Quiz
        quiz={questions[0]}
        visible={questions[0].id === activeQuiz}
        onNext={() => setActiveQuiz(2)}
        setCorrect={() => setFirst(1)}
      />
      <Quiz
        quiz={questions[1]}
        visible={questions[1].id === activeQuiz}
        onNext={() => setActiveQuiz(3)}
        setCorrect={() => setSecond(1)}
      />
      <Quiz
        quiz={questions[2]}
        visible={questions[2].id === activeQuiz}
        onNext={() => {
          setActiveQuiz(0)
          setFinished(true)
          setShowFinal(true)
        }}
        setCorrect={() => setThird(1)}
      />

      <FinalResult
        position={[0, 1, -2]}
        scale={1}
        visible={showFinal}
        onClick={() => {
          setShowFinal(false)
          failAudio.pause()
          correctAudio.pause()
        }}
        limit={1}
        score={first + second + third}
        retry={() => {
          setShowFinal(false)
          setFinished(false)
          setActiveQuiz(1)
          setFirst(0)
          setSecond(0)
          setThird(0)
        }}
        next={handlePrev}
      />

      {/* OVERLAY */}
      <a.mesh scale={3.5} material-opacity={styles.overlay} visible>
        <sphereBufferGeometry />
        <meshBasicMaterial transparent color="#282828" side={BackSide} />
      </a.mesh>

      <NavBar
        pos={pos}
        scale={scale}
        onPrev={handlePrev}
        onMenu={setMenu}
        type={3}
      />
    </group>
  )
}
