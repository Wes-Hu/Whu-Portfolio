import { motion } from "framer-motion";

const TransitionScreen = ({text}) => {
    return (
        <motion.div
            initial={{ scale: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, x: "-50%", y: "-50%" }}
            exit={{ scale: 0, x: "-50%", y: "-50%"}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-1/2 left-1/2 w-[150vw] h-[150vh] rounded-full bg-blood-red z-50 flex items-center justify-center"
          >
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0}}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}

                className="font-rubik font-extrabold text-night text-5xl"
            >
                {text}        
            </motion.h1>
          </motion.div>
    );
}

export default TransitionScreen;