import React, { useState } from 'react';

function PageTemplate() {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  };

  return (
    <div
      className="w-screen h-screen relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background layer*/}
      <div
        className="absolute inset-0 dot-grid z-0"
        style={{
          WebkitMaskImage: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 500px)`,
          maskImage: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 500px)`,
        }}
      ></div>
      {/* Foreground content */}
      <div className="relative z-10">

      </div>
    </div>
  );
}

export default PageTemplate;
