// src/components/IloTab.tsx
import React from 'react';
import { getClientIloIp } from '../../../utils/NetworkUtils';
import { Client } from '../../../types/ClientInterfaces';
import { IntegratedLightsOutInfo } from '../../../types/IloInterfaces';

interface IloTabProps {
    client: Client;
}

const IloTab: React.FC<IloTabProps> = ({ client }) => {
    return (
        <div className="details-card">
            <h2>ILO Information</h2>
            <p>Address: {getClientIloIp(client)}</p>
            <p>Host System: {client.ilo?.iloParentHostName}</p>
            <p>Updating Every X Updates: {client.ilo?.updateIloEveryXUpdates}</p>
            <p>Update Counter: {client.ilo?.updateCounter}</p>
        </div>
    );
};

export default IloTab;
