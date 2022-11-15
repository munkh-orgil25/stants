import { a, useSpring } from '@react-spring/three'
import { useEffect, useState } from 'react'
import Answer from './Answer'
import Question from './Question'

export default function Quiz({ quiz, visible, rotation, setCorrect, onNext }) {
  const [init, setInit] = useState(false)

  const { scale, pos } = useSpring({
    scale: init ? 1.5 : 0,
    pos: init ? [0, 0, -3.5] : [0, -10, -3.5],
  })

  useEffect(() => {
    if (visible) {
      setInit(true)
    }
  }, [visible])

  const handleAnswer = (id) => {
    const { correct } = quiz
    if (id === correct) {
      setCorrect()
    }
    onNext()
  }

  return (
    <a.group position={pos} rotation={rotation} scale={scale}>
      <Question
        visible={visible}
        // onClick={() => {}}
        scale={1}
        position={[0, 1, 0]}
        text={quiz.question}
      />
      {quiz.answers.map((answer) => (
        <Answer
          key={answer.id}
          visible={visible}
          scale={1}
          position={[0, 0.7 - answer.id * 0.3, 0]}
          answer={answer}
          onClick={handleAnswer}
        />
      ))}
    </a.group>
  )
}
