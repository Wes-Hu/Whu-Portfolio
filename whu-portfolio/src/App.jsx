import './App.css';
import HomeButton from "./components/HomeButton";
import Cursor from "./components/Cursor";
import NavMenu from './components/NavMenu';
import Encrypt from './components/Encrypt';
import { motion } from 'framer-motion';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RotatingCube = () => {
  const meshRef = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });

  // Load the custom 3D model (GLTF/GLB file)
  const { scene } = useGLTF('/public/test.glb');  // Replace with the correct path to your model

  // Capture mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse position between -1 and 1
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ camera }) => {
    if (meshRef.current) {
      // Create a vector that points to the mouse position in 3D space
      const vector = new THREE.Vector3(mousePosition.current.x, mousePosition.current.y, 0.5); // Set z value accordingly
      vector.unproject(camera); // Unproject to convert to world coordinates
      
      // Calculate direction from the cube to the mouse position
      const direction = vector.sub(meshRef.current.position).normalize();
      
      // Set the cube's rotation to look at the direction of the mouse
      meshRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction); // Adjust if the model's front is not aligned to the Z-axis
    }
  });

  return (
    <primitive ref={meshRef} object={scene} scale={0.5}></primitive>
  );
};

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
          <Canvas style={{width: '100vw', height: '50vh', position:'fixed',}} camera={{ position: [0, 0, 2], fov: 75 }}>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate/>
            <directionalLight position={[1, 1, 1]} intensity={100} color={0x9CDBA6}/>
            <RotatingCube/>
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

export default App;
