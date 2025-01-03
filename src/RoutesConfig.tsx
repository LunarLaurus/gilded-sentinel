import React from 'react';
import { Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ClientData from './pages/client/ClientData';
import ClientDetail from './pages/client/ClientDetail';
import ContactPage from './pages/info/ContactPage';
import PrivacyPolicyPage from './pages/info/PrivacyPolicyPage';
import TermsOfServicePage from './pages/info/TermsOfServicePage';
import IpmiPage from './pages/ipmi/IpmiPage';
import IpmiManagementIlo from './pages/ipmi/ilo/IpmiManagementIlo';
import IloFanManagementPage from './pages/ipmi/ilo/IloFanManagementPage';
import IloClientPage from './pages/ipmi/ilo/IloClientPage';
import IpmiManagementDrac from './pages/ipmi/drac/IpmiManagementDrac';

export const RoutesConfig = (
    <>
        {/* General Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />

        {/* Client Routes */}
        <Route path="/clients" element={<ClientData />} />
        <Route path="/client/:id" element={<ClientDetail />} />

        {/* IPMI Routes */}
        <Route path="/ipmi" element={<IpmiPage />} />
        <Route path="/ipmi/ilo" element={<IpmiManagementIlo />} />
        <Route path="/ipmi/ilo/fan" element={<IloFanManagementPage />} />
        <Route path="/ipmi/ilo/client/:id/*" element={<IloClientPage />} />
        <Route path="/ipmi/drac" element={<IpmiManagementDrac />} />
    </>
);
