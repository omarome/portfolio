import React, { useState } from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaGithub, FaCopy } from 'react-icons/fa'; // Import icons from react-icons
import '../style/Contact.css';

function Contact() {
  const [copySuccess, setCopySuccess] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess('Copied Successfully!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  return (
    <section className='contact-section'>
      <h2 className='title'>Contact</h2>
      <div className='contact-icon-container-style'>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className='contact-icon-style'>
          <FaFacebook />
        </a>
        <a href="https://www.linkedin.com/in/omar-al-mashhadani-4a9404199/" target="_blank" rel="noopener noreferrer" className='contact-icon-style'>
          <FaLinkedin />
        </a>
        <a href="https://x.com/Almash46281Omar" target="_blank" rel="noopener noreferrer" className='contact-icon-style'>
          <FaTwitter />
        </a>
        <a href="https://github.com/omarome" target="_blank" rel="noopener noreferrer" className='contact-icon-style'>
          <FaGithub />
        </a>
      </div>
      <div className='contact-info'>
        <label htmlFor='email'>Email:</label>
        <div className='copy-container'>
          <input type='text' id='email' value='almashhadaniomar9@gmail.com' readOnly onClick={(e) => e.target.select()} />
          <FaCopy className='copy-icon' onClick={() => handleCopy('almashhadaniomar9@gmail.com')} />
        </div>
        </div>
        {copySuccess && <div className='copy-notification'>{copySuccess}</div>}
    </section>
  );
}

export default Contact;
