import React, { useState, useEffect, useRef } from 'react';

function TypingEffect() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isBlinking, setIsBlinking] = useState(true);
  const fullText = '안녕하세요!';

  const typingIntervalRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    let index = 0;

    if (isTyping) {
      typingIntervalRef.current = setInterval(() => {
        setText((prevText) => prevText + fullText[index]);
        index++;
        if (index === fullText.length) {
          clearInterval(typingIntervalRef.current);
          setIsTyping(false);
        }
      }, 200);
    } else {
      resetTimeoutRef.current = setTimeout(() => {
        setText('');
        setIsTyping(true);
        setIsBlinking(true);
      }, 5000);
    }

    // Clean up intervals and timeouts on component unmount
    return () => {
      clearInterval(typingIntervalRef.current);
      clearTimeout(resetTimeoutRef.current);
    };
  }, [isTyping]);

  return (
    <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
      {text}
      <span className={`cursor ${isBlinking ? 'blink' : ''}`}>_</span>
    </h3>
  );
}

export default TypingEffect;
