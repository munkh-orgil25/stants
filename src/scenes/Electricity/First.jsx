import { Environment } from '@react-three/drei'
import React, { useState } from 'react'
import Answer from '../../components/Answer'
import HoverButton from '../../components/HoverButton'
import InfoText from '../../components/InfoText'
import Question from '../../components/Question'

export default function First() {
  const [textVisible, setTextVisible] = useState(false)
  const [quizVisible, setQuizVisible] = useState(false)

  return (
    <group>
      <Environment
        background
        files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
        path="/textures/2.1/"
      />

      {/* INFO */}
      <HoverButton
        scale={3.5}
        position={[-30, -30, -50]}
        rotation={[0, 0, 0]}
        text="Унших"
        onClick={() => setTextVisible(true)}
      />
      <InfoText
        visible={textVisible}
        onClick={() => setTextVisible(false)}
        scale={15}
        position={[15, 0, -30]}
        rotation={[0, 0, 0]}
        title="ХХБ дахь цахилгааны аюул."
        text="Цахилгааны Хаалттай хувиарлах байгууламж ( ХХБ) нь цахилгаан тоноглолын таслах,залгах аппаратур , удирдлагын хэлхээ байралдаг сэлгэн залгалт хийгддэг онц чухал объект юм."
      />

      {/* TEST */}
      <HoverButton
        scale={3}
        position={[80, -30, -10]}
        rotation={[0, -1.5, 0]}
        text="Шалгах"
        onClick={() => setQuizVisible(true)}
      />
      <Question
        visible={quizVisible}
        onClick={() => setQuizVisible(false)}
        scale={20}
        position={[60, 10, -5]}
        rotation={[0, -1.5, 0]}
        text="Өндөрт шат тавцан дээр ажиллахад юунд анхаарах вэ?"
      />
      <Answer
        visible={quizVisible}
        correct
        scale={20}
        position={[60, -2, -5]}
        rotation={[0, -1.5, 0]}
        text="Резинэн бээлий"
      />
      <Answer
        visible={quizVisible}
        correct={false}
        scale={20}
        position={[60, -8, -5]}
        rotation={[0, -1.5, 0]}
        text=" Туршигдаж баталгаажсан хүчдэл заагчаар үзээд хурууны араар хүрч шалгана. "
      />
      <Answer
        visible={quizVisible}
        correct={false}
        scale={20}
        position={[60, -14, -5]}
        rotation={[0, -1.5, 0]}
        text="Баталгаажсан хүчдэл заагч ашиглан болгоомжтой шалгана."
      />
    </group>
  )
}
