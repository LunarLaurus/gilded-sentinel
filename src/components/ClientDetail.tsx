// src/components/ClientDetail.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ClientDetail.css';
import useEndpointWithArgument from '../hooks/useEndpointWithArgument';
import { Client } from '../types/ClientInterfaces';
import TabButtons from './TabButtons';
import SystemTab from './tabs/ClientDetail/SystemTab';
import TemperatureTab from './tabs/ClientDetail/TemperatureTab';
import IpmiTab from './tabs/ClientDetail/IpmiTab';
import DebugTab from './tabs/ClientDetail/DebugTab';

const ClientDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: client, loading, error } = useEndpointWithArgument<Client>('api/clients', id);
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('System'); // Default to 'System' if 'System' is always visible

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center">Error: {error}</div>;
    if (!client) return <div className="text-center">Client not found</div>;

    // Determine which tabs to show
    const ipmiTabEnabled = !!client.hasIpmi;
    const ipmiTabName = client.ipmiSystem?.type ? `${client.ipmiSystem.type}` : 'IPMI';
    // Dynamically create tab options
    const TAB_OPTIONS = ipmiTabEnabled ? ['System', 'Temperature', ipmiTabName, 'Debug'] : ['System', 'Temperature', 'Debug'];

    

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'System':
                return <SystemTab client={client} />;
            case 'Temperature':
                return <TemperatureTab client={client} />;
            case ipmiTabName:
                return ipmiTabEnabled ? <IpmiTab client={client} /> : <div>Select a tab to view content</div>;
            case 'Debug':
                return <DebugTab client={client} />;
            default:
                return <div>Select a tab to view content</div>;
        }
    };

    return (
        <div className="details-container">
            <button onClick={() => navigate('/')} className="back-button">Back to List</button>
            <TabButtons selectedTab={selectedTab} onTabSelect={setSelectedTab} tabs={TAB_OPTIONS} />
            {renderTabContent()}
        </div>
    );
};

export default ClientDetail;