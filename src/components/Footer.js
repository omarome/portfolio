import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import '../style/Footer.css';

const Footer = () => {
  const [ref, inView] = useInView({
      threshold: 0.1, // Adjust the threshold value to trigger the animation earlier
      triggerOnce: false, // Ensure the animation triggers every time the element comes into view
    });
  
    const footerTextVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 2 } },
    };
  
  return (
    <footer>
          <motion.div
                  className="intro-section-text"
                  ref={ref}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  variants={footerTextVariants}
                >
      <p className='footer-text'>©{new Date().getFullYear()} Omar Al-Mashhadani. All rights reserved.</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
