import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.glass-card')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div
        className="cursor-dot"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`cursor-outline ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`
        }}
      />
    </>
  );
};

export default CustomCursor;
