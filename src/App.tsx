import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientData from './components/ClientData';
import ClientDetail from './components/ClientDetail';
import './styles/App.css'; // Import App-specific styles

// config.ts
export const API_URL = 'http://192.168.0.10:32550'; // Default value
//export const API_URL = 'http://localhost:32550'; // Default value

const App: React.FC = () => {
  return (
    <div className="container">
      <header>
        <h1>Gilded Sentinel</h1>
        <h2>Client Monitoring Platform</h2>
      </header>
      <main>
        <Routes>
          Console.log("Injecting React Application routes.");
          <Route path="/" element={<ClientData />} />
          <Route path="/client/:id" element={<ClientDetail />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
