import './App.css';
import React, { useEffect, useState } from 'react';
import HomeButton from "./components/HomeButton";
import Cursor from "./components/Cursor";
import NavMenu from './components/NavMenu';
import Encrypt from './components/Encrypt';
import { motion } from 'framer-motion';
import { OrbitControls, useGLTF, useScroll } from '@react-three/drei';
import { Canvas} from '@react-three/fiber';
import Eye from './components/Eye';
import ScrollDownButton from './components/ScrollDownButton';
import Marquee from 'react-fast-marquee';
import MarqueeChild from './components/MarqueeChild';
import { CardBody, CardContainer, CardItem } from "./components/3DCard";
import RippleButton from './components/RippleButton';
import FlipLink from './components/FlipLink';
import ProjectLink from './components/ProjectLink';

function App() {  
  const[navVisiblility, setNavVisibility] = useState(true);
  const[navMenuVisibility, setNavMenuVisibility] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY < window.innerHeight / 4) {
        setNavVisibility(true);
      } else {
        setNavVisibility(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col z-10 cursor-none">
      <Cursor/>
      <header className="fixed top-0 left-0 w-screen h-24 z-50 flex flex-row justify-between px-3 md:px-10 items-center cursor-auto">
        <HomeButton/>
        <NavMenu className="lg:hidden"/>
        <div className="hidden lg:flex">
          <motion.div
            initial={{ x: '100%', opacity: 0}}
            animate={{ x: navVisiblility ? '100%' : 0, opacity: navVisiblility ? 0 : 1, display: navVisiblility ? 'none' : 'flex' }} // Show on top, hide when scrolling down
            transition={{ duration: 0.5, delay: navVisiblility ? 0 : 0.6 }}
          >
            <NavMenu/>
          </motion.div>
          <motion.nav 
            className="text-blood-red hidden lg:flex gap-6 h-full justify-center items-center relative"
            initial={{ x: 0, opacity: 1}}
            animate={{ x: navVisiblility ? 0 : '100%', opacity: navVisiblility ? 1 : 0, display: navVisiblility ? 'flex' : 'none' }} // Show on top, hide when scrolling down
            transition={{ duration: 0.5, delay: navVisiblility ? 0.6 : 0 }}
          >
            <motion.a href="#About" variants={itemVariants} onClick={() => setActive((prevState) => !prevState)}>
                <FlipLink>About</FlipLink>
            </motion.a>
            <motion.a href="#Projects" variants={itemVariants} onClick={() => setActive((prevState) => !prevState)}>
                <FlipLink>Projects</FlipLink>
            </motion.a>
            <motion.a href="#Experience" variants={itemVariants} onClick={() => setActive((prevState) => !prevState)}>
                <FlipLink>Experience</FlipLink>
            </motion.a>
            <motion.a href="#Contact" variants={itemVariants} onClick={() => setActive((prevState) => !prevState)}>
                <FlipLink>Contact</FlipLink>
            </motion.a>
          </motion.nav>
        </div>
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
          <div className="w-screen md:w-10/12 xl:w-4/5 px-6 lg:px-0 text-blood-red flex flex-col md:flex-row gap-10 xl:gap-20">
            <CardContainer className="bg-night cursor-pointer z-50 w-full border-2 border-night hover:border-blood-red rounded-3xl">
              <CardBody className="h-auto w-full flex flex-col gap-5 px-3 md:px-6 py-6 rounded-3xl items-center transition duration-300 ease-in-out hover:shadow-[0_0_20px_5px_#70110A]">
                <CardItem
                  translateZ="50"
                  className="font-montserrat text-center font-bold text-2xl lg:text-4xl"
                >
                  <h2>Hey, I'm Wes!</h2>
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="40"
                  className="font-lora text-base lg:text-xl font-semibold leading-relaxed"
                >
                  I am a recent graduate from the Colorado School of Mines with a computer science degree. I am passionate about software development, game development, and have recently developed an interest in web development this past year. I am always excited to grow and learn new skills while adapting to new tech stacks and tools. As I prepare for graduation, I look forward to pursuing a career in software development, with a keen interest in exploring opportunities in front-end, full-stack, and other areas of the field.
                </CardItem>
                <CardItem
                  as="a"
                  href="/Hu_Wesley_Resume.pdf"
                  target="_blank"
                  translateZ="60"
                  className="self-center font-bold text-2xl font-raleway"
                >
                  <RippleButton>My Resume</RippleButton>
                </CardItem>
              </CardBody>
            </CardContainer>
            <div className="w-full md:w-1/2 z-30  flex flex-col justify-center items-center h-auto ">
              <div className="w-full bg-night border-2 py-6 border-night hover:border-blood-red rounded-3xl transition duration-300 ease-in-out hover:shadow-[0_0_20px_5px_#70110A] cursor-auto">
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
                    <MarqueeChild>HTML</MarqueeChild>
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
        </div>

        <div id="Projects" className="w-screen min-h-screen pt-28 flex flex-col items-center">
          <h1 className="font-rubik text-blood-red font-extrabold text-4xl lg:text-5xl text-center mb-10 lg:mb-20">MY PROJECTS</h1>
          <div className="w-screen md:w-3/4">
            <div className="mx-auto cursor-pointer overflow-hidden py-20">
              <ProjectLink heading="PERSONAL PORTFOLIO" subheading="The Website You Are Viewing" imgSrc="portfolio.png"/>
              <ProjectLink heading="LINE DODGE" subheading="Simple Arcade Style Web Game" imgSrc="linedodge.png"/>
              <ProjectLink heading="SIPWARS" subheading="Multiplayer Party Trivia Game" imgSrc="sipwars.png"/>              
              <ProjectLink heading="ATO WEBSITE" subheading="Website for Local Fraternity Chapter" imgSrc="ATO.png"/>
            </div>
            
          </div>
        </div>
        <div id="Experience" className="h-screen text-white">Experience Under Construction</div>
        <div id="Contact" className="h-screen text-white">Contact Form Under Construction</div>
      </main>
    </div>
  );
}



const itemVariants = {
  initial: { opacity: 0, x: -20 , scale: 0, scaleX: 0 },
  animate: { opacity: 1, x: 0, scale: 1, scaleX: 1 },
  exit: { opacity: 0, x: +20, scale: 0, scaleX: 0  },
};

useGLTF.preload('/public/test.glb');

export default App;
