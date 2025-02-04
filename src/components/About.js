import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import '../style/About.css';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1, // Adjust the threshold value to trigger the animation earlier
    triggerOnce: false, // Ensure the animation triggers every time the element comes into view
  });

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
  };
  
  return (
    <section className='about-section'>
      <h2 className='title'>About Me</h2>
      <motion.div
            className="about-section"
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={textVariants}
          >
        <p className='about-paragraph'>
          I have three years of experience in web development, with a wide range of skills in frontend and backend technologies.
          <br/>
          I am familiar with Git, Agile methodologies, Scrum, and Kanban.
          <br/><br/>
          I am a graduate student of Information and Communication Technologies with a passion for full-stack development. 
          I hold a bachelor’s degree from Metropolia AMK, majoring in Mobile Solutions, and a diploma from Omnia.
          <br/><br/>
          I am fluent in English, proficient in Finnish, and a native Arabic speaker. As a Finnish citizen, I am looking forward to future opportunities.
        </p>
        <br/><br/>
      </motion.div>
    </section>
  );
}

export default About;
