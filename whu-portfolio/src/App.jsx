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
import Experience from './components/Experience';


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
                    <MarqueeChild>JavaScript</MarqueeChild>
                    <MarqueeChild>TypeScript</MarqueeChild>
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
          <div className="w-screen md:w-3/4 xl:w-[60%]">
            <div className="px-6 md:px-0 mx-auto cursor-pointer overflow-hidden py-20">
              <ProjectLink 
                heading="LINE DODGE" 
                subheading="Simple Arcade Style Web Game" 
                imgSrc="linedodge.png" 
                description="Line Dodge is a simple web game that I worked on for the final project in a Web Development class. I primarily focused on the UI and managing menu and game states. For the design I thought an arcade game theme would suit the simple nature of the game so I added a CRT effect and pixel text."
                techStack={"JavaScript,HTML,CSS"}
                link={"https://linedodge.pro/"}
              />
              <ProjectLink 
                heading="SIPWARS" 
                subheading="Multiplayer Party Trivia Game" 
                imgSrc="sipwars.png"
                description="SipWars is a party trivia game that was designed to be similar to kahoot or jackbox where people can create lobbies and play with their friends on. The game utilizes WebSockets for device communication as well as Redis to manage game states. I worked on the front-end side of this project making sure that the WebSockets worked properly on the client-side and that the game states were updating correctly. Currently, the game is best designed for mobile use."
                techStack={"JavaScript, React, TailwindCSS, WebSockets, Redis"}
                link={"https://sipwars.lol/"}
              />              
              <ProjectLink 
                heading="ATO WEBSITE" 
                subheading="Website for Local Fraternity Chapter" 
                imgSrc="ATO.png"
                description={"This was a website I designed using Figma and created for my fraternity's local chapter. The purpose of the website is to showcase what the chapter is about and to help with recruitment. I implemented Supabase to manage the entire backend of the website including the databases, authentication, file/image storage. To allow for easy modification and updates, an admin login and page is implmented to easily change pictures and other parts of the website with ease through the front-end."}
                techStack={"TypeScript, React, TailwindCSS, Supabase"}
                link={"https://atocsm.com/"}
              />
            </div>
            
          </div>
        </div>
        <div id="Experience" className="w-screen min-h-screen pt-28 flex flex-col items-center">
          <h1 className="font-rubik text-blood-red font-extrabold text-4xl lg:text-5xl text-center mb-10 lg:mb-20">EXPERIENCE</h1>
          <div className="relative w-full md:w-3/4 xl:w-[60%] px-8 py-20">
            <div className="w-1 h-6 bg-blood-red rounded-t-full"/>
            <Experience position={"Software Engineering Intern"} company={"Modyfi"} year={"2024"}/>
            <Experience position={"Teaching Assistant"} company={"Colorado School of Mines"} year={"2024"}/>
            <div className="w-1 h-12 bg-blood-red rounded-b-full"/>
          </div>
        </div>
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

