import { GoDotFill } from 'react-icons/go';
import { motion, AnimatePresence } from 'framer-motion';

const Experience = ({position, company, year}) => {
    return(              
        
        <motion.div
            initial="initial"
            whileHover="whileHover"
            className="" 
        >
            <div className="relative w-1 h-24 bg-blood-red">  
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-night border-blood-red border-4">
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col">
                        <motion.h1
                            variants={{
                                initial: { y: 0 },
                                whileHover: { y: 0 }
                            }}
                            transition={{ type: "spring", repeat: Infinity }} 
                            className="font-rubik text-blood-red font-bold text-xl text-nowrap"
                        >
                                {position}
                        </motion.h1>
                        <h2 className="font-montserrat flex items-center text-blood-red font-bold text-base text-nowrap">
                            {company}<GoDotFill className="mx-1"/>{year}
                        </h2>
                    </div>
                </div>
            </div>
        </motion.div>
      
    );
};

export default Experience;