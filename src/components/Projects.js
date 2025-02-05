import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { FaGithub } from 'react-icons/fa'; // Import icons from react-icons
import MovieAppImage from '../assets/project-images/vidly.jpeg';
import MyPetShopAppImage from '../assets/project-images/petshopImage.jpeg';
import FoodSpotLightAppImage from '../assets/project-images/foodSpotLightApp.jpeg';
import DopcAppImage from '../assets/project-images/dopc.jpg';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import '../style/Projects.css';

const projects = [
  {
    image: MovieAppImage,
    name: 'Vidly',
    description: 'Your Ultimate Movie Management. A Full-Stack Project Built With React and Node.js.',
    url: 'https://github.com/omarome/vidly/blob/master/README.md'
  },
  {
    image: MyPetShopAppImage,
    name: 'My Pet Store App',
    description: 'This is PetStore app for people looking to buy or sell their pet. Built to look simple and easy to use with ReactNative.',
    url: 'https://github.com/omarome/myOnlinePetShop/blob/frontEnd/README.md'
  },
  {
    image: FoodSpotLightAppImage,
    name: 'Food Spotlight App',
    description: 'This is an IOS app built with Swift. It helps you find the best restaurants in your area.',
    url: 'https://github.com/omarome/FoodSpotlightApp'
  }, 
  {
    image: DopcAppImage,
    name: 'Delivery fee Calculator',
    description: 'This is a delivery fee calculator app. Simple application build with React.js and TypeScript.',
    url: 'https://github.com/omarome/delivery-fee-calculator'
  }
];

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.0,
    triggerOnce: true,
  });
 
  const handleCardClick = (url) => {
    window.open(url, '_blank');
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="projects-container">
    <h2 className="title">Projects</h2>
    <div className="projects-section">
      {projects.map((project, index) => (
         <motion.div
         key={index}
         className="project-card"
         ref={ref}
         initial="hidden"
         animate={inView ? 'visible' : 'hidden'}
         variants={projectVariants}
       >
        <Card className="project-card" key={index}  onClick={() => handleCardClick(project.url)}>
          <CardMedia
            component="img"
            image={project.image}
            alt={project.name}
            className="project-image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {project.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {project.description}
            </Typography>
          </CardContent>
        </Card>
        </motion.div>
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
