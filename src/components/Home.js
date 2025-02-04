import React from 'react';
import portfolioImage from '../assets/portfolio_image.jpeg'
import keyboardImage from '../assets/keyboard.jpeg'; 
import TypingEffect from '../components/TypingEffect';
import '../style/Home.css'
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

const Home = () => {
    const [ref, inView] = useInView({
        threshold: 0.1, // Adjust the threshold value to trigger the animation earlier
        triggerOnce: false, // Ensure the animation triggers every time the element comes into view
      });
    
      const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 2 } },
      };
      
    const textArray = [
        'Hey there!',
        'Looking for a software engineer?',
        'You\'ve got it!'
      ];
  return (
    <>
        <section className="intro-section" style={{ backgroundImage: `url(${keyboardImage})` }}>
        <span>
        <TypingEffect textArray={textArray} typingSpeed={150} deletingSpeed={75} delay={2000} />
        </span>
       
        </section>
        <section className="profile-container">
            <img src={portfolioImage} alt="Omar" className="profile-image" />
        </section>
        <section className='intro-section-text'>
        <motion.div
            className="intro-section-text"
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={textVariants}
          >
            <h1 className='intro-section-header'>Hi, I'm Omar</h1>
            <p className='intro-section-paragraph'>
            I am a software engineer with a degree in Information and Communication Technology (ICT) from Metropolia University of Applied Sciences. 
            Currently, I work full-time at EKE Electronics Ltd., where I apply my skills and passion for technology to create innovative solutions.
            </p>
            </motion.div>
        </section>
      </>
  );
}

export default Home;
