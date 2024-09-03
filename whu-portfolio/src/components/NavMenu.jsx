import React, { useState } from "react";
import { motion, MotionConfig, AnimatePresence, easeInOut } from "framer-motion";

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
                    rotate: ["-45deg", "--45deg", "0deg"],
                    bottom: ["50%", "50%", "35%"],
                },
            },
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
                                className="fixed top-0 right-0 w-screen md:w-[45%] lg:w-[30%] 2xl:w-1/5 h-screen z-40 bg-blood-red px-10 pt-24"
                                initial={{x: "100%", borderRadius: "100%"}}
                                animate={{x:  0, y: 0, borderRadius: "0%"}}
                                exit={{x: "100%", borderRadius: "100%" }}
                                transition={{
                                    duration: 0.7,
                                    ease: "easeInOut",
                                }}
                            >
                                <nav className="flex flex-col gap-8">
                                    <motion.a 
                                        href="#About" 
                                        className="font-raleway text-4xl text-white w-full flex flex-col"
                                        initial="rest"
                                        whileHover="hover"
                                        animate="rest"
                                    >
                                        <motion.p>ABOUT</motion.p>
                                        <motion.span 
                                            className="w-full h-2 bg-gradient-to-r from-white to-blood-red" 
                                            variants={{
                                                rest: { scaleX: 0, originX: 0 },
                                                hover: { scaleX: 1, originX: 0 },
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 100,
                                                damping: 20
                                            }}
                                        />
                                    </motion.a>
                                    <motion.a href="#Projects" className="font-raleway text-4xl text-white flex flex-col">
                                        <motion.p>PROJECTS</motion.p>
                                        <motion.span className="w-full h-2 bg-white" />
                                    </motion.a>
                                    <motion.a href="#Experience" className="font-raleway text-4xl text-white flex flex-col">
                                        <motion.p>EXPERIENCE</motion.p>
                                        <motion.span className="w-full h-2 bg-white" />
                                    </motion.a>
                                </nav>    
                            </motion.div>
                        )}
                    </AnimatePresence>
            </div>
            
        );
    };

    return (
        <div>
            <MainMenu />
        </div>
    );
};

export default NavMenu;
