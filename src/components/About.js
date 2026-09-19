import { FaUser } from 'react-icons/fa';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import '../style/About.css';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const yearsOfExperience = Math.floor(
    (Date.now() - new Date('2022-02-01').getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );

  const stats = [
    { value: `${yearsOfExperience}+`, label: 'Years of experience' },
    { value: 3, label: 'Languages spoken' },
  ];

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
        <div className='about-stats'>
          {stats.map(({ value, label }) => (
            <div className='about-stat' key={label}>
              <span className='about-stat-value'>{value}</span>
              <span className='about-stat-label'>{label}</span>
            </div>
          ))}
        </div>
        <div className='about-content'>
          {aboutItems.map(({ title, description }) => (
            <div className='about-section-item' key={title}>
              <div className='about-section-item-content'>
                <h3 className='about-section-header'>{title}</h3>
                <p className='about-paragraph'>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default About;
