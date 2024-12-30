import React from 'react';
import './styles/styles.css';
import { Routes } from 'react-router-dom';
import Header from './components/primary/Header';
import Footer from './components/primary/Footer';
import { RoutesConfig } from './RoutesConfig';

export const API_URL =
    window.env?.REACT_APP_API_URL || // Check `window.env`
    process.env.REACT_APP_API_URL || // Fallback to `.env` file value
    'http://localhost:35550'; // Hardcoded fallback IP

console.log('API_URL is set to:', API_URL);


const App: React.FC = () => {
  return (
    <div className="global.container" id="global.container">
      <Header />
      <main>
        <Routes>
          {RoutesConfig} {/* Spread the JSX fragment here */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
