// src/components/IpmiTab.tsx
import React from 'react';
import { Client } from '../../../types/ClientInterfaces';

interface DebugTabProps {
    client: Client;
}

const DebugTab: React.FC<DebugTabProps> = ({ client }) => {
    return (
        <div className="details-card">
            <h2>Debug Information</h2>
            <p>Type: {client.vendor}</p>
        </div>
    );
};

export default DebugTab;
