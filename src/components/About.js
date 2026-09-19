import { FaUser } from 'react-icons/fa';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import '../style/About.css';
import { SparklesCore } from './ui-animation/sparkles';

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
        "I work across the whole stack: React and TypeScript on the frontend, FastAPI and Java microservices on the backend, and Dockerized cloud deployments with CI/CD. I work closely with designers, product owners, and backend engineers, and I care about software that stays reliable, maintainable, and well-tested as a product grows.",
    },
    {
      title: 'Global Perspective',
      description:
        "I'm fluent in English, proficient in Finnish, and a native Arabic speaker. Studying and working across Finland and the Netherlands has made me comfortable in multicultural teams.",
    },
  ];
  
  return (
    <section className='about-section'>
      <h2 className='title'><FaUser className='title-icon' aria-hidden="true" /> About Me</h2>
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
