import React, { useEffect, useState } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import { useXR } from '@react-three/xr'
import HoverButton from '../../../components/HoverButton'
import FinalResult from '../../../components/FinalResult'
import Result from '../../../components/Result'
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
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)

  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showFinal, setShowFinal] = useState(false)

  const styles = useSpring({
    overlay: answered ? 0.45 : 0,
  })

  const handleAnswer = (id) => {
    if (id === questions[activeQuiz - 1].correct) {
      setCorrect(true)
      setScore(score + 1)
      setAnswered(true)
    } else {
      setCorrect(false)
      setAnswered(true)
    }
  }

  const handleResultClick = () => {
    if (activeQuiz === 3) {
      setActiveQuiz(0)
      setFinished(true)
      setShowFinal(true)
      setAnswered(false)
    } else {
      setActiveQuiz(activeQuiz + 1)
      setAnswered(false)
    }
  }

  const openQuiz = () => {
    if (!finished) {
      setActiveQuiz(1)
    } else {
      setShowFinal(true)
    }
  }

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
      {questions.map((q) => (
        <Quiz
          position={[0, 0, -2.5]}
          rotation={[0, 0, 0]}
          scale={1.5}
          key={q.id}
          quiz={q}
          visible={q.id === activeQuiz}
          handleClick={handleAnswer}
        />
      ))}

      <Result
        position={[0, 1, -2]}
        scale={0.6}
        visible={answered}
        correct={correct}
        onClick={handleResultClick}
      />

      <FinalResult
        position={[0, 1, -2]}
        scale={1}
        visible={showFinal}
        onClick={() => setShowFinal(false)}
        score={score}
        limit={1}
        retry={() => {
          setShowFinal(false)
          setFinished(false)
          setActiveQuiz(1)
          setScore(0)
        }}
        next={handlePrev}
      />

      {/* OVERLAY */}
      <a.mesh scale={2.5} material-opacity={styles.overlay} visible={answered}>
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
