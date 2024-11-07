import './App.css';
import React from 'react';
import HomeButton from "./components/HomeButton";
import Cursor from "./components/Cursor";
import NavMenu from './components/NavMenu';
import Encrypt from './components/Encrypt';
import { motion } from 'framer-motion';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas} from '@react-three/fiber';
import Eye from './components/Eye';
import ScrollDownButton from './components/ScrollDownButton';
import Marquee from 'react-fast-marquee';
import MarqueeChild from './components/MarqueeChild';

function App() {  
  return (
    <div className="flex flex-col z-10 cursor-none">
      <Cursor/>
      <header className="fixed top-0 left-0 w-screen h-24 z-50 flex flex-row justify-between px-3 md:px-10 items-center cursor-auto overflow-hidden">
        <HomeButton/>
        <NavMenu/>
      </header>
      <main className="flex flex-col">
        <div id="Home" className="w-screen min-h-screen h-screen flex flex-col justify-center items-center px-5 2xl:px-0">
          <motion.div 
            initial={{x: -300, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 0.5, ease: "easeInOut"}}
            className="w-full md:w-11/12 xl:w-4/5 2xl:w-3/4 pb-64 lg:pb-0"
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
          <div className="w-screen h-screen absolute"> 
            <Canvas className="">
              <Eye/>
            </Canvas>
          </div>
          <ScrollDownButton/>
        </div>

        <div id="About" className="w-screen min-h-screen pt-28 flex flex-col items-center">
          <h1 className="font-rubik text-blood-red font-extrabold text-4xl lg:text-5xl text-center mb-10 lg:mb-20">ABOUT ME</h1>              
          <div className="w-screen lg:w-4/5 px-3 lg:px-0  text-blood-red flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/2 flex flex-col justify-center px-3 md:px-6 border-2 border-blood-red py-6 rounded-3xl shadow-lg shadow-blood-red">
              <h2 className="font-montserrat text-center font-bold text-2xl lg:text-4xl mb-5">Hey, I'm Wes!</h2>
              <p className="font-lora text-base lg:text-xl font-semibold leading-relaxed mb-5">I am a senior undergraduate student at the Colorado School of Mines pursuing a degree in Computer Science, set to graduate in December 2024. I am passionate about software development, game development, and have recently developed an interest in web development this past year. I am always excited to grow and learn new skills while adapting to new tech stacks and tools. As I prepare for graduation, I look forward to pursuing a career in software development, with a keen interest in exploring opportunities in front-end, full-stack, and other areas of the field.</p>
              <a href="/Hu_Wesley_Resume.pdf" target="_blank" className="self-center font-bold text-2xl font-raleway border-2 rounded-full border-blood-red px-10 py-3">My Resume</a>      
            </div>              
            <div className="w-full md:w-1/2 flex flex-col items-center h-auto">
              <h1 className="font-montserrat text-center text-blood-red font-semibold text-3xl lg:text-4xl mb-5">Skills</h1>
              <div className="max-w-full overflow-hidden flex text-night">
                <Marquee autoFill pauseOnClick gradient speed={20} gradientColor="#090A0C" gradientWidth={100}>
                  <MarqueeChild>Java</MarqueeChild>
                  <MarqueeChild>Python</MarqueeChild>
                  <MarqueeChild>C++</MarqueeChild>
                  <MarqueeChild>C#</MarqueeChild>
                  <MarqueeChild>Linux</MarqueeChild>
                  <MarqueeChild>PostgreSQL</MarqueeChild>
                  <MarqueeChild>MySQL</MarqueeChild>
                  <MarqueeChild>Supabase</MarqueeChild>
                </Marquee>
              </div>
              <div className="max-w-full overflow-hidden flex text-night">
                <Marquee autoFill pauseOnClick gradient direction='right' speed={20} gradientColor="#090A0C" gradientWidth={100}>
                  <MarqueeChild>Javascript</MarqueeChild>
                  <MarqueeChild>Typescript</MarqueeChild>
                  <MarqueeChild>React</MarqueeChild>
                  <MarqueeChild>Tailwind CSS</MarqueeChild>
                  <MarqueeChild>CSS</MarqueeChild>
                  <MarqueeChild>Figma</MarqueeChild>
                  <MarqueeChild>Framer Motion</MarqueeChild>
                </Marquee>
              </div>
              <div className="max-w-full overflow-hidden flex text-night">
                <Marquee autoFill pauseOnClick gradient speed={20} gradientColor="#090A0C" gradientWidth={100}>
                  <MarqueeChild>GameMaker Studio</MarqueeChild>
                  <MarqueeChild>Unity</MarqueeChild>
                  <MarqueeChild>Blender</MarqueeChild>
                  <MarqueeChild>Cascadeur</MarqueeChild>

                </Marquee>
              </div>
            </div>
          </div>
        </div>

        <div id="Projects" className="h-screen text-white">Projects Under Construction</div>
        <div id="Experience" className="h-screen text-white">Experience Under Construction</div>
        <div id="Contact" className="h-screen text-white">Contact Form Under Construction</div>
      </main>
    </div>
  );
}

useGLTF.preload('/public/test.glb');

export default App;
