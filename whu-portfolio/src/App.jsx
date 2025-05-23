  import './App.css';
  import React, { useEffect, useState, useRef, useCallback } from 'react';
  import HomeButton from "./components/HomeButton";
  import Cursor from "./components/Cursor";
  import NavMenu from './components/NavMenu';
  import Encrypt from './components/Encrypt';
  import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
  import { OrbitControls, useGLTF } from '@react-three/drei';
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
  import ContactForm from './components/ContactForm';
  import LoadingScreen from './components/LoadingScreen';
  import MagneticEffect from './components/MagneticEffect';
  import { FaGithub, FaLinkedin } from 'react-icons/fa';
  import { MdEmail} from "react-icons/md";
  import TransitionScreen from './components/TransitionScreen';


  function App() {  
    const [ hideCursor, setHideCursor ] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [ activeSection, setActiveSection] = useState("Home");

    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const projectsRef = useRef(null);
    const experienceRef = useRef(null);
    const contactRef = useRef(null);

    useEffect(() => {
      const loadingTimer = setTimeout(() => setIsLoading(false), 4000);
      const contentTimer = setTimeout(() => setShowContent(true), 4200);
      return () => {
        clearTimeout(loadingTimer);
        clearTimeout(contentTimer);
      };
    }, []);

    useEffect(() => {
      if (!showContent) return;

      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
      };
    
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
          }
        });
      }, options);
    
      const sections = [
        homeRef.current,
        aboutRef.current,
        projectsRef.current,
        experienceRef.current,
        contactRef.current,
      ];
    
      sections.forEach(section => {
        if (section) observer.observe(section);
      });
    
      return () => {
        sections.forEach(section => {
          if (section) observer.unobserve(section);
        });
      };
    }, [showContent]);

    return (
      <div className="flex flex-col cursor-none">
        <AnimatePresence>
          {isLoading && <LoadingScreen/>}
        </AnimatePresence>
        <Cursor hideCursor={hideCursor}/>
        <Header setHideCursor={setHideCursor} activeSection={activeSection} setActiveSection={setActiveSection}/>
        {showContent && (
          <main className="flex flex-col">
            <Home setHideCursor={setHideCursor} sectionRef={homeRef}/>
            {/* <motion.div className="w-screen h-screen">
            </motion.div> */}
            <About setHideCursor={setHideCursor} sectionRef={aboutRef} />
            <Projects setHideCursor={setHideCursor} sectionRef={projectsRef}/>
            <Experiences setHideCursor={setHideCursor} sectionRef={experienceRef}/>
            <Contact setHideCursor={setHideCursor} sectionRef={contactRef}/>
          </main>
        )}
      </div>
    );
  }

  const Header = ({ setHideCursor, activeSection, setActiveSection }) => {
    const[ navVisiblility, setNavVisibility ] = useState(true);
    const [ transitionText, setTransitionText ] = useState(null);
    const [ isTransitioning, setIsTransitioning ] = useState(false);
    const [shouldRenderNav, setShouldRenderNav] = useState(!navVisiblility);

    useEffect(() => {
      if(activeSection == "Home") {
        setNavVisibility(true);
      } else {
        setNavVisibility(false);
      }
    }, [activeSection]);

    useEffect(() => {
      if (!navVisiblility) {
        setShouldRenderNav(true); // show it
      }
    }, [navVisiblility]);

    const handleLinkClick = useCallback((text, id) => {
      if (activeSection === id) return;
    
      setTransitionText(text);
      setIsTransitioning(true);
      setActiveSection(id);
    
      setTimeout(() => {
        const section = document.querySelector(`#${id}`);
        if (section) {
          section.scrollIntoView({ behavior: 'instant' });
        }
      }, 1000);
    
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1500);
    }, [activeSection]);

    const itemVariants = {
      initial: { opacity: 0, x: -20 , scale: 0, scaleX: 0 },
      animate: { opacity: 1, x: 0, scale: 1, scaleX: 1 },
      exit: { opacity: 0, x: +20, scale: 0, scaleX: 0  },
    };

    return (
      <header className="fixed top-0 left-0 w-screen h-24 z-[48] flex flex-row justify-between px-3 md:px-10 items-center cursor-pointer select-none">
        <AnimatePresence>
          {isTransitioning && <TransitionScreen text={transitionText}/>}
        </AnimatePresence>
        <HomeButton handleLinkClick={handleLinkClick}/>
        <NavMenu className="lg:hidden" handleLinkClick={handleLinkClick} isTransitioning={isTransitioning}/>
        <div className="hidden lg:flex">
          <motion.div
            initial={{ x: '100%', opacity: 0}}
            animate={{ x: navVisiblility ? '100%' : 0, opacity: navVisiblility ? 0 : 1, display: navVisiblility ? 'none' : 'flex' }}
            transition={{ duration: 0.5, delay: navVisiblility ? 0 : 0.6 }}
          >
            <NavMenu handleLinkClick={handleLinkClick} isTransitioning={isTransitioning}/>
          </motion.div>
          <motion.nav
            onMouseEnter={() => setHideCursor(true)} 
            onMouseLeave={() => setHideCursor(false)}  
            className="text-blood-red hidden lg:flex gap-6 h-full justify-center items-center relative"
            initial={{ x: 0, opacity: 1}}
            animate={{ x: navVisiblility ? 0 : '100%', opacity: navVisiblility ? 1 : 0, display: navVisiblility ? 'flex' : 'none' }}
            transition={{ duration: 0.5, delay: navVisiblility ? 0.6 : 0 }}
          >
            <motion.a
              href="#About"
              variants={itemVariants}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("ABOUT ME", "About");
              }}
            >
                <MagneticEffect intensity={0.6}>
                  <FlipLink>About</FlipLink>
                </MagneticEffect>
            </motion.a>
            <motion.a 
              href="#Projects"
              variants={itemVariants}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("MY PROJECTS", "Projects");
              }}
            >
                <MagneticEffect intensity={0.6}>
                  <FlipLink>Projects</FlipLink>
                </MagneticEffect>
            </motion.a>
            <motion.a
              href="#Experience"
              variants={itemVariants}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("EXPERIENCE", "Experience");
              }}
            >
                <MagneticEffect intensity={0.6}>
                  <FlipLink>Experiences</FlipLink>
                </MagneticEffect>
            </motion.a>
            <motion.a
              href="#Contact"
              variants={itemVariants}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("CONTACT ME", "Contact");
              }}
            >
                <MagneticEffect intensity={0.6}>
                  <FlipLink>Contact</FlipLink>
                </MagneticEffect>
            </motion.a>
          </motion.nav>
        </div>
      </header>
    );
  };

  const Home = ({ setHideCursor, sectionRef }) => {
    const { scrollY } = useScroll();
    const scrollRange = typeof window !== 'undefined' ? window.innerHeight * 0.25 : 100;

    const titleOpacity = useSpring(useTransform(scrollY, [0, scrollRange], [1, 0]), { stiffness: 60, damping: 15 });
    const titleX = useSpring(useTransform(scrollY, [0, scrollRange], [0, -scrollRange/2]), {stiffness: 60, damping: 15 });

    const eyeOpacity = useSpring(useTransform(scrollY, [0, scrollRange], [1, 0]), { stiffness: 60, damping: 15 });
    const eyeX = useSpring(useTransform(scrollY, [0, scrollRange], [0, scrollRange/2]), {stiffness: 60, damping: 15 });

    return(
      <div ref={sectionRef} id="Home" className="w-screen min-h-screen h-screen flex flex-col justify-center items-center px-5 2xl:px-0 ">
        <motion.div
          style={{ opacity: titleOpacity, x: titleX }}
          className="w-full md:w-11/12 xl:w-4/5 2xl:w-3/4 pb-64 lg:pb-0 overflow-hidden"
        >
          <motion.h1
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
            className="font-rubik text-blood-red text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold mb-1 select-none"
          >
            WESLEY HU
          </motion.h1>
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
          >
            <Encrypt />
          </motion.div>
        </motion.div>
        <div className="w-screen h-screen absolute top-0 left-0 overflow-hidden z-0">
          <motion.div
            style={{ opacity: eyeOpacity, x: eyeX }}
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          >
            <Canvas className="w-full h-full">
              <Eye />
            </Canvas>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
          onMouseEnter={() => setHideCursor(true)} 
          onMouseLeave={() => setHideCursor(false)}
          className="w-screen flex justify-center"
        > 
          <ScrollDownButton/>
        </motion.div>
      </div>
    );
  };

  const About = ({ setHideCursor, sectionRef }) => {
    return(
      <div ref={sectionRef} id="About" className="w-screen min-h-screen pt-28 flex flex-col items-center">
        <h1 className="font-rubik text-blood-red font-extrabold text-4xl lg:text-5xl text-center mb-10 lg:mb-20">ABOUT ME</h1>              
        <div className="w-screen md:w-10/12 xl:w-4/5 px-6 lg:px-0 text-blood-red flex flex-col md:flex-row gap-10 xl:gap-20 mb-10">
          <CardContainer 
            className="bg-night cursor-pointer w-full border-2 border-night hover:border-blood-red rounded-3xl"
          >
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
                I am a recent graduate from the Colorado School of Mines with a computer science degree. I am passionate about software development, game development, and have recently developed an interest in web development this past year. I am always excited to grow and learn new skills while adapting to new tech stacks and tools. I look forward to pursuing a career in software development, with a keen interest in exploring opportunities in front-end, full-stack, and other areas of the field.
              </CardItem>
              <CardItem
                as="a"
                href="/Hu_Wesley_Resume.pdf"
                target="_blank"
                translateZ="60"
                className="self-center font-bold text-2xl font-raleway"
              >
                <MagneticEffect intensity={0.4}>
                  <RippleButton>My Resume</RippleButton>
                </MagneticEffect>

              </CardItem>
            </CardBody>
          </CardContainer>
          <div className="w-full md:w-1/2 z-30  flex flex-col justify-center items-center h-auto ">
            <div
              onMouseEnter={() => setHideCursor(true)} 
              onMouseLeave={() => setHideCursor(false)}  
              className="w-full bg-night border-2 py-6 border-night hover:border-blood-red rounded-3xl transition duration-300 ease-in-out hover:shadow-[0_0_20px_5px_#70110A] cursor-auto overflow-hidden"
            >
              <h1 className="font-montserrat text-center text-blood-red font-semibold text-3xl lg:text-4xl mb-5">Skills</h1>
              <div className="max-w-full overflow-hidden flex text-night">
                <Marquee autoFill pauseOnClick gradient speed={20} gradientColor="#090A0C" gradientWidth={100} style={{ overflow: "hidden" }}>
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
                <Marquee autoFill pauseOnClick gradient direction='right' speed={20} gradientColor="#090A0C" gradientWidth={100} style={{ overflow: "hidden" }}>
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
                <Marquee autoFill pauseOnClick gradient speed={20} gradientColor="#090A0C" gradientWidth={100} style={{ overflow: "hidden" }}>
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
    );
  }

  const Projects = ({ setHideCursor, sectionRef }) => {
    return (
      <div ref={sectionRef} id="Projects" className="w-screen min-h-screen pt-28 flex flex-col items-center">
        <h1 className="font-rubik text-blood-red font-extrabold text-4xl lg:text-5xl text-center mb-10 lg:mb-20">MY PROJECTS</h1>
        <div className="w-screen md:w-3/4 xl:w-[60%]">
          <div 
            onMouseEnter={() => setHideCursor(true)} 
            onMouseLeave={() => setHideCursor(false)}  
            className="px-6 md:px-0 mx-auto cursor-pointer overflow-hidden py-20"
          >
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
    );
  }

  const Experiences = ({ setHideCursor, sectionRef }) => {
    const [openExperience, setOpenExperience] = useState(null);

    const toggleExperience = (position) => {
      setOpenExperience((prev) => (prev === position ? null : position));
    }

    const experiences = [
      {
        position: "Software Engineering Intern",
        company: "Modyfi",
        year: "2024",
        description: "Developed Modyfi Print, an E-Commerce platform to sell generative art prints with a focus on the front-end of the application.|Utilized React, Typescript, and TailwindCSS to create responsive web pages based on Figma Designs.|Incorperated Supabase and API's such as Stripe, Prodigi, and Google address verification to create the platform's functionality.",
      },
      {
        position: "Teaching Assistant",
        company: "Colorado School of Mines",
        year: "2024",
        description: "Teaching Assistant for Elements of Game Design and Game Development class at Colorado School of Mines.|Assisted both undergratuate and graduate students, helping them navigate through course material and assignments when needed.|Evaluated and graded assignments providing constructive feedback on performance and what could have been improved.",
      },
    ];

    const openVariants = {
      initial: { scale: 0 },
      animate: { scale: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5, ease: "easeInOut", duration: 0.5 }},
      exit: { scale: 0, transition: { ease: "easeInOut", duration: 0.5 } },
    };
    
    const containerVariants = {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5, ease: "easeInOut", duration: 0.5}},
      exit: { opacity: 0, transition: { ease: "easeInOut", duration: 0.3 } },
    };
    
    const textVariants = {
      initial: {opacity: 0, x: -15},
      animate: {opacity: 1, x: 0, transition: { duration: 1, type: "spring"}},
      exit: {opacity: 0, transition: { duration: 1, type: "spring"}},
    }

    return(
      <div ref={sectionRef} id="Experience" className="w-screen min-h-screen pt-28 flex flex-col items-center">
        <h1 className="font-rubik text-blood-red font-extrabold text-4xl lg:text-5xl text-center mb-10 lg:mb-20">EXPERIENCE</h1>
        <div 
          onMouseEnter={() => setHideCursor(true)} 
          onMouseLeave={() => setHideCursor(false)} 
          className="relative w-full md:w-3/4 xl:w-[60%] px-8 cursor-auto flex flex-row justify-between"
        >
          <div className="flex lg:hidden flex-col">
            <div className="w-1 h-6 bg-blood-red rounded-t-full"/>
            {experiences.map((exp, i) => (
              <Experience 
                key={i}
                position={exp.position}
                company={exp.company}
                year={exp.year}
                description={exp.description}
                isOpen={openExperience === i}
                toggleExperience={() => toggleExperience(i)}
              />
            ))}
            <div className="w-1 h-6 bg-blood-red rounded-b-full"/>
          </div>
          <motion.div
            initial={{ x: "20vw" }}
            animate={{ x: openExperience !== null ? "0vw" : "20vw" }}
            transition={{ duration: 0.5, ease: "easeInOut" }} 
            className="hidden lg:flex flex-col"
          >
            <div className="w-1 h-6 bg-blood-red rounded-t-full"/>
            {experiences.map((exp, i) => (
              <Experience 
                key={i}
                position={exp.position}
                company={exp.company}
                year={exp.year}
                description={exp.description}
                isOpen={openExperience === i}
                toggleExperience={() => toggleExperience(i)}
              />
            ))}
            <div className="w-1 h-6 bg-blood-red rounded-b-full"/>
          </motion.div>
          <AnimatePresence>
            {openExperience !== null && (
              <motion.div
                variants={openVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="hidden lg:flex border-2 border-blood-red max-w-[50%] h-auto rounded-3xl p-6"
              >
                <motion.div
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  key={openExperience} 
                  className="flex flex-col gap-2"
                >
                  {experiences[openExperience].description.split("|").map((section, i) => {
                    return(
                      <motion.p
                        variants={textVariants} 
                        key={`${openExperience}-${i}`}
                        className="font-lora text-xl font-semibold text-blood-red"
                      >
                        {section}
                      </motion.p>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  const Contact = ({ setHideCursor, sectionRef }) => {
    return (
      <div ref={sectionRef} id="Contact" className="w-screen min-h-screen pt-28 flex flex-col items-center">
        <h1 className="font-rubik text-blood-red font-extrabold text-4xl lg:text-5xl text-center mb-10 lg:mb-20">CONTACT ME</h1>
        <div
        onMouseEnter={() => setHideCursor(true)} 
        onMouseLeave={() => setHideCursor(false)} 
          className="relative w-full md:w-3/4 xl:w-1/2 px-8 cursor-auto mb-20"
        >
          <ContactForm/>
        </div>
        <nav
          onMouseEnter={() => setHideCursor(true)} 
          onMouseLeave={() => setHideCursor(false)} 
          className="flex flex-row gap-10">
            <a href="https://www.linkedin.com/in/wesley-hu-1bb739268/" target="_blank" className="text-blood-red">
                <motion.div 
                    className="relative block whitespace-nowrap"
                    initial={{scale: 1 }}
                    whileHover={{scale: 1.5}}
                >
                    <MagneticEffect intensity={0.6}>
                        <FaLinkedin size={50}/>
                    </MagneticEffect>
                </motion.div>
            </a>
            <a href="https://github.com/Wes-Hu" target="_blank" className="text-blood-red">
                <motion.div 
                    className="relative block whitespace-nowrap"
                    initial={{scale: 1 }}
                    whileHover={{scale: 1.5}}
                >
                    <MagneticEffect intensity={0.6}>
                        <FaGithub size={50}/>
                    </MagneticEffect>
                </motion.div>
            </a>
            <a href="mailto:wes.hu@comcast.net" className="text-blood-red">
                <motion.div 
                    className="relative block whitespace-nowrap"
                    initial={{scale: 1 }}
                    whileHover={{scale: 1.5}}
                >
                    <MagneticEffect intensity={0.6}>
                        <MdEmail size={50}/>
                    </MagneticEffect>
                </motion.div>
            </a>
        </nav>
      </div>
    );
  }

  useGLTF.preload('/public/test.glb');

  export default App;

