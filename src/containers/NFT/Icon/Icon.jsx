import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Inventory from '../Inventory/Inventory';
import '../Inventory/Inventory.css';

const Icon = ({ twitter_handle, wallet }) => {
  const [hoveringIcon, setHoveringIcon] = useState(false);
  const rootRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      // Clean up the listener when the component is unmounted
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (hoveringIcon) {
      // Clear any existing timeout
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      const mountPoint = document.getElementById('layers');
      if (!mountPoint) {
        console.error('No element with ID "layers" found');
        return;
      }

      // Always create a new root when hovering
      rootRef.current = createRoot(mountPoint);

      rootRef.current.render(
        <Inventory
          onNFTTableLeave={() => setHoveringIcon(false)}
          onNFTTableEnter={() => setHoveringIcon(true)}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
          twitter_handle={twitter_handle}
          wallet={wallet}
        />
      );
    } else {
      timeoutIdRef.current = setTimeout(async () => {
        // Use a promise-based approach to ensure React finishes rendering
        await Promise.resolve();
        if (rootRef.current) {
          rootRef.current.unmount();
          rootRef.current = null; // Dispose of the old root after unmounting
        }
      }, 500);
    }

    // Cleanup on unmount
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      if (rootRef.current) {
        rootRef.current.unmount();
      }
    };
  }, [hoveringIcon]);

  return (
    <div
      className="NFTIcon"
      id="NFTIcon"
      onMouseEnter={() => setHoveringIcon(true)}
    >
      <img
        alt=""
        draggable="false"
        src="https://register.ckanvita.com/logo.png"
        className="r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-f9ja8p r-og9te1 r-bnwqim r-1plcrui r-lrvibr"
      ></img>
      &nbsp;
    </div>
  );
};

export default Icon;
