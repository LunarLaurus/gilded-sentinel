import React from 'react';
import '../../../../styles/ilo/IloGenericStyling.css';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';

interface Props {
    client: AuthenticatedClient;
}

const LicenseDetails: React.FC<Props> = ({ client }) => (
    <div className="generic-ilo-container">
        <div className="generic-ilo-card">
            <h2>License Details</h2>
            <p>
                <strong>License:</strong> {client.license.license || 'N/A'}<br />
                <strong>License Key:</strong> {client.license.licenseKey || 'N/A'}<br />
                <strong>License Type:</strong> {client.license.licenseType || 'N/A'}
            </p>
        </div>
    </div>
);

export default LicenseDetails;
