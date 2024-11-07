import { motion } from "framer-motion";

const MarqueeChild = ({children}) => {
    return (
        <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.1, ease: 'easeInOut'}} 
            className="inline-flex m-2 bg-blood-red px-3 py-2 mx-3 my-6 italic rounded-xl font-semibold z-30 font-raleway transition-all duration-300 ease-in-out hover:text-burnt-sienna select-none"
        >
            {children}
        </motion.div>
    );
}

export default MarqueeChild;