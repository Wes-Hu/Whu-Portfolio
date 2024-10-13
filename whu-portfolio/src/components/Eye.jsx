import { useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}


const Eye = () => {
  const windowSize = useWindowSize();
  const width = windowSize.width || 0;

  // Adjusted values based on breakpoints
  let positionX = 0;
  let positionY = 0;
  let eyeScale = 1;

  if (width <= 640) {
    // sm
    positionX = 0;
    positionY = -0.5;
    eyeScale = 0.8;
  } else if (width <= 768) {
    // md
    positionX = 0;
    positionY = -1;
    eyeScale = 0.9;
  } else if (width <= 1024) {
    // lg
    positionX = 2;
    positionY = 0;
    eyeScale = 1.0;
  } else if (width <= 1440) {
    // xl
    positionX = 2.5;
    positionY = 0;
    eyeScale = 1.2;
  } else {
    positionX = 2.2;
    positionY = 0;
    eyeScale = 1.5;
  }

  const meshRef = useRef();
  const targetQuaternion = useRef(new THREE.Quaternion());
  const { camera } = useThree(); // Access the camera directly

  // Load the custom 3D model (GLTF/GLB file)
  const { scene } = useGLTF('Eye.glb'); // Replace with the correct path to your model

  // Capture mouse movement and touch events
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse position between -1 and 1
      const factor = 4; // Increase this value to make the eye rotate more
      const mouseX = ((event.clientX / window.innerWidth) * 2 - 1) * factor;
      const mouseY = (-(event.clientY / window.innerHeight) * 2 + 1) * factor;

      // Calculate the target rotation based on mouse position
      const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
      vector.unproject(camera); // Use the camera from useThree

      // Calculate direction from the eye to the mouse position
      const direction = vector.sub(meshRef.current.position).normalize();
      
      // Set the target quaternion for the eye to look at the target position
      targetQuaternion.current.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
    };

    const handleTouchStart = (event) => {
      const factor = 4;
      const touch = event.touches[0];
      const mouseX = ((touch.clientX / window.innerWidth) * 2 - 1) * factor;
      const mouseY = (-(touch.clientY / window.innerHeight) * 2 + 1) * factor;

      // Calculate the target rotation based on touch position
      const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
      vector.unproject(camera); // Use the camera from useThree

      // Calculate direction from the eye to the touch position
      const direction = vector.sub(meshRef.current.position).normalize();
      
      // Set the target quaternion for the eye to look at the target position
      targetQuaternion.current.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [camera]); // Add camera to dependencies

  useFrame(() => {
    if (meshRef.current) {
      // Smoothly interpolate the eye's rotation to the target quaternion
      meshRef.current.quaternion.slerp(targetQuaternion.current, 0.3); // Adjust the slerp factor for speed
    }
  });

  return (
    <primitive ref={meshRef} position={[positionX, positionY, 0]} object={scene} scale={eyeScale} />
  );
};

export default Eye;
