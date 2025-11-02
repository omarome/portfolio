import React from 'react';
import '../style/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="intro-section-text">
        <p className='footer-text'>©{new Date().getFullYear()} Omar Al-Mashhadani. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
