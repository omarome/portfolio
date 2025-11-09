import {
  frontendSkills,
  backendSkills,
  designSkills,
  otherSkills,
} from '../directories/SkillsUtilis';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { SparklesCore } from './ui-animation/sparkles';
import { CardContainer, CardBody, CardItem } from './ui-animation/3d-card';
import '../style/Skills.css';

const SkillCard = ({ skill, index, delay }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
      }}
      className="skill-card-wrapper"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <CardContainer
        containerClassName="skill-card-container"
        className="skill-card-inner"
        tiltIntensity={12}
      >
        <CardBody className="skill-card">
          <CardItem
            translateZ={120}
            className="skill-logo-wrapper"
          >
            <img
              alt={`${skill.name} logo`}
              className="skill-logo"
              src={skill.logo}
              loading="lazy"
            />
          </CardItem>
          <CardItem
            as="span"
            translateZ={70}
            className="skill-name"
          >
            {skill.name}
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
};

const SkillSection = ({ title, skills, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } },
      }}
      className="skill-category"
    >
      <div className="skill-category-bg">
        <SparklesCore
          id={`skill-category-${index}`}
          className="skill-category-sparkles"
          background="black"
          particleColor="var(--primary-light)"
          particleDensity={120}
          minSize={0.6}
          maxSize={1.8}
          speed={3}
        />
      </div>
      <div className="skill-category-content">
        <h2 className="skill-category-title">{title}</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  // Combine Design and Others into one section
  const combinedSkills = [...designSkills, ...otherSkills];
  const sectionsList = [
    { title: "Frontend", skillsList: frontendSkills },
    {  title: "Backend", skillsList: backendSkills },
    {  title: "Tools & Design", skillsList: combinedSkills },
  ];
  return (
    <section className="section-container">
      <h2 className="title">Skills</h2>
      <div className="skills-container">{
          sectionsList.map((section, index)=> (
            <SkillSection
              key={index}
              title={section.title}
              skills={section.skillsList}
              index={index}
            />
          ))
        }
      </div>
    </section>
  );
};

export default Skills;
