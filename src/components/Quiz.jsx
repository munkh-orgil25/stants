import React, { useState } from 'react'
import { useSpring, a } from '@react-spring/three'
import { BackSide } from 'three'
import Answer from './Answer'
import Question from './Question'
import Result from './Result'

export default function Quiz({
  quiz,
  visible,
  position,
  rotation,
  scale,
  handleClick,
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
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
    </group>
  )
}
