import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import MovieAppImage from '../assets/project-images/vidly.jpeg';
import MyPetShopAppImage from '../assets/project-images/petshopImage.jpeg';
import FoodSpotLightAppImage from '../assets/project-images/foodSpotLightApp.jpeg';
import PaymentHubImage from '../assets/project-images/payment-hub.jpeg';
import HumintFlowImage from '../assets/project-images/humint-flow.jpeg';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { CardContainer, CardBody, CardItem } from './ui-animation/3d-card';
import '../style/Projects.css';

const projects = [
  {
    image: HumintFlowImage,
    name: 'Humint Flow',
    description: 'A full-stack CRM workspace centralizing customer data, deal tracking, and team activity into a single cohesive platform.',
    githubUrl: 'https://github.com/omarome/humint-flow-frontend/blob/master/README.md',
    demoUrl: 'https://humint-flow.web.app/',
    technologies: ['React.js', 'Java + Springboot', 'PostgreSQL', 'Restful APIs', 'Full-Stack', 'AI']
  },
  {
    image: PaymentHubImage,
    name: 'Payment Hub',
    description: 'A micro-frontends monorepo from old legacy code built with AngularJS to React.js, TypeScript, and Tailwind CSS architecture.',
    githubUrl: 'https://github.com/omarome/micro-frontends-monorepo/blob/master/README.md',
    demoUrl: null,
    technologies: ['React.tsx', 'AngularJS', 'Monorepo + MFEs']
  },
  {
    image: MovieAppImage,
    name: 'Vidly',
    description: 'Your Ultimate Movie Management. A Full-Stack Project Built With React and Node.js.',
    githubUrl: 'https://github.com/omarome/vidly/blob/master/README.md',
    demoUrl: null,
    technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB']
  },
  {
    image: MyPetShopAppImage,
    name: 'My Pet Store App',
    description: 'This is PetStore app for people looking to buy or sell their pet. Built to look simple and easy to use with ReactNative.',
    githubUrl: 'https://github.com/omarome/myOnlinePetShop/blob/frontEnd/README.md',
    demoUrl: null,
    technologies: ['React Native', 'Mobile', 'Cross-platform']
  },
  {
    image: FoodSpotLightAppImage,
    name: 'Food Spotlight App',
    description: 'This is an IOS app built with Swift. It helps you find the best restaurants in your area.',
    githubUrl: 'https://github.com/omarome/FoodSpotlightApp',
    demoUrl: null,
    technologies: ['Swift', 'iOS', 'Mobile']
  },

];

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const handleLinkClick = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };


  const projectVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 }
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={projectVariants}
      className="project-card-wrapper"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <CardContainer
        containerClassName="project-card-container"
        className="project-card-inner"
        tiltIntensity={40}
      >
        <CardBody className="project-card">
          <CardItem translateZ={120} className="project-image-wrapper">
            <img
              src={project.image}
              alt={project.name}
              className="project-image"
              loading="lazy"
            />
          </CardItem>
          <CardItem translateZ="160" className="project-content" as="a" >
            <h3 className="project-title">
              {project.name}
            </h3>
            <p className="project-description">
              {project.description}
            </p>
          </CardItem>
          <CardItem translateZ="160" className="tech-stack" as="a" >
            <div className="tech-stack">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </CardItem>
          <CardItem translateZ="160" className="project-actions" as="a" >
            {project.demoUrl && (
              <button
                className="demo-button"
                onClick={(e) => handleLinkClick(e, project.demoUrl)}
                aria-label={`View ${project.name} live demo`}
              >
                <FaExternalLinkAlt /> Live Demo
              </button>
            )}
            {project.githubUrl && (
              <button
                className="github-button"
                onClick={(e) => handleLinkClick(e, project.githubUrl)}
                aria-label={`View ${project.name} on GitHub`}
              >
                <FaGithub /> View Code
              </button>
            )}
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <div className="projects-container">
      <h2 className="title">Projects</h2>
      <section className="projects-section">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </section>
      <div className='more-projects'>
        <a
          href="https://github.com/omarome"
          target="_blank"
          rel="noopener noreferrer">
          <p className='more-projects-text'>For more checkout my GitHub <FaGithub className='more-projects-icon' /></p>

        </a>
      </div>
    </div>
  );
};

export default Projects;
