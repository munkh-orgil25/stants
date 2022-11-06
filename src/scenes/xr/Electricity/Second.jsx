import { Interactive } from '@react-three/xr'
import { useState, useEffect } from 'react'
import { a, config, useSpring } from '@react-spring/three'
import { BackSide } from 'three'
import HoverButton from '../../../components/HoverButton'
import Result from '../../../components/Result'
import Quiz from '../../../components/Quiz'
import FinalResult from '../../../components/FinalResult'

const questions = [
  {
    id: 1,
    question: 'Өндөрт хэн ажиллах эрхтэй байдаг бэ?',
    correct: 1,
    answers: [
      {
        id: 1,
        text: 'Эмчийн үзлэгээр орж тэнцсэн, мэдлэгийн шалгалтанд тэнцсэн 18 нас хүрсэн хүн',
      },
      {
        id: 2,
        text: 'Эмчийн үзлэгээр орж тэнцсэн, мэдлэгийн шалгалтанд тэнцсэн 21 нас хүрсэн хүн',
      },
      { id: 3, text: 'Зааварчилгааг сайн авсан ажилтан ' },
    ],
  },
  {
    id: 2,
    question:
      'Хэдэн метрсээс дээш өндөр шат тавцан дээр ажиллах үедээ өндрийн бүс хэрэглэх бэ?',
    correct: 2,
    answers: [
      { text: '1,2 метр', id: 1 },
      { text: '1,3 метр', id: 2 },
      { text: '1,5 метр', id: 3 },
    ],
  },
  {
    id: 3,
    question: 'Өндрийн бүсийг ямар хугацаанд шалгадаг бэ?',
    correct: 3,
    answers: [
      { text: '7 хоногт 1 удаа', id: 1 },
      { text: '10 хоногт 1 удаа', id: 2 },
      { text: 'Ажилд ашиглахын өмнө өдөр бүр', id: 3 },
    ],
  },
  {
    id: 4,
    question:
      'Өндөрт шат тавцан дээр ажиллах үедээ өндрийн бүсийг хаанаас бэхлэх бэ?',
    correct: 3,
    answers: [
      { text: 'Барьсан шатнаас', id: 1 },
      { text: 'Ойролцоо байрлах шугам, хоолойноос', id: 2 },
      { text: 'Амин цэгээс', id: 3 },
    ],
  },
  {
    id: 5,
    question:
      'Өндөр шат тавцан дээр ажиллах байх үедээ тухайн шат тавцан баталгаатай гэдгийг тар хэрхэн мэдэж ажиллах бэ?',
    correct: 2,
    answers: [
      { text: 'Найдвартай барьсан байвал', id: 1 },
      { text: 'Шат тавцанг актаар хүлээлцэж, пайз зүүсэн байвал', id: 2 },
      { text: 'Зааварчилгаа хангалттай өгөгдсөн байвал', id: 3 },
    ],
  },
]

export default function Second({ env, setCurrent, visible }) {
  const [show, setShow] = useState(false)
  const [spring, api] = useSpring(() => ({
    from: { scale: 40, objScale: 0, opacity: 0 },
  }))

  const handlePrev = () => {
    // setIntro(false)
    api.start({
      from: { scale: 20, opacity: 1, objScale: 1 },
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
      from: { scale: 20, opacity: 1, objScale: 1 },
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
    }
  }

  useEffect(() => {
    if (visible) {
      setShow(true)
      api.start({
        to: { scale: 20, objScale: 1, opacity: 1 },
        config: config.slow,
      })
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

      {/* TP */}
      <Interactive onSelect={handleNext}>
        <HoverButton
          position={[-0.1, 0.3, -3]}
          rotation={[0, 0, 0]}
          scale={0.1}
          text="Шилжих"
          onClick={handleNext}
        />
      </Interactive>

      {/* TP */}
      <Interactive onSelect={handlePrev}>
        <HoverButton
          position={[0.25, 0.3, 3]}
          rotation={[0, Math.PI, 0]}
          scale={0.1}
          text="Буцах"
          onClick={handlePrev}
        />
      </Interactive>
    </group>
  )
}
