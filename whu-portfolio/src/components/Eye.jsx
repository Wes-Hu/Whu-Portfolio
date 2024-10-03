import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Eye = () => {
  const meshRef = useRef();
  const targetQuaternion = useRef(new THREE.Quaternion());
  const { camera } = useThree(); // Access the camera directly

  // Load the custom 3D model (GLTF/GLB file)
  const { scene } = useGLTF('/public/test.glb'); // Replace with the correct path to your model

  // Capture mouse movement and touch events
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse position between -1 and 1
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Calculate the target rotation based on mouse position
      const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
      vector.unproject(camera); // Use the camera from useThree

      // Calculate direction from the eye to the mouse position
      const direction = vector.sub(meshRef.current.position).normalize();
      
      // Set the target quaternion for the eye to look at the target position
      targetQuaternion.current.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction);
    };

    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      // Normalize touch position between -1 and 1
      const mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;

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
      meshRef.current.quaternion.slerp(targetQuaternion.current, 0.1); // Adjust the slerp factor for speed
    }
  });

  return (
    <primitive ref={meshRef} object={scene} scale={0.5} />
  );
};

export default Eye;
