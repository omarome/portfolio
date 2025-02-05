import React, { useState } from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaCopy } from 'react-icons/fa'; // Import icons from react-icons
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import '../style/Contact.css';

const contactItems = [
    {  
      href:"https://www.linkedin.com/in/omar-al-mashhadani-4a9404199/",
      target:"_blank",
      rel:"noopener noreferrer", 
      className:'contact-icon-style',
      icon: <FaLinkedin />
    },
    {
      href:"https://x.com/Almash46281Omar",
      target:"_blank",
      rel:"noopener noreferrer",
      className:'contact-icon-style',
      icon: <FaTwitter />
    },
    {
      href: "https://github.com/omarome", 
      target: "_blank",
      rel: "noopener noreferrer", 
      className: 'contact-icon-style',
      icon: <FaGithub />
    }
   ];

const Contact = () => {
  const [copySuccess, setCopySuccess] = useState('');
    const [ref, inView] = useInView({
      threshold: 0.1,
    });
  
const contactVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const handleCopy = (text) => {
  navigator.clipboard.writeText(text);
  setCopySuccess('Copied Successfully!');
  setTimeout(() => setCopySuccess(''), 3000);
};

  return (
    <section className='contact-section'>
      <h2 className='title'>Contact</h2>
      <div className='contact-icon-container-style'>
        {contactItems.map((contact, index) => (
          <motion.div
            key={index}
            className="contact-icon-style"
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={contactVariants}>
            <a 
              href={contact.href} 
              target={contact.target} 
              rel={contact.rel} 
              className={contact.className}>
            {contact.icon}
            </a>
          </motion.div>
        ))}
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
