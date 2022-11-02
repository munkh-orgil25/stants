import React, { useState } from 'react'
import Answer from './Answer'
import Question from './Question'
import Result from './Result'

export default function Quiz({ quiz, visible, setActiveQuiz }) {
  const [correct, setCorrect] = useState(null)

  const handleClick = (id) => {
    if (id === quiz.correct) {
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }

  return (
    <group>
      <Question
        visible={visible}
        onClick={() => {}}
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
          onClick={handleClick}
        />
      ))}
      <Result
        visible
        correct={correct}
        onClick={() => setActiveQuiz(quiz.id + 1)}
      />
    </group>
  )
}
