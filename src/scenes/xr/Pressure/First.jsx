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
import Result from '../../../components/Result'
import FinalResult from '../../../components/FinalResult'
import Quiz from '../../../components/Quiz'

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

export default function First({ env, setCurrent, visible }) {
  const { player } = useXR()
  const [animate, setAnimate] = useState(true)
  const [infoVisible, setInfoVisible] = useState(false)

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

      {/* INFO */}
      <HoverButton
        position={[-1.5, -0.5, -2.5]}
        rotation={[0, 0.5, 0]}
        scale={0.2}
        text="Унших"
        onClick={() => setInfoVisible(true)}
      />
      <Interactive onSelect={() => setInfoVisible(false)}>
        <InfoText
          visible={infoVisible}
          onClick={() => setInfoVisible(false)}
          scale={1}
          position={[0, 0.6, -2]}
          rotation={[0, 0, 0]}
          title="Өндөрт шат тавцан дээр ажиллах"
          text="Нэг бүрийн хувийн хамгаалах хэрэгсэл нь стандартын шаардлага хангасан байх ба түүнийг бүрэн зөв хэрэглэж байх ёстой."
        />
      </Interactive>

      {/* Quiz */}
      <HoverButton
        position={[1.5, -0.5, -2.5]}
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
        next={handleNext}
      />

      {/* OVERLAY */}
      <a.mesh scale={2.5} material-opacity={styles.overlay} visible={answered}>
        <sphereBufferGeometry />
        <meshBasicMaterial transparent color="#282828" side={BackSide} />
      </a.mesh>

      {/* TP */}
      <Interactive onSelect={handleNext}>
        <HoverButton
          arrow
          position={[0, 0, -2.5]}
          rotation={[0, -0.5, 0]}
          scale={0.2}
          text="Шилжих"
          onClick={handleNext}
        />
      </Interactive>
    </group>
  )
}
