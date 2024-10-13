import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Encrypt = () => {
  return (
    <div>
      <EncryptText texts={["UNDERGRADUATE STUDENT", "SOFTWARE DEVELOPER"]} />
    </div>
  );
};

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 30;
const CYCLE_INTERVAL = 3000;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const EncryptText = ({ texts }) => {
  const scrambleIntervalRef = useRef(null);
  const cycleIntervalRef = useRef(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(1);
  const [text, setText] = useState(texts[0]);

  const scramble = () => {
    let pos = 0;
    scrambleIntervalRef.current = setInterval(() => {
      const scrambled = texts[currentTextIndex]
        .split("")
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


    setText(texts[currentTextIndex]);
    setCurrentTextIndex((prevIndex) =>
      prevIndex === texts.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {

    cycleIntervalRef.current = setInterval(() => {
      scramble();
    }, CYCLE_INTERVAL);

    return () => {
      clearInterval(cycleIntervalRef.current);
      clearInterval(scrambleIntervalRef.current);
    };
  }, [currentTextIndex]);

  return (
    <motion.div className="font-montserrat italic text-blood-red text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold text-nowrap select-none">
      {text}
    </motion.div>
  );
};

export default Encrypt;
