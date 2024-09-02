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
                                className="fixed top-0 right-0 w-screen md:w-[45%] lg:w-[30%] 2xl:w-1/5 h-screen z-40 bg-blood-red pl-10 pt-24"
                                initial={{ scale: 0, x: "100%", y: "-100%", borderRadius: "100%"}}
                                animate={{ scale: 1, x:  0, y: 0, borderRadius: "0%"}}
                                exit={{scale: 0, x: "100%", y: "-100%", borderRadius: "100%" }}
                                transition={{
                                    duration: 0.7,
                                    ease: "easeInOut",
                                }}
                            >
                                <nav className="flex flex-col gap-10">
                                    <motion.a href="#About" className="font-raleway text-4xl text-white w-full">About</motion.a>
                                    <motion.a href="#Projects" className="font-raleway text-4xl text-white">Projects</motion.a>
                                    <motion.a href="#Experience" className="font-raleway text-4xl text-white">Experience</motion.a>
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
