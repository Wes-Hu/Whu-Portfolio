import React, {useState} from "react";
import { motion, MotionConfig } from "framer-motion";

const NavMenu = () =>  {

    const MenuButton = () => {
        const [active, setActive] = useState(false);
        return (
            <MotionConfig
                transition={{
                    duration: 0.5,
                    ease: "backInOut"
                }}
            >
                <motion.button 
                    onClick={() => setActive((prevState) => !prevState)} 
                    className="relative w-16 h-16 rounded-full bg-blood-red hover:bg-blood-red-light transition-all ease"
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
                        variants={{
                            open: {
                                rotate: ["0deg","0deg", "45deg"],
                                top: ["35%", "50%", "50%"],
                            },
                            closed:{
                                rotate: ["45deg","45deg", "0deg"],
                                top: ["50%", "50%", "35%"],
                            },
                        }}
                    />
                    <motion.span 
                        className="absolute w-8 h-1 bg-white rounded-full"
                        style={{
                            left: "50%",
                            top: "50%",
                            x: "-50%",
                            y: "-50%",
                        }}
                        variants={{
                            open: {
                                scaleX: [1, 1, 0],
                            },
                            closed:{
                                scaleX: [0, 0, 1,],
                            },
                        }}
                    />
                    <motion.span 
                        className="absolute w-8 h-1 bg-white rounded-full"
                        style={{
                            left: "50%",
                            bottom: "35%",
                            x: "-50%",
                            y: "50%",
                        }}
                        variants={{
                            open: {
                                rotate: ["0deg","0deg", "-45deg"],
                                bottom: ["35%", "50%", "50%"],
                            },
                            closed:{
                                rotate: ["-45deg","--45deg", "0deg"],
                                bottom: ["50%", "50%", "35%"],
                            },
                        }}
                    />
                </motion.button>
            </MotionConfig>

        );
    };

    return (
        <div>
            <MenuButton/>
        </div>
    );
}
export default NavMenu;