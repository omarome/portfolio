import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import '../style/About.css';
import { SparklesCore } from './ui/sparkles';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
  };

  const aboutItems = [
    {
      title: 'Full-Stack Developer',
      description:
        "I'm a passionate full-stack developer with four years of experience creating elegant, user-friendly applications. I work across the entire technology stack—from frontend frameworks like React, Angular, and TypeScript to backend technologies including Node.js, Python, and Java.",
    },
    {
      title: 'Cloud & DevOps',
      description:
        "I'm proficient in cloud infrastructure with AWS, containerization with Docker, and modern development practices including Git workflows, Agile methodologies, and Scrum.",
    },
    {
      title: 'Education',
      description:
        "I hold a bachelor's degree in Mobile Solutions from Metropolia AMK and a Master's in Information and Communication Technologies, where I deepened my expertise in both frontend and backend development.",
    },
    {
      title: 'Global Perspective',
      description:
        "As a multilingual developer fluent in English, proficient in Finnish, and a native Arabic speaker, I bring a global perspective to my work. I'm excited to contribute to innovative projects that make a real difference.",
    },
  ];
  
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
          {aboutItems.map(({ title, description }, index) => (
            <div className='about-section-item' key={title}>
              <div className='about-section-item-bg'>
                <SparklesCore
                  id={`about-sparkles-${index}`}
                  className='about-section-sparkles'
                  background="white"
                  particleColor="var(--primary-light)"
                  particleDensity={120}
                  minSize={0.6}
                  maxSize={1.8}
                  speed={3}
                />
              </div>
              <div className='about-section-item-content'>
                <h3 className='about-section-header'>{title}</h3>
                <p className='about-paragraph'>{description}</p>
              </div>
            </div>
          ))}
        </div>
        <br/><br/>
      </motion.div>
    </section>
  );
}

export default About;
