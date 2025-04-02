import { motion } from "framer-motion";

const TransitionScreen = ({text}) => {
    return (
        <motion.div
            initial={{ y: "-100%" }}
            animate={{  y: 0, transition: { duration: 1, ease: "easeInOut" } }}
            exit={{ y: "-100%", transition: { duration: 1, ease: "easeInOut", delay: 0.75 } }}
            className="fixed top-0 left-0 z-50 flex flex-col"
          >
            <motion.div className="w-screen h-screen bg-blood-red flex items-center justify-center">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.5, ease: "easeInOut", delay: 0.75 } }}
                    exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}

                    className="font-rubik font-extrabold text-night text-5xl"
                >
                    {text}        
                </motion.h1>
            </motion.div>
            <img
                src="/loading.svg"
                alt="Loading Screen"
                className="w-screen h-screen object-cover z-40 -translate-y-10"
            />            
          </motion.div>
    );
}

export default TransitionScreen;