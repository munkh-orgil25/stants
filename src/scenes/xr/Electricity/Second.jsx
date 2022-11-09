import { useXR } from '@react-three/xr'
import { useState, useEffect, useRef } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import HoverButton from '../../../components/HoverButton'
import Result from '../../../components/Result'
import Quiz from '../../../components/Quiz'
import FinalResult from '../../../components/FinalResult'
import MenuBar from '../../../components/MenuBar'

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
  const [show, setShow] = useState(false)
  const [spring, api] = useSpring(() => ({
    from: { scale: 40, objScale: 0, opacity: 0 },
  }))
  const { player } = useXR()
  const menuRef = useRef()
  const handleMenu = () => {
    player.children[0].remove(menuRef.current)
    setMenu()
  }
  const { scale } = useSpring({
    scale: show ? 1 : 0,
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
          setCurrent(1)
        }
      },
    })
  }

  const handleNext = () => {
    player.children[0].remove(menuRef.current)
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
    if (activeQuiz === 5) {
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
      if (menuRef.current) {
        player.children[0].remove(menuRef.current)
      }
    }
  }

  useEffect(() => {
    if (visible) {
      player.children[0].add(menuRef.current)
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
        retry={() => {
          setShowFinal(false)
          setFinished(false)
          setActiveQuiz(1)
          setScore(0)
        }}
        next={handleNext}
      />

      {/* OVERLAY */}
      <a.mesh scale={2.5} material-opacity={styles.overlay} visible={answered}>
        <sphereBufferGeometry />
        <meshBasicMaterial transparent color="#282828" side={BackSide} />
      </a.mesh>

      <MenuBar
        scale={scale}
        onPrev={handlePrev}
        onNext={handleNext}
        onMenu={handleMenu}
        ref={menuRef}
        type={2}
      />
    </group>
  )
}
