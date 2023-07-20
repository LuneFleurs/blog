import React, { useState, useEffect } from 'react'

function TypingEffect() {
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isBlinking, setIsBlinking] = useState(true)
  const fullText = '안녕하세요!'

  useEffect(() => {
    let index = 0
    let typing

    if (isTyping) {
      typing = setInterval(() => {
        setText((prevText) => prevText + fullText[index])
        index++
        if (index === fullText.length) {
          clearInterval(typing)
          setIsTyping(false)
        }
      }, 200) // 각 글자가 200ms 간격으로 표시됩니다.
    } else {
      //   setIsBlinking(false) // 주석풀면 완성된후 _ 안깜박임
      setTimeout(() => {
        setText('')
        setIsTyping(true)
        setIsBlinking(true)
      }, 5000) // 5초 동안 유지되게 합니다.
    }

    return () => clearInterval(typing) // 컴포넌트 unmount시 interval을 제거합니다.
  }, [isTyping]) // isTyping 상태가 변경될 때마다 useEffect를 실행합니다.

  return (
    <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
      {text}
      <span className={`cursor ${isBlinking ? 'blink' : ''}`}>_</span>
    </h3>
  )
}

export default TypingEffect
