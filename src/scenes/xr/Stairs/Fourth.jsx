import { Interactive, useXR } from '@react-three/xr'
import { useState, useEffect } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import HoverButton from '../../../components/HoverButton'
import Quiz from '../../../components/Quiz'
import Result from '../../../components/Result'
import FinalResult from '../../../components/FinalResult'

const questions = [
  {
    id: 1,
    question:
      'Ажилд орохдоо гар багаж сонгож авахдаа та ямар шаардлага тавих вэ?',
    correct: 1,
    answers: [
      {
        id: 1,
        text: 'Туршигдаж баталгаажсан, бүрэн бүтэн, ажилд тохирсон',
      },
      {
        id: 2,
        text: 'Эвдрэл гэмтэлгүй, чанартай, тусгаарлагчтай',
      },
      {
        id: 3,
        text: 'Эдэлгээнд ороогүй, гэмтэлгүй, туршигдсан',
      },
    ],
  },
  {
    id: 2,
    question:
      'Цахилгаан гар багажаар ажил гүйцэтгэх ажилтан ямар хамгаалах хэрэгсэл хэрэглэх вэ?',
    correct: 3,
    answers: [
      {
        text: 'Нүүрний хаалт, ажлын бээлий , ажлын хувцас, чихний бөглөөс',
        id: 1,
      },
      {
        text: 'Нүдний шил, чихний бөглөөс, резинэн бээлий, ажлын хувцас',
        id: 2,
      },
      {
        text: 'Ажлын хувцас, гутал, тусгай бээлий, нүдний шил, толгойн хамгаалалт',
        id: 3,
      },
    ],
  },
  {
    id: 3,
    question:
      'Тоног төхөөрөмж дээр ажиллаж байгаа ажилтан багаж хэрэгсэлээ хэрхэн авч явах вэ?',
    correct: 3,
    answers: [
      {
        text: 'Ажлын хувцасны халаасанд хийж товчилсон байх.',
        id: 1,
      },
      {
        text: 'Барьж очин тоноглолоос зайтай тавих',
        id: 2,
      },
      {
        text: 'Цүнхэнд хийсэн байх',
        id: 3,
      },
    ],
  },
]

export default function Fourth({ env, setCurrent, visible }) {
  const { player } = useXR()
  const [show, setShow] = useState(false)
  const [spring, api] = useSpring(() => ({
    from: { scale: 40, objScale: 0, opacity: 0 },
  }))

  const handlePrev = () => {
    api.start({
      from: { scale: 20, opacity: 1, objScale: 0.1 },
      to: { scale: 40, opacity: 0, objScale: 0 },
      config: config.slow,
      onChange: () => {
        if (spring.opacity.get() < 0.3) {
          setShow(false)
          setCurrent(3)
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
        rotation={[0, 0.1, 0]}
      >
        <sphereGeometry />
        <meshBasicMaterial side={BackSide} map={env} transparent />
      </a.mesh>

      <HoverButton
        position={[2.5, -0.5, -1]}
        rotation={[0, -1, 0]}
        scale={0.15}
        text="Багаж хэрэглэх үеийн хамгаалах хэрэгсэл"
        long
        onClick={() => {}}
      />

      <HoverButton
        position={[-1, -0.5, 3]}
        rotation={[0, -3, 0]}
        scale={0.15}
        text="Жижиг гар багажны тавцан"
        long
        onClick={() => {}}
      />

      <HoverButton
        position={[0, -0.5, -3]}
        rotation={[0, 0, 0]}
        scale={0.15}
        text="Механик гар багаж"
        long
        onClick={() => {}}
      />

      <HoverButton
        position={[2, -0.5, 2]}
        rotation={[0, -2, 0]}
        scale={0.15}
        text="Цахилгаан гар багаж"
        long
        arrow
        onClick={() => {}}
      />

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

      {/* TP */}
      <Interactive onSelect={handlePrev}>
        <HoverButton
          arrow
          position={[3, -0.5, 0.5]}
          rotation={[0, -1.5, 0]}
          scale={0.15}
          text="Буцах"
          onClick={handlePrev}
        />
      </Interactive>
    </group>
  )
}
