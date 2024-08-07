import { Route, Routes } from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage';
import { motion } from 'framer-motion';
import Example from "./components/WetPaintButton";
import Drip from "./components/Drip";
import { useState } from "react";

function App() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-screen h-24 z-50 flex flex-row justify-between px-10 items-center">
        <motion.a
            whileHover={{ scale: 1.1}}
            whileTap={{ scale: 0.9 }}
            href="/"
            className="group relative bg-blood-red w-16 h-16 p-2 rounded-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img className="w-full h-full" src="/HuLogoWhite.png" alt="Logo" />
            {isHovered && (
              <>
                <Drip left="20%" height={5} delay={0} />
                <Drip left="57%" height={10} delay={1.75} />
              </>
            )}
          </motion.a>
          
      </header>
      <main className="flex-grow pt-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes> 
      </main>

    </div>
  )
}

export default App
