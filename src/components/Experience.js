import { FaBriefcase } from 'react-icons/fa';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import '../style/Experience.css';

const experience = [
  {
    company: 'EKE-Electronics',
    roles: [
      {
        title: 'Software Engineer',
        subtitle: 'Started as Junior Software Engineer; promoted to Software Engineer',
        period: 'Feb 2022 - Present',
        duration: '4 yrs 7 mos',
        bullets: [
          'Build the frontend of a large-scale, safety-critical condition monitoring system in React and TypeScript, implementing pixel-accurate, responsive UI directly from Figma designs across multiple user profiles and complex workflows',
          'Work closely with UX designers to keep the interface consistent and accessible as the product grows, turning design and product requirements into maintainable, reusable components',
          'Integrate the frontend with a Python (FastAPI) and Java microservices backend, and support Dockerized cloud deployment and CI/CD workflows',
          'Write unit and end-to-end tests with Robot Framework and Selenium to keep production releases reliable; collaborate daily with product owners, designers, and backend engineers in an Agile/Scrum setup (Jira, Bitbucket)',
        ],
      },
    ],
  },
  {
    company: 'Plat4mation',
    roles: [
      {
        title: 'Frontend Developer — Academic Exchange Project',
        subtitle: 'One-semester exchange via Amsterdam University of Applied Sciences',
        period: 'Autumn 2022 - 2023',
        bullets: [
          'Developed frontend features and UI improvements for web automation tools',
          'Implemented responsive layouts using React and Tailwind CSS in direct collaboration with designers in Figma',
        ],
      },
    ],
  },
  {
    company: 'Omnia Vocational School',
    roles: [
      {
        title: 'Team Leader — Student Project',
        subtitle: 'Vocational program in Information & Communication Technologies',
        period: '2019 - 2020',
        bullets: [
          'Led the "Yetitablet" student project, building frontend and backend features with React.js, Node.js, and MySQL',
          'Coordinated team workflow and tools using GitHub, Microsoft Teams, and Git',
        ],
      },
    ],
  },
];

const ExperienceEntry = ({ company, roles, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const entryVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: index * 0.15 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={entryVariants}
      className="experience-entry"
    >
      <div className="experience-marker">
        <span className="experience-dot" />
        <span className="experience-line" />
      </div>
      <div className="experience-card">
        <div className="experience-card-header">
          <h3 className="experience-company">{company}</h3>
        </div>
        <div className="experience-roles">
          {roles.map((role, roleIndex) => (
            <div className="experience-role" key={roleIndex}>
              <div className="experience-role-header">
                <FaBriefcase className="experience-role-icon" />
                <span className="experience-role-title">{role.title}</span>
              </div>
              <div className="experience-role-meta">
                <span>{role.period}</span>
                {role.duration && <span className="experience-role-duration">{role.duration}</span>}
              </div>
              {role.subtitle && (
                <p className="experience-role-subtitle">{role.subtitle}</p>
              )}
              {role.bullets && (
                <ul className="experience-role-bullets">
                  {role.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section className="section-container">
      <h2 className="title">Experience</h2>
      <div className="experience-timeline">
        {experience.map((entry, index) => (
          <ExperienceEntry
            key={entry.company}
            company={entry.company}
            roles={entry.roles}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
