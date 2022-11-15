import React, { useEffect, useState } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import HoverButton from '../../../components/HoverButton'
import FinalResult from '../../../components/FinalResult'
import Quiz from '../../../components/Quiz'
import NavBar from '../../../components/NavBar'

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
  const failAudio = new Audio('/audio/fail.mp3')
  const correctAudio = new Audio('/audio/correct.mp3')
  const [show, setShow] = useState(false)
  const [spring, api] = useSpring(() => ({
    from: { scale: 41, objScale: 0.1, opacity: 0 },
  }))

  const { scale, pos } = useSpring({
    scale: show ? 1 : 0,
    pos: show ? [0, 0, -1.5] : [0, -10, -2],
  })

  const handleMenu = () => {
    setShow(false)
    setMenu()
  }

  const handlePrev = () => {
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

  const styles = useSpring({
    overlay: showFinal ? 0.45 : 0,
  })

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
        onMenu={handleMenu}
        type={3}
      />
    </group>
  )
}
