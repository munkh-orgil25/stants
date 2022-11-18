import { useXR } from '@react-three/xr'
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

export default function Second({ env, setCurrent, visible, setMenu }) {
  const { player } = useXR()
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
      const total = first + second + third + fourth + fifth
      if (total > 4) {
        correctAudio.play()
      } else {
        failAudio.play()
      }
    }
  }, [showFinal])

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

  return (
    <group visible={show}>
      <a.mesh
        scale={spring.scale}
        material-opacity={spring.opacity}
        position={[0, 0, 0]}
        rotation={[0, -1.75, 0]}
      >
        <sphereGeometry />
        <meshBasicMaterial side={BackSide} map={env} transparent />
      </a.mesh>

      {/* Quiz */}
      <HoverButton
        position={[-1.4, 0.25, -2.5]}
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
        scale={0.8}
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
