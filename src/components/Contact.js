import React, { useState } from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaCopy, FaArrowCircleDown } from 'react-icons/fa';
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setFormStatus('');

  try {
    const formDataToSend = new URLSearchParams({
      'form-name': 'contact',
      'bot-field': '', // Honeypot field (should be empty)
      ...formData
    });

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formDataToSend.toString()
    });

    if (response.ok) {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 5000);
    } else {
      setFormStatus('error');
    }
  } catch (error) {
    setFormStatus('error');
  } finally {
    setIsSubmitting(false);
  }
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
       {/* Contact Form Section */}
       <motion.div 
          className="contact-form-container"
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={contactVariants}
        >
          <h3 className='form-title'>Send Me a Message</h3>
          <p className='form-description'>Have a question or want to work together? Drop me a message!</p>
          
          <form 
            name="contact" 
            method="POST" 
            action="/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className='contact-form'
          >
            {/* Hidden fields for Netlify */}
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className='form-group'>
              <label htmlFor='name'>Name *</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder='Your name'
                disabled={isSubmitting}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='contact-email'>Email *</label>
              <input
                type='email'
                id='contact-email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder='your.email@example.com'
                disabled={isSubmitting}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='message'>Message *</label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder='Your message here...'
                rows='5'
                disabled={isSubmitting}
              />
            </div>

            <button 
              type='submit' 
              className='submit-button'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {formStatus === 'success' && (
              <div className='form-message success'>
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}
            
            {formStatus === 'error' && (
              <div className='form-message error'>
                ✗ Oops! Something went wrong. Please try again or email me directly.
              </div>
            )}
          </form>
        </motion.div>
      <div className='contact-info'>
      <label htmlFor='email'>Or Copy My Email  <FaArrowCircleDown className='down-arrow-icon'></FaArrowCircleDown></label> 
        <div className='copy-container'>
       
        <input type='text' id='email' value='contact@omar-almashhadani.com' readOnly onClick={(e) => e.target.select()} />
          <FaCopy className='copy-icon' onClick={() => handleCopy('contact@omar-almashhadani.com')} />
        </div>
        </div>
        {copySuccess && <div className='copy-notification'>{copySuccess}</div>}
        
        {/* Resume Download Section */}
        {/* <div className='resume-section'>
          <h3 className='resume-title'>Download Resume</h3>
          <p className='resume-description'>Get a copy of my resume in PDF format</p>
          <a 
            href="https://drive.google.com/file/d/1GdCJHLq7vGhkH-7JBuXHKQ8R0cHvOOjM/view?usp=sharing" 
            target="_blank"
            rel="noopener noreferrer"
            className='resume-download-button'
            download
            aria-label="Download Omar Al-Mashhadani's resume"
          >
            <FaFileDownload /> Download Resume (PDF)
          </a>
        </div> */}
    </section>
  );
}

export default Contact;
