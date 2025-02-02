import React from 'react';
import SplashScreen from './components/SplashScreen';
import { Link } from 'react-scroll';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from  './components/Footer';
import Button from '@mui/material/Button';

import './App.css';

const App = () => {
  return (
    <div className="App">
      <SplashScreen />
      <header className="navbar">
        <nav>
          <ul>
            <Button className="nav-button" variant="outlined"><Link to="home" smooth={true} duration={500} >Home</Link></Button>
            <Button className="nav-button" variant="outlined"><Link to="about" smooth={true} duration={500}>About</Link></Button>
            <Button className="nav-button" variant="outlined"><Link to="skills" smooth={true} duration={500}>Skills</Link></Button>
            <Button className="nav-button" variant="outlined"><Link to="projects" smooth={true} duration={500}>Projects</Link></Button>
            <Button className="nav-button" variant="outlined"><Link to="contact" smooth={true} duration={500}>Contact</Link></Button>
          </ul>
        </nav>
      </header>
   
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  );
}

export default App;
