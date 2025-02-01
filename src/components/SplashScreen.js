import React, { useState, useEffect } from 'react';
import logo  from '../assets/myNameIcon.png';
import '../style/SplashScreen.css';

function SplashScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Show logo for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return null; // Don't render the component after it's done loading
  }

  return (
    <div className="splash-screen">
      <img src={logo} alt="Logo" className="splash-logo" />
    </div>
  );
}

export default SplashScreen;
