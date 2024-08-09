import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Drip from "./Drip";

const HomeButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      whileHover={{ scale: 1.2 }}
      href="/"
      className="group relative bg-blood-red w-16 h-16 p-2 rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img className="w-full h-full" src="/HuLogoWhite.png" alt="Logo" />
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              key="drip1"
            >
              <Drip left="17%" height={7} delay={0} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              key="drip2"
            >
              <Drip left="43%" height={18} delay={1.75} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              key="drip3"
            >
              <Drip left="65%" height={10} delay={0.75} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

export default HomeButton;
