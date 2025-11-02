import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'motion/react';
import '../style/ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Use multiple methods for better cross-browser compatibility
      const scrollTop = window.pageYOffset || 
                        document.documentElement.scrollTop || 
                        document.body.scrollTop || 
                        0;
      
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check
    toggleVisibility();

    // Add scroll listeners with multiple options for Android browsers
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    window.addEventListener('touchmove', toggleVisibility, { passive: true });
    document.addEventListener('scroll', toggleVisibility, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('touchmove', toggleVisibility);
      document.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    // Use multiple methods for better cross-browser compatibility
    if ('scrollBehavior' in document.documentElement.style) {
      // Modern browsers with smooth scroll support
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      // Fallback for older browsers (including some Android browsers)
      const scrollStep = -window.scrollY / (500 / 15);
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 15);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          aria-label="Scroll to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;

