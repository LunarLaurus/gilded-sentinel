import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/primary/Header'; // Import Header
import Footer from './components/primary/Footer'; // Import Footer
import ClientData from './components/ClientData';
import ClientDetail from './components/ClientDetail';
import './styles/styles.css'; // Import App-specific styles

export const API_URL = window.env.REACT_APP_API_URL || 'http://localhost:32550';
console.log("API_URL is set to:", API_URL);

const App: React.FC = () => {
  return (
    <div className="global.container">
    <Header />
      <main>
        <Routes>
          Console.log("Injecting React Application routes.");
          <Route path="/" element={<ClientData />} />
          <Route path="/client/:id" element={<ClientDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
