import React, { useEffect, useRef } from "react";

const Cursor = () => {
  const coords = { x: 0, y: 0 };
  const circlesRef = useRef([]);

  useEffect(() => {
    const circles = circlesRef.current;

    circles.forEach((circle, index) => {
      circle.x = 0;
      circle.y = 0;
    });

    const handleMouseMove = (e) => {
      coords.x = e.pageX;
      coords.y = e.pageY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animateCircles = () => {
      let x = coords.x;
      let y = coords.y;

      circles.forEach((circle, index) => {
        if (!circle) return;

        circle.style.left = x - 12 + "px";
        circle.style.top = y - 12 + "px";

        // Apply the scale effect
        const scale = (circles.length - index) / circles.length;
        circle.style.transform = `scale(${scale})`;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.25;
        y += (nextCircle.y - y) * 0.25;
      });

      requestAnimationFrame(animateCircles);
    };

    animateCircles();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="mix-blend-difference">
      {[...Array(30)].map((_, index) => (
        <div
          key={index}
          ref={(el) => (circlesRef.current[index] = el)}
          className="h-8 w-8 z-0 rounded-full bg-blood-red absolute top-0 left-0 circle opacity-0 lg:opacity-100"
          style={{ pointerEvents: 'none', transform: 'scale(1)' }}
        />
      ))}
    </div>
  );
};

export default Cursor;
