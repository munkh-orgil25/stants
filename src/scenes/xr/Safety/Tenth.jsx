import React, { useEffect, useRef, useState } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import { Interactive, useXR } from '@react-three/xr'
import HoverButton from '../../../components/HoverButton'
import FinalResult from '../../../components/FinalResult'
import Result from '../../../components/Result'
import Quiz from '../../../components/Quiz'
import MenuBar from '../../../components/MenuBar'

const questions = [
  {
    id: 1,
    question:
      'Үйлдвэр дотор байрлах чанга яригчаар Аваар болсон талаар зарласан үед ямар үйлдэл хийх бэ?',
    correct: 2,
    answers: [
      {
        id: 1,
        text: 'Хамгийн түрүүнд үйлдвэрийн байрнаас гүйж гаран зуглах цэгт цуглана.',
      },
      {
        id: 2,
        text: 'Тайван байж үйлдвэрийн дотор байрлах ГАРЦ гэсэн тэмдэг, тэмдэглэгээг даган явж хамгийн ойр байрлах цуглан цэгт цуглана',
      },
      {
        id: 3,
        text: 'Хийж байгаа ажлаа дуусгаад удирдлагаас ирэх шийдвэрийг хүлээнэ ',
      },
    ],
  },
  {
    id: 2,
    question: 'Аваар болон гамшиг болсон үед та ямар үүрэгтэй оролцдог бэ?',
    correct: 3,
    answers: [
      { text: 'Аврах, сэргээн босгох бүлгэм', id: 1 },
      { text: 'Зарлан мэдээлэх буюу мэдээл хариуцсан бүлгэм', id: 2 },
      {
        text: 'Гэх мэт бүлгэмүүдэд хуваарилагдаж тус тусын үүрэг гүйцэтгэнэ.',
        id: 3,
      },
    ],
  },
  {
    id: 3,
    question:
      'Үйлдвэрийн байранд унхаан алдсан хүнтэй тааралдвал ямар арга хэмжээ авах бэ?',
    correct: 2,
    answers: [
      {
        text: 'Аваарын бага эмч яаралтай дуудаж иртэл нь хамт байна',
        id: 1,
      },
      {
        text: 'Аваарын бага эмч яаралтай дуудаж, амьсгалгүй байвал амьсгалын замыг чөлөөлж хиймэл амьсгал, зүрхний иллэг хийнэ',
        id: 2,
      },
      {
        text: 'Аваарын бага эмж иртэл ойр орчимд туслах боломжтой хүмүүсийг дуудна',
        id: 3,
      },
    ],
  },
]

export default function Tenth({ env, setCurrent, visible, setMenu }) {
  const [show, setShow] = useState(false)
  const [spring, api] = useSpring(() => ({
    from: { scale: 41, objScale: 0.1, opacity: 0 },
  }))

  const { player } = useXR()
  const menuRef = useRef()
  const handleMenu = () => {
    player.children[0].remove(menuRef.current)
    setMenu()
  }
  const { scale, pos } = useSpring({
    scale: show ? 1 : 0,
    pos: show ? [0, 0, -1.5] : [0, -10, -2],
  })

  const handlePrev = () => {
    player.children[0].remove(menuRef.current)
    api.start({
      from: { scale: 20, opacity: 1, objScale: 0.1 },
      to: { scale: 40, opacity: 0, objScale: 0 },
      config: config.slow,
      onChange: () => {
        if (spring.opacity.get() < 0.3) {
          setShow(false)
          setCurrent(9)
        }
      },
    })
  }

  useEffect(() => {
    if (visible) {
      setShow(true)
      api.start({
        to: { scale: 20, objScale: 0.1, opacity: 1 },
        config: config.slow,
      })
    } else {
      setShow(false)
      if (menuRef.current) {
        player.children[0].remove(menuRef.current)
      }
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

      <MenuBar
        pos={pos}
        scale={scale}
        onPrev={handlePrev}
        onMenu={handleMenu}
        ref={menuRef}
        type={3}
      />
    </group>
  )
}
