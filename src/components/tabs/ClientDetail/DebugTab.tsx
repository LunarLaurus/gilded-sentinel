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
            <p>Type: {client.name}</p>
            <p>Type: {client.ipmiSystem?.type.toString()}</p>
            <p>Type: {client.ipmiSystem?.updateIpmiEveryXUpdates.toString()}</p>
            <pre>{JSON.stringify(client, null, 2)}</pre>
            <p>Type: {client.vendor}</p>
        </div>
    );
};

export default DebugTab;
