import { motion } from "framer-motion";

const MarqueeChild = ({children}) => {
    return (
        <motion.div
            initial={{ scale: 1, color: "#090A0C", rotate: 0}}
            whileHover={{ scale: 1.2, color: "#EE6C4D", rotate: "3deg" }}
            transition={{ duration: 0.1, ease: 'easeInOut'}} 
            className="inline-flex m-2 bg-blood-red px-3 py-2 mx-3 my-6 italic rounded-xl font-semibold z-30 font-raleway select-none hover:shadow-[0_0_20px_5px_#70110A] shadow-blood-red"
        >
            {children}
        </motion.div>
    );
}

export default MarqueeChild;