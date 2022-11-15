import { useState, useEffect } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import HoverButton from '../../../components/HoverButton'
import Quiz from '../../../components/Quiz'
import FinalResult from '../../../components/FinalResult'
import NavBar from '../../../components/NavBar'

const questions = [
  {
    id: 1,
    question: 'Хүчдэлгүй болсныг хүчдэл заагчаар хэрхэн шалгах вэ?',
    correct: 1,
    answers: [
      {
        id: 1,
        text: 'Баталгаажсан хүчдэл заагч ашиглан болгоомжтой шалгана.',
      },
      {
        id: 2,
        text: 'Хүчдэл заагч туршигдсан ба хэрэглэхийн өмнө мэдээжийн хүчдэлтэй газар шалгаж хүчдэл шалгана',
      },
      {
        id: 3,
        text: 'Туршигдаж баталгаажсан хүчдэл заагчаар үзээд хурууны араар хүрч шалгана',
      },
    ],
  },
  {
    id: 2,
    question:
      '1000В -оос дээш цахилгаан байгууламжийн хүчдлийг хүчдэл заагчаар шалгахдаа ямар хамгаалах хэрэгсэл хэрэглэх вэ?',
    correct: 2,
    answers: [
      { text: 'Резинэн бээлий', id: 1 },
      { text: 'Нүүрний хаалт', id: 2 },
      { text: 'Нүдний шил', id: 3 },
    ],
  },
  {
    id: 3,
    question: 'Зөөврийн газардуулга тавих дараалал аль нь вэ?',
    correct: 3,
    answers: [
      {
        text: 'Хүчдэл шалгаад гүйдэл дамжуулагчид газардуулга холбох, газардуулах хэсэгт холбох',
        id: 1,
      },
      {
        text: 'Хүчдэлгүй байгааг шалган гүйдэл дамжуулагчийн ойрын фазаас эхлэн холбох',
        id: 2,
      },
      {
        text: 'Газардуулах хэсэгт холбож хүчдэлгүй байгааг шалган, гүйдэл дамжуулагчид газардуулга холбох',
        id: 3,
      },
    ],
  },
  {
    id: 4,
    question:
      'Зөөврийн газардуулга тавихдаа ямар хамгаалах хэрэгсэл хэрэглэх вэ?',
    correct: 3,
    answers: [
      { text: 'Нүүрний хаалт', id: 1 },
      { text: 'Резинэн бээлий', id: 2 },
      { text: 'Нүдний шил', id: 3 },
    ],
  },
  {
    id: 5,
    question:
      'ХХБ- д таслах, залгах үйлдэл хийхдээ ямар хамгаалах хэрэгсэл хэрэглэх вэ?',
    correct: 2,
    answers: [
      { text: 'Ажлын бээлий, нүдний шил', id: 1 },
      { text: 'Зориулалтын туршсан бээлий, нүүрний хаалт', id: 2 },
      { text: 'Нүүрний хаалт, резинэн дэвсгэр', id: 3 },
    ],
  },
]

export default function Second({ env, setCurrent, visible, setMenu }) {
  const failAudio = new Audio('/audio/fail.mp3')
  const correctAudio = new Audio('/audio/correct.mp3')

  const [show, setShow] = useState(false)
  const [spring, api] = useSpring(() => ({
    from: { scale: 40, objScale: 0, opacity: 0 },
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
          setCurrent(1)
        }
      },
    })
  }

  const handleNext = () => {
    api.start({
      from: { scale: 20, opacity: 1, objScale: 0.1 },
      to: { scale: 0, opacity: 0, objScale: 0 },
      config: config.slow,
      onChange: () => {
        if (spring.opacity.get() < 0.3) {
          setShow(false)
          setCurrent(3)
        }
      },
    })
  }

  // QUIZ
  const [activeQuiz, setActiveQuiz] = useState(0)

  // SCORES
  const [first, setFirst] = useState(0)
  const [second, setSecond] = useState(0)
  const [third, setThird] = useState(0)
  const [fourth, setFourth] = useState(0)
  const [fifth, setFifth] = useState(0)

  const [finished, setFinished] = useState(false)
  const [showFinal, setShowFinal] = useState(false)

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
      const total = first + second + third + fourth + fifth
      if (total > 2) {
        correctAudio.play()
      } else {
        failAudio.play()
      }
    }
  }, [showFinal])

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

  return (
    <group visible={show}>
      <a.mesh
        scale={spring.scale}
        material-opacity={spring.opacity}
        position={[0, 0, 0]}
        rotation={[0, 1.15, 0]}
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
        onNext={() => setActiveQuiz(4)}
        setCorrect={() => setThird(1)}
      />
      <Quiz
        quiz={questions[3]}
        visible={questions[3].id === activeQuiz}
        onNext={() => setActiveQuiz(5)}
        setCorrect={() => setFourth(1)}
      />
      <Quiz
        quiz={questions[4]}
        visible={questions[4].id === activeQuiz}
        onNext={() => {
          setActiveQuiz(0)
          setFinished(true)
          setShowFinal(true)
        }}
        setCorrect={() => setFifth(1)}
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
        score={first + second + third + fourth + fifth}
        retry={() => {
          setShowFinal(false)
          setFinished(false)
          setActiveQuiz(1)
          setFirst(0)
          setSecond(0)
          setThird(0)
          setFourth(0)
          setFifth(0)
        }}
        next={handleNext}
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
        onNext={handleNext}
        onMenu={setMenu}
        type={2}
      />
    </group>
  )
}
