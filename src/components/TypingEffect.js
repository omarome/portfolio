import React, { useEffect, useState } from 'react';
import '../style/TypingEffect.css';

const TypingEffect = ({ textArray, typingSpeed = 150, deletingSpeed = 75, delay = 2000 }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = textArray[loopIndex % textArray.length];

    const timer = setTimeout(() => {
      if (isDeleting) {
        setText(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }

      if (!isDeleting && charIndex === currentText.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setLoopIndex((prev) => prev + 1);
      }
    }, isDeleting ? deletingSpeed : charIndex === currentText.length ? delay : typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopIndex, charIndex, textArray, typingSpeed, deletingSpeed, delay]);

  return (
    <div className="typewrite">
      <span className="wrap">{text}</span>
    </div>
  );
};

export default TypingEffect;
