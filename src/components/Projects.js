import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { FaGithub } from 'react-icons/fa'; // Import icons from react-icons
import MovieAppImage from '../assets/project-images/vidly.jpeg';
import MyPetShopAppImage from '../assets/project-images/petshopImage.jpeg';
import FoodSpotLightAppImage from '../assets/project-images/foodSpotLightApp.jpeg';
import PaymentHubImage from '../assets/project-images/payment-hub.jpeg';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import '../style/Projects.css';

const projects = [
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

  const handleGitHubClick = (e, url) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDemoClick = (e, url) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const projectVariants = {
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? 100 : -100,
      y: 20
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1 } 
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={projectVariants}
    >
          <Card className="project-card">
            <CardMedia
              component="img"
              image={project.image}
              alt={project.name}
              className="project-image"
            />
            <CardContent className="project-content">
              <Typography gutterBottom variant="h5" component="h3" className="project-title">
                {project.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="project-description">
                {project.description}
              </Typography>
              
              {/* Tech Stack Tags */}
              <div className="tech-stack">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="project-actions">
                {project.demoUrl && (
                  <button 
                    className="demo-button"
                    onClick={(e) => handleDemoClick(e, project.demoUrl)}
                    aria-label={`View live demo of ${project.name}`}
                  >
                    Live Demo
                  </button>
                )}
                <button 
                  className="github-button"
                  onClick={(e) => handleGitHubClick(e, project.githubUrl)}
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <FaGithub /> View Code
                </button>
              </div>
            </CardContent>
          </Card>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <div className="projects-container">
      <h2 className="title">Projects</h2>
      <div className="projects-section">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
      <div className='more-projects'>
        <a 
          className='more-projects-text icon-style'
          href="https://github.com/omarome" 
          target="_blank" 
          rel="noopener noreferrer">
            For more checkout my GitHub
            <FaGithub />
        </a>  
      </div>
    </div>
  );
};

export default Projects;
