import { GoDotFill } from 'react-icons/go';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Experience = ({position, company, year, description, isOpen, toggleExperience}) => {
    return(
        <motion.div
            className="select-none" 
        >
            <div className="group relative w-1 h-24 bg-blood-red">
                <div className="absolute z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-blood-red border-4"></div>  
                <motion.div
                    initial="initial"
                    whileHover="whileHover" 
                    onClick={toggleExperience}
                    className="cursor-pointer absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-night"
                >   
                    <motion.div
                        initial = {{ x: "-50%", y: "-50%", scale: 0 }}
                        animate = {{ x: "-50%", y: "-50%", scale: isOpen ? 1 : 0 }}
                        style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                        transition={{duration: 0.5, ease: "easeInOut" }}
                        className="absolute w-5 h-5 bg-blood-red rounded-full"
                    />
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col">
                        <motion.h1
                            variants={{
                                initial: { y: 0 },
                                whileHover: { 
                                    y: [0, -5, 0],
                                    transition:{ duration: 1, ease: "easeInOut", repeat: Infinity}
                                }
                            }}
                             
                            className="font-rubik text-blood-red font-bold text-xl text-nowrap transition-colors duration-500 group-hover:text-blood-red-light"
                        >
                                {position}
                        </motion.h1>
                        <h2 className="font-montserrat flex items-center text-blood-red font-bold text-base text-nowrap transition-colors duration-500 group-hover:text-blood-red-light">
                            {company}<GoDotFill className="mx-1"/>{year}
                        </h2>
                    </div>
                </motion.div>
            </div>
            <AnimatePresence>
                {isOpen&& (
                    <motion.div
                        initial = {{ height: 0 }}
                        animate = {{ height: "auto"}}
                        exit = {{ height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }} 
                        className="lg:hidden relative w-auto h-auto flex flex-row gap-7 overflow-hidden"
                    >
                        <div className='w-1 h-auto bg-blood-red'></div>
                        <div className="w-full border-2 flex flex-col gap-2 border-blood-red rounded-3xl p-6">
                            {description.split("|").map((section, i) => {
                                return(
                                    <div
                                        key={i} 
                                        className="font-lora text-base font-semibold text-blood-red"
                                    >
                                        {section}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
      
    );
};

export default Experience;