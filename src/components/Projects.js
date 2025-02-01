import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { FaGithub } from 'react-icons/fa'; // Import icons from react-icons
import Florance from '../assets/florance.jpeg';
import City from '../assets/city.jpeg';
import SecondCity from '../assets/city3.jpeg';

import '../style/Projects.css';

const Projects = () => {
  const projects = [
    {
      image: Florance,
      name: 'Project 1',
      description: 'This is a description of Project 1.'
    },
    {
      image: City,
      name: 'Project 2',
      description: 'This is a description of Project 2.'
    },
    {
      image: SecondCity,
      name: 'Project 3',
      description: 'This is a description of Project 3.'
    }
  ];

  return (
    <div className='projects-container'>
    <div className="projects-section">
      {projects.map((project, index) => (
        <Card className="project-card" key={index}>
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
