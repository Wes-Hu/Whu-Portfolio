import React, { useState } from "react";
import { motion, MotionConfig, AnimatePresence, easeIn } from "framer-motion";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail} from "react-icons/md";

const NavMenu = () => {

    
    const MainMenu = () => {
        const [active, setActive] = useState(false);

        const BUTTON_VARIANTS = {
            top: {
                open: {
                    rotate: ["0deg", "0deg", "45deg"],
                    top: ["35%", "50%", "50%"],
                },
                closed: {
                    rotate: ["45deg", "45deg", "0deg"],
                    top: ["50%", "50%", "35%"],
                },
            },
            middle: {
                open: {
                    scaleX: [1, 1, 0],
                },
                closed: {
                    scaleX: [0, 0, 1],
                },
            },
            bottom: {
                open: {
                    rotate: ["0deg", "0deg", "-45deg"],
                    bottom: ["35%", "50%", "50%"],
                },
                closed: {
                    rotate: ["-45deg", "-45deg", "0deg"],
                    bottom: ["50%", "50%", "35%"],
                },
            },
        };

        const navVariants = {
            initial: { opacity: 0, x: -20 },
            animate: {
                opacity: 1,
                x: 0,
                transition: {
                    delayChildren: 0.5,
                    staggerChildren: 0.2,
                    duration: 1,
                },
            },
            exit: { opacity: 0, x: +20 },
        };

        const itemVariants = {
            initial: { opacity: 0, x: -20 , scale: 0, scaleX: 0 },
            animate: { opacity: 1, x: 0, scale: 1, scaleX: 1 },
            exit: { opacity: 0, x: +20, scale: 0, scaleX: 0  },
        };

        const navVariantsTwo = {
            initial: { opacity: 0, x: -20 },
            animate: {
                opacity: 1,
                x: 0,
                transition: {
                    delayChildren: 0.5,
                    staggerChildren: 0.3,
                    duration: 1,
                },
            },
            exit: { opacity: 0, x: +20 },
        };

        const itemVariantsTwo = {
            initial: { opacity: 0, x: -20 , scale: 0, rotate: 180 },
            animate: { opacity: 1, x: 0, scale: 1, rotate: 0 },
            exit: { opacity: 0, x: +20, scale: 0, rotate: 180  },
        };

        return (
            <div className="overflow-hidden">
                <MotionConfig
                    transition={{
                        duration: 0.5,
                        ease: "backInOut",
                    }}
                >
                    <motion.button
                        onClick={() => setActive((prevState) => !prevState)}
                        className="relative w-16 h-16 rounded-full z-50 bg-blood-red group"
                        animate={active ? "open" : "closed"}
                    >
                        <motion.span
                            className="absolute w-8 h-1 bg-white rounded-full group-hover:bg-burnt-sienna transition-all ease-in-out duration-300"
                            style={{
                                left: "50%",
                                top: "35%",
                                x: "-50%",
                                y: "-50%",
                            }}
                            variants={BUTTON_VARIANTS.top}
                        />
                        <motion.span
                            className="absolute w-8 h-1 bg-white rounded-full group-hover:bg-burnt-sienna transition-all ease-in-out duration-300"
                            style={{
                                left: "50%",
                                top: "50%",
                                x: "-50%",
                                y: "-50%",
                            }}
                            variants={BUTTON_VARIANTS.middle}
                        />
                        <motion.span
                            className="absolute w-8 h-1 bg-white rounded-full group-hover:bg-burnt-sienna transition-all ease-in-out duration-300"
                            style={{
                                left: "50%",
                                bottom: "35%",
                                x: "-50%",
                                y: "50%",
                            }}
                            variants={BUTTON_VARIANTS.bottom}
                        />
                    </motion.button>
                </MotionConfig>   
                <AnimatePresence>
                    {active && (
                        <motion.div
                            className="fixed top-0 right-0 w-screen md:w-[45%] lg:w-[30%] xl:w-[25%] 2xl:w-1/5 h-screen z-40 bg-blood-red px-10 py-24 flex flex-col justify-between"
                            initial={{x: "100%", borderRadius: "50%"}}
                            animate={{x:  0, y: 0, borderRadius: "0%"}}
                            exit={{x: "100%", borderRadius: "50%" }}
                            transition={{
                                duration: 0.7,
                                ease: "easeInOut",
                            }}
                        >
                            <motion.nav
                                className="flex flex-col gap-6 items-start"
                                variants={navVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <motion.a href="#About" variants={itemVariants} onClick={() => setActive((prevState) => !prevState)}>
                                    <FlipLink>About</FlipLink>
                                </motion.a>
                                <motion.a href="#Projects" variants={itemVariants} onClick={() => setActive((prevState) => !prevState)}>
                                    <FlipLink>Projects</FlipLink>
                                </motion.a>
                                <motion.a href="#Experience" variants={itemVariants} onClick={() => setActive((prevState) => !prevState)}>
                                    <FlipLink>Experience</FlipLink>
                                </motion.a>
                                <motion.a href="#Contact" variants={itemVariants} onClick={() => setActive((prevState) => !prevState)}>
                                    <FlipLink>Contact&nbsp;me</FlipLink>
                                </motion.a>
                            </motion.nav>
                            <motion.nav
                                className="flex flex-row justify-between"
                                variants={navVariantsTwo}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <motion.a href="https://www.linkedin.com/in/wesley-hu-1bb739268/" target="_blank" className="text-white" variants={itemVariantsTwo}>
                                    <motion.div 
                                        className="relative block overflow-hidden whitespace-nowrap hover:text-burnt-sienna transition-colors duration-300 ease-in-out"
                                        initial={{scale: 1 }}
                                        whileHover={{scale: 1.5, rotate: '360deg'}}
                                    >
                                        <motion.div>
                                            <FaLinkedin size={50}/>
                                        </motion.div>
                                       
                                    </motion.div>
                                </motion.a>
                                <motion.a href="https://github.com/Wes-Hu" target="_blank" className="text-white" variants={itemVariantsTwo}>
                                    <motion.div 
                                        className="relative block overflow-hidden whitespace-nowrap hover:text-burnt-sienna transition-colors duration-300 ease-in-out"
                                        initial={{scale: 1 }}
                                        whileHover={{scale: 1.5, rotate: '360deg'}}
                                    >
                                        <motion.div>
                                            <FaGithub size={50}/>
                                        </motion.div>
                                       
                                    </motion.div>
                                </motion.a>
                                <motion.a href="mailto:wes.hu@comcast.net" className="text-white" variants={itemVariantsTwo}>
                                <motion.div 
                                        className="relative block overflow-hidden whitespace-nowrap hover:text-burnt-sienna transition-colors duration-300 ease-in-out"
                                        initial={{scale: 1 }}
                                        whileHover={{scale: 1.5, rotate: '360deg'}}
                                    >
                                        <motion.div>
                                            <MdEmail size={50}/>
                                        </motion.div>
                                       
                                    </motion.div>
                                    
                                </motion.a>
                            </motion.nav>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    const  DURATION = 0.15;
    const STAGGER = 0.025;

    const FlipLink = ({ children }) => {
        return (
            <motion.span 
                className="relative inline-block overflow-hidden whitespace-nowrap uppercase font-raleway font-semibold text-4xl text-white"
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
                            initial: {y: "100%", color: "white"},
                            hovered: {y: 0, color: "#EE6C4D" },
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

    return (
        <div>
            <MainMenu />
        </div>
    );
};

export default NavMenu;


