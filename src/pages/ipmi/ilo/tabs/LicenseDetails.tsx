import React from 'react';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';

interface Props {
    client?: AuthenticatedClient;
}

const LicenseDetails: React.FC<Props> = ({ client }) => (
    <div>
        <h2>License</h2>
        <p>License: {client?.license?.license || 'N/A'}</p>
        <p>License Key: {client?.license?.licenseKey || 'N/A'}</p>
        <p>License Type: {client?.license?.licenseType || 'N/A'}</p>
    </div>
);

export default LicenseDetails;
