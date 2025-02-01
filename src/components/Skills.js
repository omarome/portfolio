import React from 'react';
import { frontendSkills, backendSkills, designSkills, otherSkills } from '../directories/SkillsUtilis';
import '../style/Skills.css'


const  Skills = () => {

  return (
    <section 
      className = 'section-continer'
    >
      <h2 className='title'>Skills</h2>
      <ul 
        className='list-continer'
      >
        <h className="subtitle">Frontend</h>
        {frontendSkills.map((skill, index) => 
        <li 
          className = 'item-continer'
          key = { index }
        >
          <div
            className = 'item-name'
          >
            {skill.name}
          </div>
          <img
            alt={ skill.name + 'logo' } 
              className = "item-logo" 
              src={ skill.logo }
          >
          </img>
        </li>
          )}
          <h className="subtitle">Backend</h>
          {backendSkills.map((skill, index) => 
        <li 
          className = 'item-continer'
          key = { index }
        >
          <div
            className = 'item-name'
          >
            {skill.name}
          </div>
          <img
            alt={ skill.name + 'logo' } 
              className = "item-logo" 
              src={ skill.logo }
          >
          </img>
        </li>
          )}
          <h className="subtitle">Design</h>
          {designSkills.map((skill, index) => 
        <li 
          className = 'item-continer'
          key = { index }
        >
          <div
            className = 'item-name'
          >
            {skill.name}
          </div>
          <img
            alt={ skill.name + 'logo' } 
              className = "item-logo" 
              src={ skill.logo }
          >
          </img>
        </li>
          )}
          <h className="subtitle">Others</h>
          {otherSkills.map((skill, index) => 
        <li 
          className = 'item-continer'
          key = { index }
        >
          <div
            className = 'item-name'
          >
            {skill.name}
          </div>
          <img
            alt={ skill.name + 'logo' } 
              className = "item-logo" 
              src={ skill.logo }
          >
          </img>
        </li>
          )}
      </ul>
    </section>
  );
}

export default Skills;
