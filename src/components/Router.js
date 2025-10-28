import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-scroll';
import Box from '@mui/material/Box';
import Home from './Home';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import ScrollToTop from './ScrollToTop';

const Router = ({ menuList }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLinkClick = (event) => {
    setIsDrawerOpen(false);
    event.preventDefault();
  };

  return (
    <Box>
      <AppBar sx={{ backgroundColor: ' #000000', color: '#CC7832', borderBottom: '1px solid #CC7832'}}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
          <div className="nav-links">
            {menuList.map((item, index) => (
              <Link
                key={index}
                to={item.toLowerCase()}
                smooth={true}
                duration={500}
                className="nav-button"
              >
                {item}
              </Link>
            ))}
          </div>
          <Drawer
            sx={{ width: 250 }}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
              <List className="drawer-list">
                {menuList.map((item, index) => (
                  <ListItem button key={index}>
                    <Link
                      to={item.toLowerCase()}
                      smooth={true}
                      duration={500}
                      onClick={(event) => handleLinkClick(event)}
                    >
                      <Button
                        className="nav-button"
                        variant="outlined"
                      >
                        <ListItemText primary={item} />
                      </Button>
                    </Link>
                  </ListItem>
                ))}
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
