import React from 'react';
import './styles/styles.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/primary/Header'; // Import Header
import Footer from './components/primary/Footer'; // Import Footer
import Homepage from './pages/Homepage';
import ClientData from './pages/client/ClientData';
import ClientDetail from './pages/client/ClientDetail';
import ContactPage from './pages/info/ContactPage';
import PrivacyPolicyPage from './pages/info/PrivacyPolicyPage';
import TermsOfServicePage from './pages/info/TermsOfServicePage';
import IpmiPage from './pages/ipmi/IpmiPage';
import IpmiManagementIlo from './pages/ipmi/ilo/IpmiManagementIlo';
import IpmiManagementDrac from './pages/ipmi/drac/IpmiManagementDrac';

export const API_URL = window.env?.REACT_APP_API_URL || 'http://localhost:35550';
console.log("API_URL is set to:", API_URL);

const App: React.FC = () => {
  return (
    <div className="global.container" id="global.container">
      <Header />
      <main>
        <Routes>
          Console.log("Injecting React Application routes.");
          <Route path="/" element={<Homepage />} />


          <Route path="/clients" element={<ClientData />} />
          <Route path="/client/:id" element={<ClientDetail />} />

          <Route path="/ipmi" element={<IpmiPage />} />

          <Route path="/ipmi/ilo" element={<IpmiManagementIlo />} />

          <Route path="/ipmi/drac" element={<IpmiManagementDrac />} />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
