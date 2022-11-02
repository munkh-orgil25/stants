import { Interactive, useXR } from '@react-three/xr'
import { useEffect, useState } from 'react'
import { a, useSpring, config } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import HoverButton from '../../../components/HoverButton'
import InfoText from '../../../components/InfoText'
import Question from '../../../components/Question'
import Answer from '../../../components/Answer'
import Quiz from '../../../components/Quiz'

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

export default function First({ setLocation }) {
  const [infoVisible, setInfoVisible] = useState(false)
  const [activeQuiz, setActiveQuiz] = useState(0)
  const { player, isPresenting } = useXR()

  return (
    <group>
      {/* INFO */}
      <group position={[-4, 0.6, -5]} rotation={[0, 0.75, 0]}>
        <HoverButton
          position={[0, 0, -0.01]}
          scale={0.5}
          text="Унших"
          onClick={() => setInfoVisible(true)}
        />
        <Interactive onSelect={() => setInfoVisible(false)}>
          <InfoText
            visible={infoVisible}
            onClick={() => setInfoVisible(false)}
            scale={1}
            position={[0, 1, 4]}
            title="ХХБ дахь цахилгааны аюул."
            text="1,3 метрээс дээш өндөрт зориулалтын (нэмэлт бэхлэгээ хийгдсэн, пайзтай, шат тавцанг акт үйлдэж хүлээлцсэн гэх мэт) шат тавьсан дээр ажил гүйцэтгэх ёстой. Та өндөр ажил гүйцэтгэх үед өнөөдрийн бүсийг тогтмол зүүж амин цэг, амин олсноос бүсийг бэхлэж ажил гүйцэтгэх ёстой. Өндөр .  Биё биендээ хяналт тавьж, өндөөр биет унагаахгүй болгоомжтой ажил гүйцэтгэх."
          />
        </Interactive>
      </group>

      {/* QUIZ */}
      <group position={[4, 0.6, -5]} rotation={[0, -0.75, 0]}>
        <HoverButton
          position={[0, 0, -0.01]}
          scale={0.5}
          text="Шалгах"
          onClick={() => setActiveQuiz(1)}
        />
        {questions.map((q) => (
          <group key={q.id} position={[-1, 1, 4]} rotation={[0, 0.4, 0]}>
            <Quiz
              quiz={q}
              visible={q.id === activeQuiz}
              setActiveQuiz={setActiveQuiz}
            />
          </group>
        ))}
      </group>
    </group>
  )
}
