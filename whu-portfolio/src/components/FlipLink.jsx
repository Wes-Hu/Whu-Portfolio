import { motion } from "framer-motion";

const  DURATION = 0.15;
const STAGGER = 0.025;

const FlipLink = ({ children }) => {
    return (
        <motion.span 
            className="relative inline-block overflow-hidden whitespace-nowrap uppercase font-raleway font-semibold text-4xl text-blood-red"
            initial="initial"
            whileHover="hovered"
            style={{
                lineHeight: 0.75,
            }}
        >
            <div>
                {children.split("").map((l, i) => {
                    return <motion.span
                    variants={{
                        initial: {y: 0,},
                        hovered: {y: "-100%"},
                    }}
                    transition={{
                        duration: DURATION,
                        ease: "easeInOut",
                        delay: STAGGER * i,
                    }}
                    className="inline-block" 
                    key={i}>{l}</motion.span>;
                })}
            </div>
            <div className="absolute inset-0">
                {children.split("").map((l, i) => {
                    return <motion.span
                    variants={{
                        initial: {y: "100%", color: "#70110A"},
                        hovered: {y: 0, color: "#9F180E" },
                    }}
                    transition={{
                        duration: DURATION,
                        ease: "easeInOut",
                        delay: STAGGER * i,
                    }}
                    className="inline-block" 
                    key={i}>{l}</motion.span>;
                })}
            </div>
        </motion.span>
    );
};

export default FlipLink;