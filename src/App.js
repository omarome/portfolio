import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Footer from  './components/Footer';
import Router from './components/Router';
import './App.css';

const menuList = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleAnimationComplete = () => {
    setIsSplashVisible(false);
  };

  return (
    <div className="app">
    {isSplashVisible ? (
        <SplashScreen onAnimationComplete={handleAnimationComplete} />
      ) : (
        <>
          <Router menuList={menuList} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
