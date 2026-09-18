import { FaGraduationCap } from 'react-icons/fa';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import omniaLogo from '../assets/education-logos/omnia.png';
import metropoliaLogo from '../assets/education-logos/metropolia.png';
import amsterdamLogo from '../assets/education-logos/amsterdam.png';
import '../style/Education.css';

const education = [
  {
    institution: 'Omnia Vocational School',
    location: 'Espoo, Finland',
    logo: omniaLogo,
    program: 'Vocational Qualification, ICT',
    period: '2019 - 2020',
    blurb:
      'First formal training in programming and IT fundamentals — led a small student team on the "Yetitablet" project.',
  },
  {
    institution: 'Metropolia University of Applied Sciences',
    location: 'Helsinki, Finland',
    logo: metropoliaLogo,
    program: "Bachelor's Degree, Mobile Solutions",
    period: '2020 - 2024',
    blurb:
      'Full-stack foundation spanning web, mobile, and backend development, studied while working as a software engineer.',
  },
  {
    institution: 'Amsterdam University of Applied Sciences',
    location: 'Amsterdam, Netherlands',
    logo: amsterdamLogo,
    program: 'Academic Exchange Semester',
    period: 'Autumn 2022',
    blurb: 'One semester abroad focused on frontend engineering, paired with a hands-on role at Plat4mation.',
  },
];

const EducationCard = ({ item, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.12 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={cardVariants}
      className="education-card"
    >
      <div className="education-card-top">
        <img src={item.logo} alt={`${item.institution} logo`} className="education-logo" loading="lazy" />
      </div>
      <div className="education-card-body">
        <h3 className="education-institution">{item.institution}</h3>
        <span className="education-location">{item.location}</span>
        <p className="education-program">{item.program}</p>
        {item.period && <span className="education-period">{item.period}</span>}
        <p className="education-blurb">{item.blurb}</p>
      </div>
    </motion.div>
  );
};

const Education = () => {
  return (
    <section className="section-container">
      <h2 className="title"><FaGraduationCap className="title-icon" aria-hidden="true" /> Education</h2>
      <div className="education-grid">
        {education.map((item, index) => (
          <EducationCard key={item.institution} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Education;
