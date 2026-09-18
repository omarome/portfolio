import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-scroll';
import Box from '@mui/material/Box';
import Home from './Home';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import ScrollToTop from './ScrollToTop';
import ThemeToggle from './ThemeToggle';

const Router = ({ menuList }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLinkClick = (event) => {
    setIsDrawerOpen(false);
    event.preventDefault();
  };

  const handleExternalLinkClick = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Box>
      <AppBar 
        position="sticky"
        sx={{ 
          backgroundColor: 'var(--background-color)', 
          color: 'var(--primary-color)', 
          borderBottom: '1px solid var(--primary-color)',
          top: 0,
          zIndex: 1100,
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden'
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(true)}
            className="hamburger"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }} className="menu-text">
            Menu
          </Typography>
          <div className="nav-links">
            {menuList.map((item, index) => {
              const Icon = item.icon;
              return item.type === 'external' ? (
                <a
                  key={index}
                  href={item.href}
                  target={item.newTab === false ? undefined : '_blank'}
                  rel={item.newTab === false ? undefined : 'noopener noreferrer'}
                  className="nav-button"
                >
                  {Icon && <Icon className="nav-button-icon" aria-hidden="true" />}
                  {item.label}
                </a>
              ) : (
                <Link
                  key={index}
                  to={item.label.toLowerCase()}
                  smooth={true}
                  duration={500}
                  className="nav-button"
                >
                  {Icon && <Icon className="nav-button-icon" aria-hidden="true" />}
                  {item.label}
                </Link>
              );
            })}
          </div>
          <Box sx={{ marginLeft: 'auto' }}>
            <ThemeToggle />
          </Box>
          <Drawer
            sx={{ width: 250 }}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
              <List className="drawer-list">
                {menuList.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <ListItem button key={index}>
                      {item.type === 'external' ? (
                        <a
                          href={item.href}
                          target={item.newTab === false ? undefined : '_blank'}
                          rel={item.newTab === false ? undefined : 'noopener noreferrer'}
                          onClick={handleExternalLinkClick}
                        >
                          <Button
                            className="nav-button"
                            variant="outlined"
                          >
                            {Icon && <Icon className="nav-button-icon" aria-hidden="true" />}
                            <ListItemText primary={item.label} />
                          </Button>
                        </a>
                      ) : (
                        <Link
                          to={item.label.toLowerCase()}
                          smooth={true}
                          duration={500}
                          onClick={(event) => handleLinkClick(event)}
                        >
                          <Button
                            className="nav-button"
                            variant="outlined"
                          >
                            {Icon && <Icon className="nav-button-icon" aria-hidden="true" />}
                            <ListItemText primary={item.label} />
                          </Button>
                        </Link>
                      )}
                    </ListItem>
                  );
                })}
              </List>
          </Drawer>
        </Toolbar>
      </AppBar>
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="education">
        <Education />
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
      <ScrollToTop />
    </Box>
  );
}

export default Router;
