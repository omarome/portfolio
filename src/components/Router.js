import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-scroll';
import { useReducedMotion } from 'motion/react';
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

const NAV_HEIGHT = 57;
// Scroll targets stop this far below the top so the sticky navbar doesn't cover section titles
const SCROLL_OFFSET = -(NAV_HEIGHT + 24);

const Router = ({ menuList }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const ids = menuList.filter((item) => item.type !== 'external').map((item) => item.label.toLowerCase());
    let frame = 0;

    const update = () => {
      frame = 0;
      // A section is "current" once its top passes a line just under the middle of the visible area
      const probe = NAV_HEIGHT + window.innerHeight * 0.45;
      let current = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      });
      // The last section is often too short to ever reach the probe line, so pin it at the page bottom
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = ids[ids.length - 1];
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [menuList]);

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
                  className="nav-button nav-button-resume"
                >
                  {Icon && <Icon className="nav-button-icon" aria-hidden="true" />}
                  {item.label}
                </a>
              ) : (
                <Link
                  key={index}
                  to={item.label.toLowerCase()}
                  smooth={!prefersReducedMotion}
                  duration={500}
                  offset={SCROLL_OFFSET}
                  className={`nav-button${activeSection === item.label.toLowerCase() ? ' nav-button-active' : ''}`}
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
                          offset={SCROLL_OFFSET}
                          smooth={!prefersReducedMotion}
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
