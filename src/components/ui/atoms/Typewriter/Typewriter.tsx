'use client';
import * as motion from 'motion/react-client';
import { useState, useEffect } from 'react';

const words = ['world', 'software'];

export default function TypewriterEffect() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'idle' | 'typing' | 'waiting' | 'deleting'>('idle');

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'idle') {
      // 0.5s delay before starting
      timeout = setTimeout(() => setPhase('typing'), 500);
    }

    if (phase === 'typing') {
      const word = words[index];
      if (text.length < word.length) {
        timeout = setTimeout(() => {
          setText(word.slice(0, text.length + 1));
        }, 100);
      } else {
        // Done typing, wait before deleting
        timeout = setTimeout(() => setPhase('deleting'), index === 0 ? 2500 : 20000);
      }
    }

    if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(words[index].slice(0, text.length - 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setIndex((prev) => (prev + 1) % words.length);
          setPhase('typing');
        }, 500);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, index]);

  return (
    <motion.span
      className="ml-3 block text-accented-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {text}
      <motion.span
        className="ml-1 inline-block"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        |
      </motion.span>
    </motion.span>
  );
}
