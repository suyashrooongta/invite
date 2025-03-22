import React, { useState, useEffect } from 'react';
import './index.css';
import { motion, AnimatePresence } from 'framer-motion';

const FancyFramedImage = ({ imageUrl, altText }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
    };
    img.src = imageUrl;
  }, [imageUrl]);

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.img
          key={imageUrl} // Important for AnimatePresence
          src={imageUrl}
          alt={altText}
          className="fancy-framed-image max-w-3xl rounded-lg shadow-xl"
          initial={{ opacity: 0 }} // Initial animation state
          animate={{ opacity: 1 }} // Animation when loaded
          exit={{ opacity: 0 }} // Animation when unmounted
          transition={{ duration: 1.5 }} // Animation duration
          style={{
            maxWidth: '80vw',
            maxHeight: '75vh',
            width: 'auto',
            transform: 'translateY(-5vh)',
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default FancyFramedImage;
