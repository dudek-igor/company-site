'use client';
import { MotionConfig, motion } from 'motion/react';
import type { Dispatch, SetStateAction } from 'react';

const VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '50%', '50%'],
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%'],
    },
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
    },
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%',
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: 'calc(50% + 10px)',
    },
  },
};

type THamburgerButton = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const HamburgerButton = ({ isOpen, setIsOpen }: THamburgerButton) => {
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <motion.button
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        className="relative h-20 w-20 rounded-full scale-75 transition-colors duration-300 ease-in-out"
        onClick={() => setIsOpen((isOp) => !isOp)}
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-1 w-10 bg-gray-900 dark:bg-white transition-colors duration-300 ease-in-out"
          style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-1 w-10 bg-gray-900 dark:bg-white transition-colors duration-300 ease-in-out"
          style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-1 w-5 bg-gray-900 dark:bg-white transition-colors duration-300 ease-in-out"
          style={{
            x: '-50%',
            y: '50%',
            bottom: '35%',
            left: 'calc(50% + 10px)',
          }}
        />
        <span className="sr-only">Open main menu</span>
      </motion.button>
    </MotionConfig>
  );
};

export default HamburgerButton;
