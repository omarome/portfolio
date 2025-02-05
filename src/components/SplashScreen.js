import React from 'react';
import logo  from '../assets/myNameIcon.png';
import { motion } from "motion/react"
import '../style/SplashScreen.css';

function SplashScreen({ onAnimationComplete }) {

  return (
    <div className="splash-screen">
      <motion.ul  
        className="splash-screen"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2 }}
        onAnimationComplete={onAnimationComplete} >
      <h1 className='splash-title'>Welcome to My Portfolio</h1>
      <img src={logo} alt="Logo" className="splash-logo" />
      </motion.ul>
    </div>
  )
};

export default SplashScreen;
