import React from 'react';
import { frontendSkills, backendSkills, designSkills, otherSkills } from '../directories/SkillsUtilis';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
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
      className="skill-card"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <img
        alt={`${skill.name} logo`}
        className="skill-logo"
        src={skill.logo}
        loading="lazy"
      />
      <div className="skill-name">{skill.name}</div>
    </motion.div>
  );
};

const SkillSection = ({ title, skills }) => {
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
      <h2 className="skill-category-title">{title}</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} index={index} delay={index * 0.1} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  // Combine Design and Others into one section
  const combinedSkills = [...designSkills, ...otherSkills];
  
  return (
    <section className="section-container">
      <h2 className="title">Skills</h2>
      <div className="skills-container">
        <SkillSection title="Frontend" skills={frontendSkills} />
        <SkillSection title="Backend" skills={backendSkills} />
        <SkillSection title="Tools & Design" skills={combinedSkills} />
      </div>
    </section>
  );
};

export default Skills;
