import React from 'react';
import portfolioImage from '../assets/portfolio_image.jpeg'
import keyboardImage from '../assets/keyboard.jpeg'; 
import TypingEffect from '../components/TypingEffect';
import '../style/Home.css'

function Home() {
    const textArray = [
        'Hey there!',
        'Looking for a software engineer?',
        'You\'ve got it!'
      ];
  return (
    <>
        <section className="intro-section" style={{ backgroundImage: `url(${keyboardImage})` }}>
        <span>
        {/* Background Image and other content */}
        <TypingEffect textArray={textArray} typingSpeed={150} deletingSpeed={75} delay={2000} />
        </span>
       
        </section>
        <section className="profile-container">
            <img src={portfolioImage} alt="Omar" className="profile-image" />
        </section>
        <section className='intro-section-text'>
            <h1 className='intro-section-header'>Hi, I'm Omar</h1>
            <p className='intro-section-paragraph'>
            I am a software engineer with a degree in Information and Communication Technology (ICT) from Metropolia University of Applied Sciences. 
            Currently, I work full-time at EKE Electronics Ltd., where I apply my skills and passion for technology to create innovative solutions.
            </p>
        </section>
      </>
  );
}

export default Home;
