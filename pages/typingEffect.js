import React, { useState, useEffect } from 'react'

function TypingEffect() {
  const [text, setText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isBlinking, setIsBlinking] = useState(true)
  const fullText = '안녕하세요!'

  useEffect(() => {
    let index = 0
    let typing
    let timer

    if (isTyping) {
      typing = setInterval(() => {
        setText((prevText) => prevText + fullText[index])
        index++
        if (index === fullText.length) {
          clearInterval(typing)
          setIsTyping(false)
        }
      }, 200)
    } else {
      timer = setTimeout(() => {
        setText('')
        setIsTyping(true)
        setIsBlinking(true)
      }, 5000)
    }

    return () => {
      clearInterval(typing)
      clearTimeout(timer)
    }
  }, [isTyping])

  return (
    <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
      {text}
      <span className={`cursor ${isBlinking ? 'blink' : ''}`}>_</span>
    </h3>
  )
}

export default TypingEffect
