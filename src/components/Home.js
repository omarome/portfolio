import portfolioImage from '../assets/portfolio_image.jpeg';
import TypingEffect from '../components/TypingEffect';
import { FaMapMarkerAlt, FaLaptopCode, FaDownload, FaEnvelope } from 'react-icons/fa';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-scroll';
import { useInView } from 'react-intersection-observer';
import { Vortex } from './ui-animation/vortex';
import { CardContainer, CardBody, CardItem } from './ui-animation/3d-card';
import '../style/Home.css';

const Home = () => {
    const prefersReducedMotion = useReducedMotion();
    const [ref, inView] = useInView({
        threshold: 0.1, // Adjust the threshold value to trigger the animation earlier
        triggerOnce: false, // Ensure the animation triggers every time the element comes into view
      });

      const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      };

    const textArray = [
        'Looking for a software engineer?',
        'I turn ideas into reliable software solutions.',
        'I help teams build and launch faster.',
        'I write code that drives business results.',
        'Passionate about solving real-world problems.',
        'Ready to bring value to your team.'
      ];

    const heroClassName = "flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full";
    const heroContent = (
      <>
        <div className="typing-effect-container">
          <TypingEffect textArray={textArray} typingSpeed={3} deletingSpeed={20} delay={3000} />
        </div>
        <div className="profile-container">
          <CardContainer
            containerClassName="profile-card-container"
            className="profile-card"
          >
            <CardBody className="profile-card-body">
              <CardItem translateZ={200} className="profile-card-item">
                <img src={portfolioImage} alt="Omar" className="profile-image" />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </>
    );

  return (
    <>
        <section className="intro-section">
          {prefersReducedMotion ? (
            <div className={heroClassName}>{heroContent}</div>
          ) : (
            <Vortex className={heroClassName}>{heroContent}</Vortex>
          )}
        </section>
        <section className='intro-section-text'>
        <motion.div
            className="intro-section-text"
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            <motion.h1 className='intro-section-header' variants={itemVariants}>Hey there 👋, I'm Omar — a Software Engineer.</motion.h1>
            <motion.p className='intro-section-location' variants={itemVariants}><FaMapMarkerAlt className='intro-section-location-icon' aria-hidden="true" /> Espoo, Finland 🇫🇮</motion.p>
            <motion.p className='intro-section-paragraph' variants={itemVariants}>
            Full-stack software engineer with a strong background in frontend development, backend services, and cloud deployment, seeking to apply my technical expertise and problem-solving skills to contribute to a dynamic team. ICT graduate from Metropolia University of Applied Sciences, shipping production software since 2022.
            </motion.p>
            <motion.div className='hero-cta' variants={itemVariants}>
              <Link
                to="projects"
                smooth={!prefersReducedMotion}
                duration={500}
                className="hero-button hero-button-primary"
              >
                <FaLaptopCode aria-hidden="true" /> View Projects
              </Link>
              <a
                href="https://drive.google.com/file/d/1CC1bXZJqWtsIQV3YkMPi9EHvcbahP6iO/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-button hero-button-secondary"
              >
                <FaDownload aria-hidden="true" /> Download CV
              </a>
              <Link
                to="contact"
                smooth={!prefersReducedMotion}
                duration={500}
                className="hero-button hero-button-secondary"
              >
                <FaEnvelope aria-hidden="true" /> Contact Me
              </Link>
            </motion.div>
            </motion.div>
        </section>
      </>
  );
}

export default Home;
