import React, { useState } from "react";
import { motion, MotionConfig, AnimatePresence, easeIn } from "framer-motion";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";

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
                    staggerChildren: 0.2, // Adjust the delay between each child animation
                    duration: 1, // Duration for each item's animation
                },
            },
            exit: { opacity: 0, x: +20 },
        };

        const itemVariants = {
            initial: { opacity: 0, x: -20 , scale: 0 },
            animate: { opacity: 1, x: 0, scale: 1 },
            exit: { opacity: 0, x: +20, scale: 0  },
        };

        const navVariantsTwo = {
            initial: { opacity: 0, x: -20 },
            animate: {
                opacity: 1,
                x: 0,
                transition: {
                    delayChildren: 0.5,
                    staggerChildren: 0.2, // Adjust the delay between each child animation
                    duration: 1, // Duration for each item's animation
                },
            },
            exit: { opacity: 0, x: +20 },
        };

        const itemVariantsTwo = {
            initial: { opacity: 0, x: -20 , scale: 0 },
            animate: { opacity: 1, x: 0, scale: 1 },
            exit: { opacity: 0, x: +20, scale: 0  },
        };

        return (
            <div>
                <MotionConfig
                    transition={{
                        duration: 0.5,
                        ease: "backInOut",
                    }}
                >
                    <motion.button
                        onClick={() => setActive((prevState) => !prevState)}
                        className="relative w-16 h-16 rounded-full z-50 bg-blood-red hover:bg-blood-red-light transition-all ease"
                        animate={active ? "open" : "closed"}
                    >
                        <motion.span
                            className="absolute w-8 h-1 bg-white rounded-full"
                            style={{
                                left: "50%",
                                top: "35%",
                                x: "-50%",
                                y: "-50%",
                            }}
                            variants={BUTTON_VARIANTS.top}
                        />
                        <motion.span
                            className="absolute w-8 h-1 bg-white rounded-full"
                            style={{
                                left: "50%",
                                top: "50%",
                                x: "-50%",
                                y: "-50%",
                            }}
                            variants={BUTTON_VARIANTS.middle}
                        />
                        <motion.span
                            className="absolute w-8 h-1 bg-white rounded-full"
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
                            className="fixed top-0 right-0 w-screen md:w-[45%] 2xl:w-1/5 h-screen z-40 bg-blood-red px-10 py-24 flex flex-col justify-between"
                            initial={{x: "100%", borderRadius: "50%"}}
                            animate={{x:  0, y: 0, borderRadius: "0%"}}
                            exit={{x: "100%", borderRadius: "50%" }}
                            transition={{
                                duration: 0.7,
                                ease: "easeInOut",
                            }}
                        >
                            <motion.nav
                                className="flex flex-col gap-8"
                                variants={navVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <motion.a href="#About" className="flex flex-col" variants={itemVariants}>
                                    <FlipLink>About</FlipLink>
                                    <motion.span className="w-full h-2 bg-gradient-to-r from-white to-blood-red"/>
                                </motion.a>
                                <motion.a href="#Projects" className="flex flex-col" variants={itemVariants}>
                                    <FlipLink>Projects</FlipLink>
                                    <motion.span className="w-full h-2 bg-gradient-to-r from-white to-blood-red" />
                                </motion.a>
                                <motion.a href="#Experience" className="flex flex-col" variants={itemVariants}>
                                    <FlipLink>Experience</FlipLink>
                                    <motion.span className="w-full h-2 bg-gradient-to-r from-white to-blood-red" />
                                </motion.a>
                                <motion.a href="#Contact" className="flex flex-col" variants={itemVariants}>
                                    <FlipLink>Contact&nbsp;me</FlipLink>
                                    <motion.span className="w-full h-2 bg-gradient-to-r from-white to-blood-red" />
                                </motion.a>
                            </motion.nav>
                            <motion.nav
                                className="flex flex-row gap-8"
                                variants={navVariantsTwo}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <motion.a href="https://www.linkedin.com/in/wesley-hu-1bb739268/" target="_blank" className="text-white" variants={itemVariantsTwo}>
                                    <motion.div 
                                        className="relative block overflow-hidden whitespace-nowrap"
                                        initial="initial"
                                        whileHover="hovered"
                                        transition={{
                                            staggerChildren: 0.05,
                                        }}
                                    >
                                        <motion.div 
                                            variants={{
                                                initial: {opacity: 1},
                                                hovered: {opacity: 0},
                                            }}
                                            transition={{
                                                duration: 0.5,
                                            }}
                                        >
                                            <FaLinkedin size={50}/>
                                        </motion.div>
                                        <motion.div 
                                            className="absolute inset-0 bg-blood-red"
                                            variants={{
                                                initial: {y: "100%", x: "100%", opacity: 0},
                                                hovered: {y: 0, x: 0, opacity: 1 },
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,  // Same stiffness to keep animation consistent
                                                damping: 30,     // Same damping to ensure smooth transition
                                                mass: 1,         // Consistency in movement weight
                                                duration: 1
                                            }}
                                        >
                                            <FaLinkedin size={50}/>
                                        </motion.div>
                                        <motion.div 
                                            className="absolute inset-0 bg-blood-red"
                                            variants={{
                                                initial: {y: "-100%", x: "-100%", opacity: 0},
                                                hovered: {y: 0, x: 0, opacity: 1 },
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,  // Same stiffness to keep animation consistent
                                                damping: 30,     // Same damping to ensure smooth transition
                                                mass: 1,         // Consistency in movement weight
                                                duration: 1
                                            }}
                                        >
                                            <FaLinkedin size={50}/>
                                        </motion.div>
                                        <motion.div 
                                            className="absolute inset-0 bg-blood-red"
                                            variants={{
                                                initial: {y: "-100%", x: "100%", opacity: 0},
                                                hovered: {y: 0, x: 0, opacity: 1 },
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,  // Same stiffness to keep animation consistent
                                                damping: 30,     // Same damping to ensure smooth transition
                                                mass: 1,         // Consistency in movement weight
                                                duration: 1
                                            }}
                                        >
                                            <FaLinkedin size={50}/>
                                        </motion.div>
                                        <motion.div 
                                            className="absolute inset-0 bg-blood-red"
                                            variants={{
                                                initial: {y: "100%", x: "-100%", opacity: 0},
                                                hovered: {y: 0, x: 0, opacity: 1 },
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,  // Same stiffness to keep animation consistent
                                                damping: 30,     // Same damping to ensure smooth transition
                                                mass: 1,         // Consistency in movement weight
                                                duration: 1
                                            }}
                                        >
                                            <FaLinkedin size={50}/>
                                        </motion.div>
                                    </motion.div>
                                </motion.a>
                                <motion.a href="https://github.com/Wes-Hu" target="_blank" className="text-white" variants={itemVariantsTwo}>
                                    <motion.div 
                                        className="relative block overflow-hidden whitespace-nowrap"
                                        initial="initial"
                                        whileHover="hovered"
                                        transition={{
                                            staggerChildren: 0.05,
                                        }}
                                    >
                                        <motion.div 
                                            variants={{
                                                initial: {opacity: 1},
                                                hovered: {opacity: 0},
                                            }}
                                            transition={{
                                                duration: 0.5,
                                            }}
                                        >
                                            <FaGithub size={50}/>
                                        </motion.div>
                                        <motion.div 
                                            className="absolute inset-0 bg-blood-red"
                                            variants={{
                                                initial: {y: "100%", x: "100%", opacity: 0},
                                                hovered: {y: 0, x: 0, opacity: 1 },
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,  // Same stiffness to keep animation consistent
                                                damping: 30,     // Same damping to ensure smooth transition
                                                mass: 1,         // Consistency in movement weight
                                                duration: 1
                                            }}
                                        >
                                            <FaGithub size={50}/>
                                        </motion.div>
                                        <motion.div 
                                            className="absolute inset-0 bg-blood-red"
                                            variants={{
                                                initial: {y: "-100%", x: "-100%", opacity: 0},
                                                hovered: {y: 0, x: 0, opacity: 1 },
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,  // Same stiffness to keep animation consistent
                                                damping: 30,     // Same damping to ensure smooth transition
                                                mass: 1,         // Consistency in movement weight
                                                duration: 1
                                            }}
                                        >
                                            <FaGithub size={50}/>
                                        </motion.div>
                                        <motion.div 
                                            className="absolute inset-0 bg-blood-red"
                                            variants={{
                                                initial: {y: "-100%", x: "100%", opacity: 0},
                                                hovered: {y: 0, x: 0, opacity: 1 },
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,  // Same stiffness to keep animation consistent
                                                damping: 30,     // Same damping to ensure smooth transition
                                                mass: 1,         // Consistency in movement weight
                                                duration: 1
                                            }}
                                        >
                                            <FaGithub size={50}/>
                                        </motion.div>
                                        <motion.div 
                                            className="absolute inset-0 bg-blood-red"
                                            variants={{
                                                initial: {y: "100%", x: "-100%", opacity: 0},
                                                hovered: {y: 0, x: 0, opacity: 1 },
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,  // Same stiffness to keep animation consistent
                                                damping: 30,     // Same damping to ensure smooth transition
                                                mass: 1,         // Consistency in movement weight
                                                duration: 1
                                            }}
                                        >
                                            <FaGithub size={50}/>
                                        </motion.div>
                                    </motion.div>
                                </motion.a>
                                <motion.a href="mailto:wes.hu@comcast.net" className="text-white" variants={itemVariantsTwo}>
                                    <motion.div 
                                        className="relative block overflow-hidden whitespace-nowrap"
                                        initial="initial"
                                        whileHover="hovered"
                                        transition={{
                                            staggerChildren: 0.05,
                                        }}
                                    >
                                        <motion.div 
                                            variants={{
                                                initial: {opacity: 1},
                                                hovered: {opacity: 0},
                                            }}
                                            transition={{
                                                duration: 0.5,
                                            }}
                                        >
                                            <MdEmail size={50}/>
                                        </motion.div>
                                        <motion.div 
                                            className="absolute inset-0 bg-blood-red"
                                            variants={{
                                                initial: {y: "100%", x: "100%", opacity: 0},
                                                hovered: {y: 0, x: 0, opacity: 1 },
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,  // Same stiffness to keep animation consistent
                                                damping: 30,     // Same damping to ensure smooth transition
                                                mass: 1,         // Consistency in movement weight
                                                duration: 1
                                            }}
                                        >
                                            <MdEmail size={50}/>
                                        </motion.div>
                                        <motion.div 
                                            className="absolute inset-0 bg-blood-red"
                                            variants={{
                                                initial: {y: "-100%", x: "-100%", opacity: 0},
                                                hovered: {y: 0, x: 0, opacity: 1 },
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,  // Same stiffness to keep animation consistent
                                                damping: 30,     // Same damping to ensure smooth transition
                                                mass: 1,         // Consistency in movement weight
                                                duration: 1
                                            }}
                                        >
                                            <MdEmail size={50}/>
                                        </motion.div>
                                        <motion.div 
                                            className="absolute inset-0 bg-blood-red"
                                            variants={{
                                                initial: {y: "-100%", x: "100%", opacity: 0},
                                                hovered: {y: 0, x: 0, opacity: 1 },
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,  // Same stiffness to keep animation consistent
                                                damping: 30,     // Same damping to ensure smooth transition
                                                mass: 1,         // Consistency in movement weight
                                                duration: 1
                                            }}
                                        >
                                            <MdEmail size={50}/>
                                        </motion.div>
                                        <motion.div 
                                            className="absolute inset-0 bg-blood-red"
                                            variants={{
                                                initial: {y: "100%", x: "-100%", opacity: 0},
                                                hovered: {y: 0, x: 0, opacity: 1 },
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,  // Same stiffness to keep animation consistent
                                                damping: 30,     // Same damping to ensure smooth transition
                                                mass: 1,         // Consistency in movement weight
                                                duration: 1
                                            }}
                                        >
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
                className="relative block overflow-hidden whitespace-nowrap uppercase font-raleway font-semibold text-4xl text-white  w-full"
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
                            initial: {y: 0},
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
                            initial: {y: "100%"},
                            hovered: {y: 0 },
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
