import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Encrypt = () => {
  return (
    <div>
      <EncryptText texts={["COMP SCI STUDENT", "SOFTWARE DEVELOPER"]} />
    </div>
  );
};

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CYCLE_INTERVAL = 2000; // 2 seconds between scrambles
const CHARS = "!@#$%^&*():{};|,.<>/?";

const EncryptText = ({ texts }) => {
  const scrambleIntervalRef = useRef(null);
  const cycleIntervalRef = useRef(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [text, setText] = useState(texts[0]); // Start with the first text

  const scramble = () => {
    let pos = 0;
    scrambleIntervalRef.current = setInterval(() => {
      const scrambled = texts[currentTextIndex]
        .split("") // Use the current text for scrambling
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= texts[currentTextIndex].length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(scrambleIntervalRef.current || undefined);

    // Immediately switch to the next text after scramble ends
    setText(texts[currentTextIndex]); // Reset to the current text
    setCurrentTextIndex((prevIndex) =>
      prevIndex === texts.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    // Start the cycle of scrambling every CYCLE_INTERVAL
    cycleIntervalRef.current = setInterval(() => {
      scramble(); // Scramble the current text at the specified interval
    }, CYCLE_INTERVAL);

    return () => {
      clearInterval(cycleIntervalRef.current); // Clear interval on component unmount
      clearInterval(scrambleIntervalRef.current); // Clear scramble interval
    };
  }, [currentTextIndex]); // Re-run effect when text index changes

  return (
    <motion.div className="font-rubik text-blood-red text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-nowrap select-none">
      {text}
    </motion.div>
  );
};

export default Encrypt;
