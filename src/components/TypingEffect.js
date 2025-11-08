import React, { useEffect, useMemo, useState } from 'react';
import { motion, stagger, useAnimate } from 'motion/react';
import '../style/TypingEffect.css';

const TypingEffect = ({ textArray = [], typingSpeed = 120, delay = 2000 }) => {
  const [scope, animate] = useAnimate();
  const [sentenceIndex, setSentenceIndex] = useState(0);

  const sentence = useMemo(() => {
    if (!textArray.length) {
      return '';
    }
    return textArray[sentenceIndex % textArray.length];
  }, [textArray, sentenceIndex]);

  const { wordEntries, charCount } = useMemo(() => {
    if (!sentence) {
      return { wordEntries: [], charCount: 0 };
    }

    const words = sentence.trim().length === 0 ? [] : sentence.split(/\s+/);
    const entries = words.map((word, idx) => ({
      key: `${sentenceIndex}-${idx}-${word}`,
      chars: word.split(''),
    }));
    const totalChars = entries.reduce((sum, entry) => sum + entry.chars.length, 0);

    return { wordEntries: entries, charCount: totalChars };
  }, [sentence, sentenceIndex]);

  useEffect(() => {
    if (!textArray.length || !scope.current) {
      return;
    }

    const resetControls = animate(
      'span.char',
      {
        opacity: 0,
        y: 12,
        display: 'inline-block',
      },
      { duration: 0 }
    );

    const revealControls = animate(
      'span.char',
      {
        opacity: 1,
        y: 0,
        display: 'inline-block',
      },
      {
        duration: 2,
        delay: stagger(Math.max(typingSpeed, 16) / 1000),
        ease: 'easeInOut',
      }
    );

    const totalDuration = charCount * Math.max(typingSpeed, 16) + delay;
    const timer = setTimeout(() => {
      setSentenceIndex((prev) => (prev + 1) % textArray.length);
    }, totalDuration);

    return () => {
      resetControls?.stop?.();
      revealControls?.stop?.();
      clearTimeout(timer);
    };
  }, [animate, charCount, delay, scope, textArray, typingSpeed, sentenceIndex]);

  useEffect(() => {
    if (!textArray.length) {
      setSentenceIndex(0);
    } else {
      setSentenceIndex((prev) => prev % textArray.length);
    }
  }, [textArray]);

  return (
    <div className="typewrite">
      <motion.div ref={scope} className="wrap">
        {wordEntries.map((entry, wordIdx) => (
          <span
            key={entry.key}
            className="word-block"
            style={{ marginRight: wordIdx === wordEntries.length - 1 ? 0 : '0.55ch' }}
          >
            {entry.chars.map((char, charIdx) => (
              <span
                key={`${entry.key}-char-${charIdx}`}
                className="char"
                style={{
                  opacity: 0,
                  transform: 'translateY(12px)',
                  display: 'inline-block',
                  whiteSpace: 'pre',
                }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default TypingEffect;
