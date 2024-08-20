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
            <p>Type: {client.impiSystem?.impiType}</p>
            <p>Host System: {client.impiSystem?.parentHostName}</p>
            <p>Updating Every X Updates: {client.impiSystem?.updateIpmiEveryXUpdates}</p>
            <p>Update Counter: {client.impiSystem?.updateCounter}</p>
        </div>
    );
};

export default IpmiTab;
