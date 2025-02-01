import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'; // Import icons from react-icons
import '../style/Contact.css';

function Contact() {
  return (
    <section>
      <h2>Contact</h2>
      <div className='icon-container-style'>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className='icon-style'>
          <FaFacebook />
        </a>
        <a href="https://www.linkedin.com/in/omar-al-mashhadani-4a9404199/" target="_blank" rel="noopener noreferrer" className='icon-style'>
          <FaLinkedin />
        </a>
        <a href="https://x.com/Almash46281Omar" target="_blank" rel="noopener noreferrer" className='icon-style'>
          <FaTwitter />
        </a>
        <a href="https://github.com/omarome" target="_blank" rel="noopener noreferrer" className='icon-style'>
          <FaGithub />
        </a>
      </div>
      <p>Email: almashhadaniomar9@gmail.com</p>
    </section>
  );
}

export default Contact;