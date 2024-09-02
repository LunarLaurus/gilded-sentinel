// src/components/IpmiTab.tsx
import React from 'react';
import { getClientIpmiIp } from '../../../utils/NetworkUtils';
import { Client } from '../../../types/ClientInterfaces';

interface IpmiTabProps {
    client: Client;
}

const IpmiTab: React.FC<IpmiTabProps> = ({ client }) => {
    return (
        <div className="details-card">
            <h2>IPMI Information</h2>
            <p>Address: {getClientIpmiIp(client)}</p>
            <p>Type: {client.ipmiSystem?.type}</p>
            <p>Host System: {client.ipmiSystem?.parentHostName}</p>
            <p>Updating Every X Updates: {client.ipmiSystem?.updateIpmiEveryXUpdates}</p>
            <p>Update Counter: {client.ipmiSystem?.updateCounter}</p>
            <pre>{JSON.stringify(client, null, 2)}</pre>
        </div>
    );
};

export default IpmiTab;
