import './App.css';
import HomeButton from "./components/HomeButton";
import Cursor from "./components/Cursor";
import NavMenu from './components/NavMenu';
import Encrypt from './components/Encrypt';
import { motion } from 'framer-motion';

function App() {  
  return (
    <div className="flex flex-col z-10 cursor-none">
      <Cursor/>
      <header className="fixed top-0 left-0 w-screen h-24 z-50 flex flex-row justify-between px-3 md:px-10 items-center">
        <HomeButton/>
        <NavMenu/>
      </header>
      <main className="flex flex-col">
        <div id="Home" className="w-screen h-screen flex justify-center items-center px-5">
          <motion.div 
            initial={{x: -300, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 0.5, ease: "easeInOut"}}
            className="w-full md:w-11/12 xl:w-4/5 2xl:w-3/4 h-1/2 md:h-auto"
          >
            {/* H1 animation */}
            <motion.h1
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="font-rubik text-blood-red text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold mb-1 select-none"
            >
              WESLEY HU
            </motion.h1>
            {/* Encrypt animation starts with delay */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }} // Add delay for Encrypt
            >
              <Encrypt />
            </motion.div>
          </motion.div>
        </div>
        <div id="About" className="h-screen"></div>
        <div id="Projects" className="h-screen"></div>
        <div id="Experience" className="h-screen"></div>
        <div id="Contact" className="h-screen bg-white"></div>
      </main>
    </div>
  );
}

export default App;
