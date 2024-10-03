import './App.css';
import HomeButton from "./components/HomeButton";
import Cursor from "./components/Cursor";
import NavMenu from './components/NavMenu';
import Encrypt from './components/Encrypt';
import { motion } from 'framer-motion';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas} from '@react-three/fiber';
import Eye from './components/Eye';

const ResponsiveCanvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
      const handleResize = () => {
          if (canvasRef.current) {
              canvasRef.current.style.width = '100%';
              canvasRef.current.style.height = `${window.innerHeight * 0.5}px`; // 50% of the viewport height
          }
      };

      window.addEventListener('resize', handleResize);
      handleResize(); // Call it once to set the initial size

      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, []);

  return (
      <Canvas
          ref={canvasRef}
          style={{
              position: 'fixed',
              top: 0,
              left: 0,
          }}
          camera={{ position: [0, 0, 2], fov: 75 }}
      >
          <OrbitControls enableZoom={false} enablePan={false} enableRotate />
          <directionalLight position={[1, 1, 1]} intensity={100} color={0x9CDBA6} />
          <Eye />
      </Canvas>
  );
};


function App() {  
  return (
    <div className="flex flex-col z-10 cursor-none">
      <Cursor/>
      <header className="fixed top-0 left-0 w-screen h-24 z-50 flex flex-row justify-between px-3 md:px-10 items-center cursor-auto">
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
          <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate/>
            <directionalLight position={[1, 1, 1]} intensity={100} color={0x9CDBA6}/>
            <Eye/>
          </Canvas>
        </div>
        <div id="About" className="h-screen"></div>
        <div id="Projects" className="h-screen"></div>
        <div id="Experience" className="h-screen"></div>
        <div id="Contact" className="h-screen bg-white"></div>
      </main>
    </div>
  );
}

useGLTF.preload('/public/test.glb');

export default App;
