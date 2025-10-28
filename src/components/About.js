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
        <div className='about-content'>
          <div className='about-section-item'>
            <h3 className='about-section-header'>Full-Stack Developer</h3>
            <p className='about-paragraph'>
              I'm a passionate full-stack developer with four years of experience creating elegant, user-friendly applications. I work across the entire technology stack—from frontend frameworks like React, Angular, and TypeScript to backend technologies including Node.js, Python, and Java.
            </p>
          </div>
          
          <div className='about-section-item'>
            <h3 className='about-section-header'>Cloud & DevOps</h3>
            <p className='about-paragraph'>
              I'm proficient in cloud infrastructure with AWS, containerization with Docker, and modern development practices including Git workflows, Agile methodologies, and Scrum.
            </p>
          </div>
          
          <div className='about-section-item'>
            <h3 className='about-section-header'>Education</h3>
            <p className='about-paragraph'>
              I hold a bachelor's degree in Mobile Solutions from Metropolia AMK and a Master's in Information and Communication Technologies, where I deepened my expertise in both frontend and backend development.
            </p>
          </div>
          
          <div className='about-section-item'>
            <h3 className='about-section-header'>Global Perspective</h3>
            <p className='about-paragraph'>
              As a multilingual developer fluent in English, proficient in Finnish, and a native Arabic speaker, I bring a global perspective to my work. I'm excited to contribute to innovative projects that make a real difference.
            </p>
          </div>
        </div>
        <br/><br/>
      </motion.div>
    </section>
  );
}

export default About;
