import { FaChevronRight } from 'react-icons/fa';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ProjectLink = ({ heading, subheading, imgSrc}) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const left = useTransform(xSpring, [0.5, -0.5], ["60%", "70%"]);
    const top = useTransform(ySpring, [0.5, -0.5], ["40%", "60%"]);  

    const handleMouseMove = (e) => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();

            const width = rect.width;
            const height = rect.height;

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const xPct = mouseX / width - 0.5;
            const yPct = mouseY / height - 0.5;

            x.set(xPct);
            y.set(yPct);
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="initial"
            onMouseMove={handleMouseMove}
            whileHover="whileHover"
            className="group relative flex items-center justify-between border-b-2 border-blood-red py-4 transition-colors duration-500 hover:border-blood-red-light md:py-8"
        >
            <div>
                <motion.span 
                    variants={{
                        initial: { y: 0},
                        whileHover: { y: -16 },
                    }}
                    transition ={{ type: "spring", delayChildren: 0.25, staggerChildren: 0.075 }}
                    className="relative z-10 block font-rubik font-bold text-3xl lg:text-4xl xl:text-5xl text-blood-red transition-colors duration-500 group-hover:text-blood-red-light"
                >
                    {heading.split("").map((l, i) => {
                        return (
                            <motion.span
                                variants={{
                                    initial: { y: 0},
                                    whileHover: { y: 16 },
                                }}
                                transition ={{ type: "spring" }}
                                className="inline-block" 
                                key={i}
                            >
                                {l === " " ? "\u00A0" : l}
                            </motion.span>
                        );
                    })}
                </motion.span>
                <span className="relative z-10 mt-2 block font-montserrat font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl text-blood-red transition-colors duration-500 group-hover:text-blood-red-light">
                    {subheading}
                </span>
            </div>

            <motion.img
                variants={{ 
                    initial: { scale: 0, rotate: '-12.5deg' },
                    whileHover: { scale: 1, rotate: '12.5deg' }
                }}
                transition ={{ type: "spring" }}
                style={{ top, left, translateX: "-50%", translateY: "-50%" }}
                src={imgSrc}
                className="absolute z-0 h-24 w-32 rounded-3xl object-cover md:h-48 md:w-64 lg:h-64 lg:w-96 border-2 border-blood-red"
                alt={`Image Representing ${heading}`}
            />

            <motion.div
                variants={{
                    initial: { x: "25%", opacity: 0 },
                    whileHover: { x: "0%", opacity: 1 },
                }}
                transition ={{ type: "spring" }}
                className="relative z-10 p-4"
            >
                <FaChevronRight className="text-4xl text-blood-red transition-colors duration-500 group-hover:text-blood-red-light"/>
            </motion.div>
        </motion.div>
    );
};

export default ProjectLink;