import React from 'react';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';

interface Props {
    client: AuthenticatedClient;
}

const ProcessorDetails: React.FC<Props> = ({ client }) => (
    <div>
        <h2>CPU Data</h2>
        <p>CPU Count: {client.cpuData.count}</p>
        <p>CPU Model: {client.cpuData.model}</p>
        <p>CPU Health: {client.cpuData.status}</p>
    </div>
);

export default ProcessorDetails;
