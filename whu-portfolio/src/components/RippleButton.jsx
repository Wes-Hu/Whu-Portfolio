import { motion } from "framer-motion";
import { useState } from "react";

const RippleButton = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: "50%", y: "50%" });
  const [animationKey, setAnimationKey] = useState(0);

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    setAnimationKey(prevKey => prevKey + 1);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block w-full h-full px-6 py-3 rounded-full border-2 border-blood-red text-blood-red overflow-hidden hover:text-black transition-all duration-[600ms] ease-in-out"
    >
      <motion.div
        key={animationKey}
        initial={{ top: position.y, left: position.x, scale: 0 }}
        animate={{
          scale: isHovered ? 100 : 0,
        }}
        transition={{ duration: 0.6, ease: "circInOut" }}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blood-red rounded-full z-0"
      ></motion.div>
      <div className="text-center relative z-10 font-bold">{children}</div>
    </div>
  );
};

export default RippleButton;
