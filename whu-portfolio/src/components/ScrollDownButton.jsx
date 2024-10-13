import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoDotFill } from 'react-icons/go';
import { FaArrowDownLong } from 'react-icons/fa6';

const ScrollDownButton = ({ targetRef }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  const handleClick = () => {
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  // Function to track scroll position
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 0) {
      setIsVisible(false);
      setOpacity(0);
    } else {
      setIsVisible(true);
      setOpacity(1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.button
      onClick={handleClick}
      className="border-2 bg-night border-blood-red text-blood-red cursor-pointer z-10 px-1 py-5 rounded-full absolute bottom-10 md:bottom-20 group"
      style={{ opacity: opacity, pointerEvents: isVisible ? 'auto' : 'none' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: opacity }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.5 }}
    >
      <motion.div
        className="block group-hover:hidden"
        animate={{ y: [-15, 15, -15], opacity: [1, 0, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'circInOut',
          times: [0, 0.7, 1],
        }}
      >
        <GoDotFill size={25} />
      </motion.div>
      <motion.div
        className="hidden group-hover:block"
        animate={{ y: [-15, 15, -15] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <FaArrowDownLong size={25} />
      </motion.div>
    </motion.button>
  );
};

export default ScrollDownButton;
