import { Interactive, useXR } from '@react-three/xr'
import { useState, useEffect } from 'react'
import {
  a,
  config,
  useChain,
  useSpring,
  useSpringRef,
} from '@react-spring/three'
import { BackSide } from 'three'
import HoverButton from '../../../components/HoverButton'
import InfoText from '../../../components/InfoText'
import FinalResult from '../../../components/FinalResult'
import Quiz from '../../../components/Quiz'
import NavBar from '../../../components/NavBar'

const questions = [
  {
    id: 1,
    question:
      'Аюулын эрсдлийг бууруулах аргуудын хэддүгээрт хувийн хамгаалах хэрэгсэл ордог вэ?',
    correct: 3,
    answers: [
      {
        id: 1,
        text: '3-рт',
      },
      {
        id: 2,
        text: '1-рт',
      },
      {
        id: 3,
        text: '5-рт',
      },
    ],
  },
  {
    id: 2,
    question:
      'Хувийн хамгаалах хэрэгслүүд дундаас гуравыг сонго гэвэл та юу юуг сонгох вэ?',
    correct: 1,
    answers: [
      { text: 'Нүд, толгой, гар хамгаалах хэрэгслүүд', id: 1 },
      { text: 'Толгой, амьсгал, гар хамгаалах хэрэгслүүд', id: 2 },
      { text: 'Сонсгол, гар, толгой хамгаалах хэрэгслүүд', id: 3 },
    ],
  },
  {
    id: 3,
    question: 'Толгой хамгаалах хэрэгслийн бат бэх байдлыг хэрхэн шалгадаг вэ?',
    correct: 2,
    answers: [
      {
        text: '1 метр өндрөөс 5 кг ачааг 2 удаа унагаж',
        id: 1,
      },
      {
        text: '2 метр өндрөөс 4 кг ачааг 2 удаа  унагаж',
        id: 2,
      },
      {
        text: '3 метр өндрөөс 2кг ачааг 1 удаа унагаж',
        id: 3,
      },
    ],
  },
]

export default function First({ env, setCurrent, visible, setMenu }) {
  const { player } = useXR()
  const [animate, setAnimate] = useState(true)
  const [infoVisible, setInfoVisible] = useState(false)

  const { menuScale, pos } = useSpring({
    menuScale: animate ? 1 : 0,
    pos: animate ? [0, 0, -1.5] : [0, -10, -2],
  })

  const handleNext = () => {
    setAnimate(false)
  }

  const scaleApi = useSpringRef()
  const { scale } = useSpring({
    ref: scaleApi,
    config: config.slow,
    from: { scale: animate ? 5 : 20 },
    to: { scale: animate ? 20 : 5 },
  })

  const opacityApi = useSpringRef()
  const { opacity } = useSpring({
    ref: opacityApi,
    config: config.slow,
    from: { opacity: 1 },
    to: { opacity: animate ? 1 : 0 },
    onChange: () => {
      if (opacity.get() < 0.25 && !animate) {
        setCurrent(2)
      }
    },
  })

  // OJBECTS
  useChain(animate ? [opacityApi, scaleApi] : [scaleApi, opacityApi], [0, 0.4])

  useEffect(() => {
    if (visible) {
      player.position.set(0, -1.2, 0)
      setAnimate(true)
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
    <group visible={visible}>
      {/* BG */}
      <a.mesh
        scale={scale}
        material-opacity={opacity}
        position={[0, 0, 0]}
        rotation={[0, 1.5, 0]}
      >
        <sphereGeometry />
        <meshBasicMaterial map={env} transparent side={BackSide} />
      </a.mesh>

      <Interactive onSelect={() => setInfoVisible(false)}>
        <InfoText
          visible={infoVisible}
          onClick={() => setInfoVisible(false)}
          scale={1}
          position={[0, 0.6, -2]}
          rotation={[0, 0, 0]}
          title="Хувийн хамгаалах хэрэгсэл"
          text="Нэг бүрийн хувийн хамгаалах хэрэгсэл нь стандартын шаардлага хангасан байх ба түүнийг бүрэн зөв хэрэглэж байх ёстой."
        />
      </Interactive>

      {/* Quiz */}
      <HoverButton
        position={[2, -0.5, -2.5]}
        rotation={[0, 0, 0]}
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
        onClick={() => setShowFinal(false)}
        score={first + second + third}
        limit={1}
        retry={() => {
          setShowFinal(false)
          setFinished(false)
          setActiveQuiz(1)
          setFirst(0)
          setSecond(0)
          setThird(0)
        }}
        next={handleNext}
      />

      {/* OVERLAY */}
      <a.mesh scale={3.5} material-opacity={styles.overlay}>
        <sphereBufferGeometry />
        <meshBasicMaterial transparent color="#282828" side={BackSide} />
      </a.mesh>

      <NavBar
        pos={pos}
        scale={menuScale}
        onNext={handleNext}
        onInfo={() => setInfoVisible(true)}
        onMenu={setMenu}
        type={1}
      />
    </group>
  )
}
