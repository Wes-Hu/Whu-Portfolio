import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Eye = () => {
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

export default Eye;