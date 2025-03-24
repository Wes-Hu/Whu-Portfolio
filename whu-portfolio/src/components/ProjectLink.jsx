import { FaChevronRight } from 'react-icons/fa';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import RippleButton from './RippleButton';

const ProjectLink = ({ heading, subheading, imgSrc, description, techStack, link}) => {
    const [isOpen, setIsOpen] = useState(false);

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
            onClick={() => setIsOpen(true)}
            ref={ref}
            initial="initial"
            onMouseMove={handleMouseMove}
            whileHover="whileHover"
            className="group relative flex items-center justify-between border-b-2 border-blood-red py-4 transition-colors duration-500 hover:border-blood-red-light md:py-8 select-none"
        >   
            <ProjectModal isOpen={isOpen} setIsOpen={setIsOpen} heading={heading} imgSrc={imgSrc} description={description} techStack={techStack} link={link}/>
            <div>
                <motion.span 
                    variants={{
                        initial: { y: 0},
                        whileHover: { y: -16 },
                    }}
                    transition ={{ type: "spring", delayChildren: 0.25, staggerChildren: 0.075}}
                    className="relative z-10 block font-rubik font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-blood-red transition-colors duration-500 group-hover:text-blood-red-light text-nowrap"
                >
                    {heading.split("").map((l, i) => {
                        return (
                            <motion.span
                                variants={{
                                    initial: { y: 0},
                                    whileHover: { y: 16 },
                                }}
                                transition ={{ type: "spring"}}
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

const ProjectModal = ({ isOpen, setIsOpen, heading, imgSrc, description, techStack, link }) => {
const [isHovered, setIsHovered] = useState(false);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    onClick={() => setIsOpen(false)}
                    className="w-screen h-screen backdrop-blur fixed inset-0 z-50 grid place-items-center overflow-hidden cursor-auto select-none"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        onClick={(e) => e.stopPropagation()}
                        className="max-w-[90%] max-h-[90%] lg:max-w-[75%] bg-night relative rounded-3xl border-2 border-blood-red"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="scale-50 md:scale-75 lg:scale-100 absolute top-0 right-0 md:top-3 md:right-3 lg:top-5 lg:right-5 w-16 h-16 flex items-center justify-center rounded-full bg-blood-red z-20"
                        >
                            <div className="relative flex items-center justify-center w-full h-full">
                                <motion.span
                                    initial={{ rotate: "45deg" }}
                                    animate={{ backgroundColor: isHovered ? "#E97451" : "#FFFFFF" }}
                                    className="absolute w-8 h-1 bg-white rounded-full transition-all ease-in-out duration-300"
                                ></motion.span>
                                <motion.span
                                    initial={{ rotate: "-45deg" }}
                                    animate={{ backgroundColor: isHovered ? "#E97451" : "#FFFFFF" }}
                                    className="absolute w-8 h-1 bg-white rounded-full transition-all ease-in-out duration-300"
                                ></motion.span>
                            </div>
                        </button>
                        <div className="flex flex-col items-center overflow-y-auto max-h-[calc(100vh-8rem)] px-6 py-10 scrollbar-hidden">
                            <h1 className="text-center font-rubik font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-blood-red transition-colors duration-500 group-hover:text-blood-red mb-10">
                                {heading}
                            </h1>
                            <div className="w-full flex flex-col lg:flex-row justify-center gap-10">
                                <img src={imgSrc} alt={`Image Representing ${heading}`} className="w-full lg:w-1/2 rounded-3xl object-cover border-2 border-blood-red mb-10"/>
                                <div className="w-full lg:w-1/2">
                                    <h2 className="text-center mb-5 font-montserrat font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl text-blood-red">
                                    Tech Stack
                                    </h2>
                                    <div className="flex gap-3 flex-wrap justify-center items-center mb-10">
                                        {techStack.split(",").map((tech, i) => {
                                            return (
                                                <motion.div
                                                    initial={{ scale: 1, color: "#090A0C", rotate: 0}}
                                                    whileHover={{ scale: 1.2, color: "#EE6C4D", rotate: "3deg" }}
                                                    transition={{ duration: 0.1, ease: 'easeInOut'}} 
                                                    className="bg-blood-red px-3 py-2 italic rounded-xl font-semibold z-30 font-raleway select-none hover:shadow-[0_0_20px_5px_#70110A] shadow-blood-red cursor-pointer" 
                                                    key={i}
                                                >
                                                    {tech}
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                    <p className="font-lora text-blood-red text-base lg:text-xl font-semibold leading-relaxed mb-10">{description}</p>
                                </div>
                            </div>
                            <a
                                href={link}
                                target="_blank"
                                className="w-fit block font-bold text-xl lg:text-2xl font-raleway"
                            >
                                <RippleButton>VISIT</RippleButton>
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


export default ProjectLink;