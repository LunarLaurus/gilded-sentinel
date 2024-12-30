import React from 'react';
import '../../../../styles/ilo/IloGenericStyling.css';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';

interface Props {
    client: AuthenticatedClient;
}

const ProcessorDetails: React.FC<Props> = ({ client }) => (
    <div className="generic-ilo-container">
        <div className="generic-ilo-card">
            <h2>Processor Details</h2>
            <p>
                <strong>CPU Count:</strong> {client.cpuData.count || 'N/A'}<br />
                <strong>CPU Model:</strong> {client.cpuData.model || 'N/A'}<br />
                <strong>CPU Health:</strong> {client.cpuData.status || 'N/A'}
            </p>
        </div>
    </div>
);

export default ProcessorDetails;
